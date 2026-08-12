## Context

See proposal.md — Why. Builds on `derivation-methodological-types` (catalog, `type_ids`, Drawer fields, circular nodes). Today create POSTs immediately from FAB with default `type_ids: ['process']`, then opens a single-pane Drawer; nodes show name + optional dots, not a type eyebrow. UX: Canvas protagonizes; Drawer ~⅓; tokens + official icons (`docs/ux-framework/`).

## Goals / Non-Goals

**Goals:**
- Two-step create wizard; step-1 mosaic; Chip Selector shared UI; type eyebrow on nodes; edit opens step 2.
- Defer API create until Guardar on step 2 for new drafts.

**Non-Goals:**
- Backend catalog/API changes; new icon set glyphs beyond mapping existing catalog names.

## Decisions

1. **Draft-first create (client).**
   - FAB / «Agregar» opens Drawer in create mode at step 1 with empty local draft (no Neo4j node yet).
   - Siguiente only validates name + ≥1 type and advances UI.
   - Guardar on step 2 calls `createDerivationNode` (with optional `source_node_id` from selection) then merges into graph.
   - **Alternatives:** POST on Siguiente → rejected (orphans / forced default type).

2. **Edit mode.**
   - Selecting existing derivation opens step 2; Editar → step 1; Guardar PATCHes as today.
   - Root selection unchanged (no derivation drawer wizard).

3. **`ResearchChipSelector` in `shared/ui`.**
   - Props: `options: { value, label, icon }[]`, `value: string[]`, `onChange`, optional search.
   - Selected: Discovery border/text; unselected: subtle border; icon `size="sm"` matching caption.
   - Document briefly in `docs/ux-framework/02-components.md` under Select / multi-value.
   - Replace checkbox list in derivation step 1 with this control.

4. **Type → icon mapping** in taxonomy module (stable id → catalog icon name, e.g. `process` → `branch` / `network`). Prefer Set I/II already in `shared/icons`; one default icon if unmapped.

5. **Mosaic cards** below chips: CSS grid; each card: reference (caption muted), name (emphasis), pista (body caption, clamp ~6 lines + scroll if needed). Deselect removes card with light exit (optional, tokens motion).

6. **Node eyebrow:** reuse `.td-node__eyebrow` / muted color like root; text = first type name + (`typeCount > 1` ? `…` : ``). Remove multi-type dots if eyebrow supersedes them (cleaner).

7. **Step 2 chrome:** summary strip with name, type chips (read-only), Editar ghost/button; then description, tags, recall, neighbors.

## Risks / Trade-offs

- [Risk] Closing Drawer mid-draft loses work → Mitigation: confirm on close if step 1/2 dirty (light confirm).
- [Risk] Long type names overflow circle → Mitigation: ellipsis CSS on eyebrow; title tooltip with full first type.
- [Risk] Mosaic height crowds Drawer → Mitigation: scroll drawer body; mosaic after chips.

## Migration Plan

Frontend-only UX. No data migration. Rollback = revert Drawer/nodes/shared chip.

## Open Questions

- None material; exact icon-per-type map chosen at apply from existing catalog.
