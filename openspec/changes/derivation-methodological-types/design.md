## Context

See proposal.md — Why. Stack is Mongo + Neo4j (not PostgreSQL): derivation graph already lives in Neo4j (`backend/core/derivations.py`). Current nodes carry single `derivation_type`, `impact`, `is_speculative`, `tags`, `recall_id`. Drawer has separate parent/child carousels and a tags list + separate text input. Feature source: `nisse-feature-derivaciones-tipos-metodologicos.md` plus unified carousel and chip-input tags.

## Goals / Non-Goals

**Goals:**
- Seeded methodological catalog (18 types) shared FE/BE; multi-select with ≥1 type.
- Remove impact / is_speculative from write path and UI.
- Drawer order: types → methodological panels → name → description → tags chip-input → recall → unified neighbor carousel.
- Canvas name-only (optional multi-type dots).
- Keep recall linking and Neo4j graph ops.

**Non-Goals:**
- Admin CRUD for types; auto-merge pistas; PostgreSQL dual-write; redesign React Flow.

## Decisions

1. **Catalog as versioned seed module (code), not Mongo admin entities (v1).**
   - Single source: shared catalog definition (stable kebab/slug ids + ES copy for name/inspiration/reference/prompt) imported by backend validation and frontend UI.
   - Optional `GET .../derivations/types/` returning the same catalog for clients that prefer API over bundling.
   - **Alternatives:** Mongo collection / Neo4j `:DerivationType` nodes → deferred; overkill without admin UI.

2. **Store type associations on Neo4j Derivation as `type_ids: string[]` (ordered, deduped, min 1).**
   - Serialize as `derivation_types: [{id, name, inspiration, reference, prompt}, ...]` by joining catalog.
   - Drop properties `derivation_type`, `impact`, `is_speculative` from new writes; read-path ignores legacy props (or one-shot migrate: if only legacy `derivation_type` present and no `type_ids`, leave empty → client must re-pick types; prefer soft migrate mapping impossible → require re-select on edit).
   - **Alternatives:** `HAS_TYPE` edges → more Cypher complexity without query need in v1.

3. **Drawer UX**
   - Multi-select with search (compose from ResearchSelect / chip multi pattern already in app); expand/popover per selected type for inspiration/reference/pista.
   - Tags: one control — capsules + inline text; Enter / comma commit; Backspace removes last empty; persist existing tag limits (≤20, ≤32 chars, casefold dedupe).
   - Neighbors: one `.td-carousel` after description; cards carry `data-nature="parent"|"child"` (or role badge «Padre» / «Hijo») with distinct border/eyebrow; click still focuses neighbor.

4. **Canvas**
   - Remove type label from `DerivationFlowNode` face (supersedes prior “name + type” display). Optional 1–3 dots when `type_ids.length > 1`.

5. **Recall**
   - Keep existing Study recall picker; no API regression.

## Risks / Trade-offs

- [Risk] Existing Neo4j nodes lack `type_ids` → Mitigation: PATCH requires ≥1 type on save; create defaults none until user selects; graph load shows empty types until edited.
- [Risk] Catalog copy drift FE/BE → Mitigation: backend is source of truth via types endpoint; FE may mirror for offline labels but prefer fetch.
- [Risk] Crowded Drawer with many types → Mitigation: compact chips + expand-on-demand for pista blocks; scroll Drawer body.
- [Risk] Name collision “Impacto con la escala” vs removed Impact field → Mitigation: only as type name; no `impact` property.

## Migration Plan

1. Ship catalog + API + UI; stop writing legacy fields.
2. Existing graphs remain loadable; editing forces type selection before save.
3. Rollback: revert change; legacy props may still exist on old nodes unused.

## Open Questions

- None material; optional multi-type dots on Canvas are allowed but not required for acceptance.
