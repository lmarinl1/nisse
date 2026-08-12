## Context

See proposal.md — Why. Current implementation: rectangular `.td-node` with name only; edges deletable via React Flow `onEdgesDelete` + API but UX may be unclear; Drawer has fields but no neighborhood or tags; Neo4j `Derivation` has no `tags` property.

## Goals / Non-Goals

**Goals:**
- Circular transparent nodes, yellow border; name + type on face.
- Reliable edge delete UX + persistence confirmation.
- Drawer carousels for parents/children from edge list.
- Persist `tags: string[]` on derivations (Neo4j + API + client).

**Non-Goals:**
- Tag autocomplete ontology; multi-parent layout algorithms; changing relationship types.

## Decisions

### 1. Node visual

CSS: `border-radius: 50%`, fixed min size (e.g. ~7.5–9rem), `background: transparent`, `border: 1–2px solid var(--color-discovery-primary)`, centered flex column for name + type caption. Handles remain on circle. Root: same circle language + small «Objeto de estudio» caption.

**Alternatives:** pill/ellipse only → rejected (user asked circular). Opaque fills → rejected.

### 2. Type on node

Pass `derivationType` already in flow `data`; map to `DERIVATION_TYPE_LABELS` in the node component. Root shows no type line (or study cue only).

### 3. Edge delete

Keep Delete/Backspace; ensure `edgesUpdatable`/selection; optional subtle selected edge stroke. Document in empty hint or Controls tooltip if needed. Persist via existing `DELETE .../edges/:id/`.

### 4. Neighborhood in Drawer

Compute parents/children client-side from graph edges + `nodesById` (source→target = parent→child). Present two horizontal scroll rows (`td-carousel`) of compact cards. Click card → `setSelectedId`. No extra API required for v1 if full graph already loaded.

**Alternatives:** server-side neighbor endpoint → deferred.

### 5. Tags persistence

Store `tags` as list/array on Neo4j `Derivation` (JSON list or multiple properties — prefer string array in node props). PATCH node accepts `tags: string[]`. Drawer: chip list + input to add (Enter), remove on chip. Trim, dedupe case-insensitive; reject empty. Root: skip tags UI.

**Alternatives:** Mongo side-table for tags → rejected (graph-local metadata).

## Risks / Trade-offs

- **[Risk] Long names overflow circle** → Mitigation: clamp lines, ellipsis, title attribute.
- **[Risk] Many tags / neighbors** → Mitigation: carousel scroll; chips wrap in Drawer.
- **[Trade-off] Client-only neighborhood** → Stale if graph partial; OK while GET returns full graph.

## Migration Plan

1. API/Neo4j: read/write `tags` (default `[]`).
2. Frontend nodes CSS + type label.
3. Drawer carousels + tags editor.
4. Edge-delete UX polish + smoke.

## Open Questions

- Max tag length / count — soft limits at implement time (e.g. 32 chars, 20 tags) unless product specifies.
