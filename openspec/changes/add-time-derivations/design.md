## Context

See proposal.md — Why. Specs: `time-derivations` + deltas in `research-session-nav`, `frontend-app`, `backend-api`, `study-objects`, `project-structure`.

Today the Sidebar lists sessions from `researchSessions.ts` (case-framework → timelines → …). Timelines/Recalls live in Mongo via Django. There is no graph store, no React Flow dependency, and `docker-compose.yml` only runs Mongo.

Constraints: Django+DRF+Mongo for Study/Recall; Drawers (`ResearchDrawer` pattern); icons only `shared/icons` (`BranchIcon` / `NetworkIcon`); Canvas protagonista; Spanish product copy; WSL + `docker-compose` (not `docker compose` in docs); secrets in `.env` / `.env.example`. Feature source doc assumed PostgreSQL for recalls — **NISSE uses MongoDB**; Neo4j holds graph only, `recall_id` is a cross-store reference.

## Goals / Non-Goals

**Goals:**
- Neo4j as source of truth for nodes/edges/positions; Django as sole graph gateway.
- React Flow Canvas + right Drawer; optimistic connect/move with persist-on-settle.
- Idempotent one-graph-per-Study with Study-named root; session slot under case-framework.
- Compose Neo4j + env wiring for local WSL development.

**Non-Goals:**
- AI suggestions, auto-layout v1, multi-graph, direct browser→Neo4j.
- Redesigning other sessions beyond inserting `time-derivations`.
- Moving Recall bodies into Neo4j.

## Decisions

### 1. Dual store: Neo4j graph + Mongo Study/Recall

```text
React → Django API → Neo4j (DerivationGraph, StudyRoot, Derivation, DERIVES_TO)
                   ↘ Mongo (Study, Recall) for ownership + recall picker / resolve
```

Neo4j properties (conceptual):

```text
(:DerivationGraph { study_id })-[:HAS_ROOT]->(:StudyRoot { study_id, name, position_x, position_y })
(:StudyRoot|Derivation)-[:DERIVES_TO { id, relationship_type }]->(:StudyRoot|Derivation)
(:Derivation {
  id, study_id, name, description_markdown, derivation_type,
  impact, is_speculative, recall_id?, position_x, position_y,
  created_at, updated_at
})
```

Constraint: uniqueness of `DerivationGraph` per `study_id` (MERGE on ensure). Root updates name from Study on ensure/GET (or Study rename hook).

**Alternatives:** store full graph JSON in Mongo → rejected (feature requires Neo4j; weak for edge queries). Embed Neo4j in browser → rejected (auth + credentials).

### 2. Driver and Django encapsulation

Add official Neo4j Python driver; thin module under `backend/core/` (e.g. `neo4j_client.py` + `derivations/` service) used by DRF views. Connection from settings/`NEO4J_*`. No ORM models for graph entities in Mongo.

**Alternatives:** neomodel OGM → deferred (extra abstraction for v1). Cypher only in views → rejected (harder to test/reuse).

### 3. API shape (owner-only, under Study)

Adapt to existing `/api/studies/:studyId/…` style:

```text
GET    /api/studies/:studyId/derivations/                  # full graph (ensure-on-read)
POST   /api/studies/:studyId/derivations/nodes/
PATCH  /api/studies/:studyId/derivations/nodes/:nodeId/
DELETE /api/studies/:studyId/derivations/nodes/:nodeId/    # reject root
POST   /api/studies/:studyId/derivations/edges/
DELETE /api/studies/:studyId/derivations/edges/:edgeId/
GET    /api/studies/:studyId/recalls/?…                    # reuse/list for picker if exists; else thin list endpoint
```

Ensure graph on Study create (signal/hook alongside timeline/case-framework) **and** on first GET (backfill older Studies).

Position: PATCH node with `{ position_x, position_y }` on drag stop (debounce optional). Edges: create returns edge id; delete by id.

**Alternatives:** WebSocket sync → out of scope. One PATCH for whole graph → worse conflict UX for v1.

### 4. Frontend: React Flow + feature module

Dependency: `@xyflow/react` (React Flow v12). Feature folder `frontend/src/features/time-derivations/` with:

- Routes registered in `AppRouter` like timelines
- `DerivationsCanvas` (React Flow + custom node types `studyRoot` / `derivation`)
- `DerivationDrawer` / `StudyRootDrawer` using shared `ResearchDrawer`
- Central taxonomy module (single source for types + impact labels)
- Map API ↔ React Flow nodes/edges; themed Controls (and optional MiniMap later)

Session: insert `{ id: 'time-derivations', label: 'Derivaciones del tiempo', Icon: BranchIcon }` after `case-framework` in `RESEARCH_SESSIONS`. Path helper `timeDerivationsPath(studyId)`.

Optimistic UI for move/connect/disconnect; revert + toast/inline error on failure. Drawer selection as local UI state (not per-node routes).

**Alternatives:** custom SVG graph → rejected by product. Cytoscape → heavier than needed given React Flow requirement.

### 5. Compose Neo4j

Extend `docker-compose.yml`:

```text
neo4j:
  image: neo4j:5
  ports: 7474 (HTTP), 7687 (Bolt)
  volumes: neo4j_data:/data
  environment: NEO4J_AUTH=neo4j/<password from env>
```

Document in `.env.example` (`NEO4J_URI=bolt://localhost:7687`, user, password). Keep using `docker-compose up -d` from WSL.

### 6. Recall linkage

Store optional `recall_id` (string ObjectId) on Derivation. Picker lists Recalls for `study_id` from Mongo (title, date display, home timeline name). On resolve: if missing, return `recall: null` + clear stale id on next save or soft-flag `recall_missing`.

### 7. Visual language

Root node: larger, label “OBJETO DE ESTUDIO”, discovery accent restrained. Derivation: name only; optional small type icon. Directed edges. Tokens from existing CSS variables; theme React Flow chrome (no stock light theme). Empty state copy from product spec (orientation + Agregar primera derivación).

## Risks / Trade-offs

- **[Risk] Neo4j down while Mongo up** → Graph session shows error/retry; Study create should not fail hard if Neo4j briefly unavailable — log + ensure-on-next-open (document trade-off; prefer create hook with clear error in dev).
- **[Risk] Dual-store consistency for recall_id** → Soft degrade; never cascade-delete Recall from Neo4j delete.
- **[Risk] Large graphs / chatty HTTP** → Persist position on drag stop only; avoid full-graph refetch after every micro-change; use React Flow change handlers carefully.
- **[Risk] Authz bypass via node ids** → Every Cypher path filters `study_id` from URL after owner check; never trust client study_id on nested payloads alone.
- **[Trade-off] New infra in Compose** → Local setup gains a service; matches product requirement vs Mongo-only graph.

## Migration Plan

1. Add Neo4j service + env examples; developers `docker-compose up -d`.
2. Ship Django driver + ensure API; backfill via ensure-on-GET for existing Studies.
3. Ship frontend session + Canvas behind the new route.
4. Rollback: remove session route/UI; Neo4j volume can remain unused; no Mongo schema break for Studies.

## Open Questions

- Exact Neo4j image tag patch version (pin `neo4j:5` vs minor) — choose current stable 5.x at implement time.
- Whether Study rename pushes root name synchronously via signal or lazily on next graph GET — either satisfies specs; prefer signal if cheap, else GET ensure.
