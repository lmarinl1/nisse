## 1. Shared atmosphere instrument

- [x] 1.1 Create `ResearchNetworkAtmosphere` (Canvas 2D): orbital field, discovery-colored nodes, edges that fade in/out; `pointer-events: none`
- [x] 1.2 Wire ResizeObserver + DPR sizing; pause on `document.hidden`; respect `prefers-reduced-motion` with static frame
- [x] 1.3 Style via semantic tokens only (`--color-discovery-primary`, workspace z-index); density prop default `sparse`

## 2. Study entry integration

- [x] 2.1 Mount atmosphere as full-bleed background in `StudyHome` (library + Empty State); keep content above with readable contrast
- [x] 2.2 Verify copy/actions remain primary focus (no chart/KPI feel); adjust opacity/vignette if needed

## 3. Verification

- [x] 3.1 Manual check: library, empty state, mobile width, reduced-motion
- [x] 3.2 UX checklist: laboratory atmosphere, motion with purpose, tokens, reusable component ready for later surfaces
