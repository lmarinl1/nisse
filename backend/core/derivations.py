"""Derivation graph service backed by Neo4j (Study-scoped).

Root name sync strategy: updated on every ensure_graph / get_graph call
from the current Study.name (lazy sync on read; Study PATCH also pushes).
"""

from __future__ import annotations

import logging
import uuid
from datetime import datetime, timezone
from typing import Any

from .derivation_types_catalog import (
    DERIVATION_TYPE_IDS,
    resolve_derivation_types,
)
from .neo4j_client import get_neo4j_driver

logger = logging.getLogger(__name__)

RELATIONSHIP_TYPE_DEFAULT = "derives_toward"

NODE_KIND_ROOT = "root"
NODE_KIND_DERIVATION = "derivation"


class DerivationError(Exception):
    """Domain error for derivation graph operations."""

    def __init__(self, message: str, *, status: int = 400):
        super().__init__(message)
        self.status = status


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _new_id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex}"


def ensure_graph(study_id: str, study_name: str) -> dict[str, Any]:
    """Idempotently create one graph + root for a Study; sync root name."""
    driver = get_neo4j_driver()
    root_id = f"root_{study_id}"
    now = _now_iso()
    with driver.session() as session:
        session.execute_write(
            _tx_ensure_graph,
            study_id,
            study_name,
            root_id,
            now,
        )
    return get_graph(study_id, study_name)


def _tx_ensure_graph(tx, study_id: str, study_name: str, root_id: str, now: str):
    tx.run(
        """
        MERGE (g:DerivationGraph {study_id: $study_id})
        ON CREATE SET g.created_at = $now
        SET g.updated_at = $now
        MERGE (r:StudyRoot {id: $root_id})
        ON CREATE SET
          r.study_id = $study_id,
          r.kind = 'root',
          r.position_x = 0.0,
          r.position_y = 0.0,
          r.created_at = $now
        SET r.name = $study_name,
            r.updated_at = $now
        MERGE (g)-[:HAS_ROOT]->(r)
        """,
        study_id=study_id,
        study_name=study_name,
        root_id=root_id,
        now=now,
    )


def sync_root_name(study_id: str, study_name: str) -> None:
    """Push Study.name onto the graph root (used from Study PATCH)."""
    driver = get_neo4j_driver()
    root_id = f"root_{study_id}"
    now = _now_iso()
    with driver.session() as session:
        session.execute_write(
            lambda tx: tx.run(
                """
                MATCH (r:StudyRoot {id: $root_id, study_id: $study_id})
                SET r.name = $study_name, r.updated_at = $now
                """,
                root_id=root_id,
                study_id=study_id,
                study_name=study_name,
                now=now,
            )
        )


def get_graph(study_id: str, study_name: str) -> dict[str, Any]:
    ensure_exists = True
    driver = get_neo4j_driver()
    with driver.session() as session:
        if ensure_exists:
            session.execute_write(
                _tx_ensure_graph,
                study_id,
                study_name,
                f"root_{study_id}",
                _now_iso(),
            )
        result = session.execute_read(_tx_get_graph, study_id)
    return result


def _tx_get_graph(tx, study_id: str) -> dict[str, Any]:
    root_rec = tx.run(
        """
        MATCH (r:StudyRoot {study_id: $study_id})
        RETURN r
        """,
        study_id=study_id,
    ).single()
    if root_rec is None:
        raise DerivationError("Derivation graph root missing", status=500)

    root = dict(root_rec["r"])
    derivations = [
        dict(record["d"])
        for record in tx.run(
            """
            MATCH (d:Derivation {study_id: $study_id})
            RETURN d
            ORDER BY d.created_at
            """,
            study_id=study_id,
        )
    ]
    edges = [
        {
            "id": record["id"],
            "source_node_id": record["source"],
            "target_node_id": record["target"],
            "relationship_type": record["relationship_type"]
            or RELATIONSHIP_TYPE_DEFAULT,
            "created_at": record["created_at"],
            "updated_at": record["updated_at"],
        }
        for record in tx.run(
            """
            MATCH (a {study_id: $study_id})-[e:DERIVES_TO]->(b {study_id: $study_id})
            RETURN e.id AS id,
                   a.id AS source,
                   b.id AS target,
                   e.relationship_type AS relationship_type,
                   e.created_at AS created_at,
                   e.updated_at AS updated_at
            """,
            study_id=study_id,
        )
    ]

    nodes = [_serialize_node(root, NODE_KIND_ROOT)] + [
        _serialize_node(d, NODE_KIND_DERIVATION) for d in derivations
    ]
    return {
        "study_id": study_id,
        "nodes": nodes,
        "edges": edges,
        "derivation_count": len(derivations),
        "edge_count": len(edges),
    }


def _normalize_tags(raw: Any) -> list[str]:
    """Validate and normalize tag list (trim, dedupe case-insensitive, soft limits)."""
    if raw is None:
        return []
    if not isinstance(raw, (list, tuple)):
        raise DerivationError("tags debe ser una lista de textos.")
    cleaned: list[str] = []
    seen: set[str] = set()
    for item in raw:
        if not isinstance(item, str):
            raise DerivationError("Cada etiqueta debe ser texto.")
        tag = item.strip()
        if not tag:
            continue
        if len(tag) > 32:
            raise DerivationError("Cada etiqueta admite máximo 32 caracteres.")
        key = tag.casefold()
        if key in seen:
            continue
        seen.add(key)
        cleaned.append(tag)
        if len(cleaned) >= 20:
            break
    return cleaned


def _tags_from_props(props: dict[str, Any]) -> list[str]:
    raw = props.get("tags")
    if raw is None:
        return []
    if isinstance(raw, list):
        return [str(t) for t in raw if str(t).strip()]
    return []


def _normalize_type_ids(raw: Any, *, required: bool) -> list[str]:
    if raw is None:
        if required:
            raise DerivationError("Selecciona al menos un tipo de deriva.")
        return []
    if isinstance(raw, str):
        raw = [raw]
    if not isinstance(raw, (list, tuple)):
        raise DerivationError("type_ids debe ser una lista de identificadores.")
    cleaned: list[str] = []
    seen: set[str] = set()
    for item in raw:
        if not isinstance(item, str):
            raise DerivationError("Cada tipo de deriva debe ser un identificador.")
        tid = item.strip()
        if not tid:
            continue
        if tid not in DERIVATION_TYPE_IDS:
            raise DerivationError(f"Tipo de deriva no válido: {tid}.")
        if tid in seen:
            continue
        seen.add(tid)
        cleaned.append(tid)
    if required and not cleaned:
        raise DerivationError("Selecciona al menos un tipo de deriva.")
    return cleaned


def _type_ids_from_props(props: dict[str, Any]) -> list[str]:
    raw = props.get("type_ids")
    if isinstance(raw, list):
        return [str(t) for t in raw if str(t).strip() in DERIVATION_TYPE_IDS]
    return []


def _serialize_node(props: dict[str, Any], kind: str) -> dict[str, Any]:
    base = {
        "id": props["id"],
        "kind": kind,
        "name": props.get("name") or "",
        "position_x": float(props.get("position_x") or 0),
        "position_y": float(props.get("position_y") or 0),
        "created_at": props.get("created_at"),
        "updated_at": props.get("updated_at"),
    }
    if kind == NODE_KIND_DERIVATION:
        type_ids = _type_ids_from_props(props)
        base.update(
            {
                "description_markdown": props.get("description_markdown") or "",
                "type_ids": type_ids,
                "derivation_types": resolve_derivation_types(type_ids),
                "recall_id": props.get("recall_id") or None,
                "tags": _tags_from_props(props),
            }
        )
    return base


def create_node(
    study_id: str,
    *,
    name: str,
    description_markdown: str = "",
    type_ids: list[str] | None = None,
    recall_id: str | None = None,
    tags: list[str] | None = None,
    position_x: float = 120.0,
    position_y: float = 120.0,
    source_node_id: str | None = None,
) -> dict[str, Any]:
    if not name or not name.strip():
        raise DerivationError("El nombre es obligatorio.")
    normalized_types = _normalize_type_ids(type_ids, required=True)
    normalized_tags = _normalize_tags(tags if tags is not None else [])

    node_id = _new_id("der")
    now = _now_iso()
    driver = get_neo4j_driver()
    with driver.session() as session:
        node = session.execute_write(
            _tx_create_node,
            study_id,
            node_id,
            name.strip(),
            description_markdown or "",
            normalized_types,
            recall_id,
            normalized_tags,
            float(position_x),
            float(position_y),
            now,
            source_node_id,
        )
    return node


def _tx_create_node(
    tx,
    study_id,
    node_id,
    name,
    description_markdown,
    type_ids,
    recall_id,
    tags,
    position_x,
    position_y,
    now,
    source_node_id,
):
    # Ensure graph exists
    root = tx.run(
        "MATCH (r:StudyRoot {study_id: $study_id}) RETURN r.id AS id",
        study_id=study_id,
    ).single()
    if root is None:
        raise DerivationError("El grafo no existe para este Objeto de Estudio.", status=404)

    tx.run(
        """
        CREATE (d:Derivation {
          id: $node_id,
          study_id: $study_id,
          kind: 'derivation',
          name: $name,
          description_markdown: $description_markdown,
          type_ids: $type_ids,
          recall_id: $recall_id,
          tags: $tags,
          position_x: $position_x,
          position_y: $position_y,
          created_at: $now,
          updated_at: $now
        })
        """,
        node_id=node_id,
        study_id=study_id,
        name=name,
        description_markdown=description_markdown,
        type_ids=type_ids,
        recall_id=recall_id,
        tags=tags,
        position_x=position_x,
        position_y=position_y,
        now=now,
    )

    edge = None
    if source_node_id:
        edge = _tx_create_edge(
            tx,
            study_id,
            source_node_id,
            node_id,
            RELATIONSHIP_TYPE_DEFAULT,
            now,
        )

    record = tx.run(
        "MATCH (d:Derivation {id: $node_id, study_id: $study_id}) RETURN d",
        node_id=node_id,
        study_id=study_id,
    ).single()
    node = _serialize_node(dict(record["d"]), NODE_KIND_DERIVATION)
    if edge:
        node["created_edge"] = edge
    return node


def update_node(study_id: str, node_id: str, patch: dict[str, Any]) -> dict[str, Any]:
    driver = get_neo4j_driver()
    with driver.session() as session:
        return session.execute_write(_tx_update_node, study_id, node_id, patch)


def _tx_update_node(tx, study_id: str, node_id: str, patch: dict[str, Any]):
    root = tx.run(
        "MATCH (r:StudyRoot {id: $node_id, study_id: $study_id}) RETURN r",
        node_id=node_id,
        study_id=study_id,
    ).single()
    if root is not None:
        # Root: only position allowed
        allowed = {}
        if "position_x" in patch:
            allowed["position_x"] = float(patch["position_x"])
        if "position_y" in patch:
            allowed["position_y"] = float(patch["position_y"])
        if not allowed:
            raise DerivationError(
                "El nodo raíz no admite editar campos de identidad aquí."
            )
        allowed["updated_at"] = _now_iso()
        sets = ", ".join(f"r.{k} = ${k}" for k in allowed)
        params = {"node_id": node_id, "study_id": study_id, **allowed}
        tx.run(
            f"MATCH (r:StudyRoot {{id: $node_id, study_id: $study_id}}) SET {sets}",
            **params,
        )
        record = tx.run(
            "MATCH (r:StudyRoot {id: $node_id, study_id: $study_id}) RETURN r",
            node_id=node_id,
            study_id=study_id,
        ).single()
        return _serialize_node(dict(record["r"]), NODE_KIND_ROOT)

    existing = tx.run(
        "MATCH (d:Derivation {id: $node_id, study_id: $study_id}) RETURN d",
        node_id=node_id,
        study_id=study_id,
    ).single()
    if existing is None:
        raise DerivationError("Derivación no encontrada.", status=404)

    fields: dict[str, Any] = {}
    if "name" in patch:
        name = (patch["name"] or "").strip()
        if not name:
            raise DerivationError("El nombre es obligatorio.")
        fields["name"] = name
    if "description_markdown" in patch:
        fields["description_markdown"] = patch["description_markdown"] or ""
    if "type_ids" in patch or "derivation_types" in patch:
        raw_ids = patch.get("type_ids")
        if raw_ids is None and "derivation_types" in patch:
            # Accept list of objects with id from clients that send full payloads.
            dt = patch.get("derivation_types") or []
            raw_ids = [
                item.get("id") if isinstance(item, dict) else item for item in dt
            ]
        fields["type_ids"] = _normalize_type_ids(raw_ids, required=True)
    if "recall_id" in patch:
        fields["recall_id"] = patch["recall_id"] or None
    if "tags" in patch:
        fields["tags"] = _normalize_tags(patch["tags"])
    if "position_x" in patch:
        fields["position_x"] = float(patch["position_x"])
    if "position_y" in patch:
        fields["position_y"] = float(patch["position_y"])

    if not fields:
        return _serialize_node(dict(existing["d"]), NODE_KIND_DERIVATION)

    fields["updated_at"] = _now_iso()
    sets = ", ".join(f"d.{k} = ${k}" for k in fields)
    params = {"node_id": node_id, "study_id": study_id, **fields}
    tx.run(
        f"MATCH (d:Derivation {{id: $node_id, study_id: $study_id}}) SET {sets}",
        **params,
    )
    record = tx.run(
        "MATCH (d:Derivation {id: $node_id, study_id: $study_id}) RETURN d",
        node_id=node_id,
        study_id=study_id,
    ).single()
    return _serialize_node(dict(record["d"]), NODE_KIND_DERIVATION)


def delete_node(study_id: str, node_id: str) -> None:
    if node_id == f"root_{study_id}" or node_id.startswith("root_"):
        # Extra guard: never delete StudyRoot
        driver = get_neo4j_driver()
        with driver.session() as session:
            is_root = session.execute_read(
                lambda tx: tx.run(
                    "MATCH (r:StudyRoot {id: $node_id, study_id: $study_id}) RETURN r",
                    node_id=node_id,
                    study_id=study_id,
                ).single()
                is not None
            )
        if is_root:
            raise DerivationError(
                "El nodo raíz no puede eliminarse.",
                status=400,
            )

    driver = get_neo4j_driver()
    with driver.session() as session:
        deleted = session.execute_write(_tx_delete_node, study_id, node_id)
    if not deleted:
        raise DerivationError("Derivación no encontrada.", status=404)


def _tx_delete_node(tx, study_id: str, node_id: str) -> bool:
    root = tx.run(
        "MATCH (r:StudyRoot {id: $node_id, study_id: $study_id}) RETURN r",
        node_id=node_id,
        study_id=study_id,
    ).single()
    if root is not None:
        raise DerivationError("El nodo raíz no puede eliminarse.", status=400)

    result = tx.run(
        """
        MATCH (d:Derivation {id: $node_id, study_id: $study_id})
        OPTIONAL MATCH (d)-[e]-()
        DELETE e, d
        RETURN count(d) AS deleted
        """,
        node_id=node_id,
        study_id=study_id,
    ).single()
    return bool(result and result["deleted"])


def create_edge(
    study_id: str,
    source_node_id: str,
    target_node_id: str,
    relationship_type: str = RELATIONSHIP_TYPE_DEFAULT,
) -> dict[str, Any]:
    if source_node_id == target_node_id:
        raise DerivationError("Una conexión no puede apuntar al mismo nodo.")
    now = _now_iso()
    driver = get_neo4j_driver()
    with driver.session() as session:
        return session.execute_write(
            _tx_create_edge,
            study_id,
            source_node_id,
            target_node_id,
            relationship_type or RELATIONSHIP_TYPE_DEFAULT,
            now,
        )


def _tx_create_edge(
    tx,
    study_id: str,
    source_node_id: str,
    target_node_id: str,
    relationship_type: str,
    now: str,
) -> dict[str, Any]:
    source = tx.run(
        """
        MATCH (n {id: $id, study_id: $study_id})
        WHERE n:StudyRoot OR n:Derivation
        RETURN n.id AS id
        """,
        id=source_node_id,
        study_id=study_id,
    ).single()
    target = tx.run(
        """
        MATCH (n {id: $id, study_id: $study_id})
        WHERE n:StudyRoot OR n:Derivation
        RETURN n.id AS id
        """,
        id=target_node_id,
        study_id=study_id,
    ).single()
    if source is None or target is None:
        raise DerivationError(
            "Ambos nodos deben pertenecer al grafo de este Objeto de Estudio.",
            status=400,
        )

    existing = tx.run(
        """
        MATCH (a {id: $source, study_id: $study_id})-[e:DERIVES_TO]->(b {id: $target, study_id: $study_id})
        RETURN e.id AS id
        """,
        source=source_node_id,
        target=target_node_id,
        study_id=study_id,
    ).single()
    if existing:
        return {
            "id": existing["id"],
            "source_node_id": source_node_id,
            "target_node_id": target_node_id,
            "relationship_type": relationship_type,
        }

    edge_id = _new_id("edge")
    tx.run(
        """
        MATCH (a {id: $source, study_id: $study_id})
        MATCH (b {id: $target, study_id: $study_id})
        WHERE (a:StudyRoot OR a:Derivation) AND (b:StudyRoot OR b:Derivation)
        CREATE (a)-[e:DERIVES_TO {
          id: $edge_id,
          relationship_type: $relationship_type,
          created_at: $now,
          updated_at: $now
        }]->(b)
        """,
        source=source_node_id,
        target=target_node_id,
        study_id=study_id,
        edge_id=edge_id,
        relationship_type=relationship_type,
        now=now,
    )
    return {
        "id": edge_id,
        "source_node_id": source_node_id,
        "target_node_id": target_node_id,
        "relationship_type": relationship_type,
        "created_at": now,
        "updated_at": now,
    }


def delete_edge(study_id: str, edge_id: str) -> None:
    driver = get_neo4j_driver()
    with driver.session() as session:
        deleted = session.execute_write(_tx_delete_edge, study_id, edge_id)
    if not deleted:
        raise DerivationError("Conexión no encontrada.", status=404)


def _tx_delete_edge(tx, study_id: str, edge_id: str) -> bool:
    result = tx.run(
        """
        MATCH (a {study_id: $study_id})-[e:DERIVES_TO {id: $edge_id}]->(b {study_id: $study_id})
        DELETE e
        RETURN count(e) AS deleted
        """,
        study_id=study_id,
        edge_id=edge_id,
    ).single()
    return bool(result and result["deleted"])


def try_ensure_graph(study_id: str, study_name: str) -> None:
    """Best-effort ensure on Study create (Mongo succeeds even if Neo4j is down)."""
    try:
        ensure_graph(study_id, study_name)
    except Exception:
        logger.exception(
            "Neo4j ensure_graph failed for study %s; will retry on next graph GET",
            study_id,
        )


def try_sync_root_name(study_id: str, study_name: str) -> None:
    try:
        sync_root_name(study_id, study_name)
    except Exception:
        logger.exception(
            "Neo4j sync_root_name failed for study %s; will sync on next graph GET",
            study_id,
        )
