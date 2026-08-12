## Context

See proposal.md — Why. After `derivation-type-tooltips-node-chips`, chips live inside `.td-node--derivation` with `height: auto` and pill radius, which stretches the yellow circle. Goal: keep chip + popover behavior; restore geometry.

## Goals / Non-Goals

**Goals:**
- Perfect circle for the derivation face (name + handles).
- Type chip rail outside the circle; right-side default with left-aligned chips.
- Preserve popover detail and non-drag chip hits.

**Non-Goals:**
- Auto-flipping rail per viewport collision (optional later); Drawer mosaic changes.

## Decisions

1. **Wrapper layout** — Outer React Flow node root is a horizontal flex row: `[circle][type-rail]`. Circle keeps fixed square size + `border-radius: 50%` (same as pre-chip baseline ~8.5rem). Handles stay on the circle element so edges connect to the yellow disc, not the rail.

2. **Default side = right** — Rail to the right of the circle; `text-align` / `align-items: flex-start` so chips are left-aligned toward the circle. Assumption: left-side rail only if we later need collision avoidance; out of scope unless trivial. If a left rail is added, chips SHOULD be right-aligned toward the circle (mirror)—record for apply only if implemented.

3. **Hit targets** — Rail uses `nodrag nopan` + stopPropagation; circle body remains the selection/drag surface. Slight gap (`gap` token) between circle and rail so chips don’t overlap the stroke.

4. **Density** — Vertical stack or wrap in a narrow column (~7–9rem max-width); scroll if many types. Do not grow the circle.

5. **CSS cleanup** — Remove derivation-specific `height: auto` / `border-radius: 999px` / wider width that elongated the node; move toolbar styles under `.td-node-wrap__types` (or equivalent).

## Risks / Trade-offs

- [Risk] Wider bounding box overlaps neighbors → Mitigation: compact chips; accept spacing trade-off over deformed circles.
- [Risk] Handles vs rail asymmetry → Mitigation: handles only on circle; document that edge endpoints stay centered on the disc.
- [Risk] Clicking rail vs selecting node → Mitigation: stopPropagation on rail; clicking circle still selects.

## Migration Plan

Frontend CSS/structure only. Rollback = previous in-circle chips (not desired).

## Open Questions

- None; default right + left-align is fixed by the request.
