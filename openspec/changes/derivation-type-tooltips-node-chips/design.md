## Context

See proposal.md — Why. Today: mosaic cards clamp pista (`-webkit-line-clamp: 6`) with no expand control; canvas nodes show a primary-type eyebrow (`primaryTypeLabel` + `…`) from the two-step create change. Catalog already exposes `iconForDerivationType` / chip options. Floating UI in the app today is mainly Radix Select; no shared Tooltip/Popover yet.

## Goals / Non-Goals

**Goals:**
- Click «Ver más» on truncated mosaic pista → full pista in a floating surface.
- Node face: chip toolbar (icon + name) per type; click → detail card (name, reference, inspiration, pista).
- Keep node selection/drawer and React Flow drag working; chips are non-drag controls.

**Non-Goals:**
- Backend/catalog changes; new icon artwork; hover-only tooltips as the primary reveal (click is required).

## Decisions

1. **Popover on click (not hover Tooltip)** — User asked for tooltip semantics but triggered by click («Ver más», chip). Prefer `@radix-ui/react-popover` (portal, focus trap optional, Esc/outside close) over hover Tooltip. Alternative considered: CSS `title` / native title — rejected (not card-capable). Shared thin wrappers under `shared/ui` only if reuse is immediate; otherwise feature-local components in `time-derivations/` with tokenized CSS.

2. **Shared type-detail content** — One presentational block (e.g. `DerivationTypeDetailCard`) used by mosaic «Ver más» (pista-only or full fields) and node chip popover (name + reference + inspiration + pista). Data from `resolveTypes` / catalog on the client — no extra API.

3. **«Ver más» visibility** — Keep clamp; show «Ver más» when content overflows (ResizeObserver / compare scrollHeight) or always when clamp is applied and text length exceeds a soft threshold. Prefer overflow detection so short pistas stay clean.

4. **Node data plumbing** — Extend `DerivationFlowNodeData` with `typeIds: string[]` (or resolved mini descriptors). Remove `primaryTypeLabel` eyebrow. Chips use `nodrag nopan` (React Flow) and `stopPropagation` on pointer/click so opening a popover does not select-drag the node. Selecting the name / body still selects the node for the Drawer.

5. **Many types** — Chip row wraps or horizontal-scrolls inside the circle with constrained max-width; do not ellipsis to a single type. If density breaks the circle, allow chips below the name still inside the node chrome (design tokens / compact chip size matching ResearchChipSelector `sm`).

6. **Logos** — Reuse existing `IconName` map in `taxonomy.ts` as the “logo” for each type; do not add image assets.

## Risks / Trade-offs

- [Risk] Chip clicks fight React Flow selection/drag → Mitigation: `nodrag`/`nopan` + stopPropagation; verify in apply.
- [Risk] Popovers clipped by React Flow / overflow parents → Mitigation: Radix portal to `document.body`.
- [Risk] Crowded nodes with many types → Mitigation: compact chips + wrap/scroll; accept larger node footprint over hiding types.
- [Risk] «Ver más» false negatives on overflow measure → Mitigation: fallback show control when prompt length > N chars.

## Migration Plan

Frontend-only. Rollback = revert UI/CSS and restore eyebrow. No data migration.

## Open Questions

- None deferred; overflow threshold for «Ver más» can be tuned in apply without changing specs.
