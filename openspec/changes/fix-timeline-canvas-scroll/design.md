## Context

See proposal.md — Why. Today `.timeline-canvas` / `.timelines` use `min-height: 100%` without height + overflow containment, so long tracks grow the stage and scroll with the viewport/document. Case Framework already contains scroll with `height: 100%; min-height: 0; overflow-y: auto` on `.case-framework`. Workspace shell already sets `height: 100vh` and `overflow: hidden` on rails; the stage flex child must pass `min-height: 0` down to the instrument root.

## Goals / Non-Goals

**Goals:**
- Mirror Case Framework scroll containment for Timeline Canvas (subitem) so only the central surface scrolls.
- Keep Drawers overlaid correctly (not trapped inside a nested scroll that clips them oddly).
- Apply the same root containment to timelines overview if it shares the growth bug.

**Non-Goals:**
- No API/model changes; no track redesign; no new scroll libraries.

## Decisions

1. **Contain at the timelines instrument root (preferred), not `html/body`.**
   - Set `.timeline-canvas` (and `.timelines` if needed) to fill the stage: `height: 100%` / `min-height: 0` / `overflow-y: auto` (and `overflow-x: hidden` if needed), matching `.case-framework`.
   - Ensure the Outlet chain under `.workspace__stage` → session wrapper passes `flex: 1; min-height: 0; height: 100%` so percentage height resolves.
   - **Alternatives:** scroll on `.workspace__stage` for all sessions → rejected as broader behavior change; body scroll lock → rejected (breaks Workspace grammar elsewhere).

2. **Drawers stay portaled / fixed to viewport as today.**
   - Do not nest ResearchDrawer inside the scrolling track-only region in a way that clips it; keep current drawer mounting. If a header must stay sticky within the canvas, prefer CSS sticky only if trivial—default is entire canvas scrolls including header (acceptable for v1; Case Framework scrolls whole instrument).

3. **Overview included only if same CSS root causes document scroll.**
   - Same containment classes/pattern on `.timelines` when smoke shows overview also spills; otherwise leave overview alone after verifying.

## Risks / Trade-offs

- [Risk] Percentage height fails if an intermediate wrapper lacks `min-height: 0` / height → Mitigation: inspect `StudyWorkspace` Outlet wrappers and TimelinesRoutes; add one thin flex wrapper if missing.
- [Risk] Mobile media queries set `overflow: visible` on stage → Mitigation: preserve mobile rules; only tighten desktop containment; smoke on narrow viewport.
- [Risk] Nested scroll + drawer focus → Mitigation: manual smoke with open RecallDrawer while scrolling track.

## Migration Plan

- Frontend-only CSS/layout; no data migration. Rollback = revert CSS/wrapper.

## Open Questions

- None material; sticky header inside Timeline Canvas deferred unless UX review asks for it after apply.
