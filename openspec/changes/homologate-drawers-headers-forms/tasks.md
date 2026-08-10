## 1. Shared primitives and tokens

- [x] 1.1 Add drawer tokens (`--drawer-width: clamp(18rem, 25vw, 28rem)`, title color discovery) in `shared/tokens` / research-drawer CSS
- [x] 1.2 Implement `ResearchDrawer` (right sheet, backdrop, Esc, header slot with starred mark + yellow title, body scroll, footer actions)
- [x] 1.3 Implement `FormField` + styled input/textarea base for drawers
- [x] 1.4 Add `@radix-ui/react-select` (WSL `npm install`) and `ResearchSelect` styled with NISSE tokens (keyboard + focus visible)
- [x] 1.5 Implement `SessionCanvasHeader` (mark discovery, eyebrow, title, purpose, `aside`) + shared CSS extracted from case-framework hero

## 2. Migrate drawers

- [x] 2.1 Migrate `StudyCreateDrawer` to `ResearchDrawer` + discovery CTA + mark
- [x] 2.2 Migrate Timelines drawers (`TimelineDrawer`, `RecallDrawer`, `TimelineCollapseDialog`, create-recuerdo sheet) to `ResearchDrawer`; replace `primary` with `btn-discovery`; use `ResearchSelect` for classifications
- [x] 2.3 Migrate Case Framework overview drawer to `ResearchDrawer` chrome (keep Markdown body)
- [x] 2.4 Remove or thin obsolete width rules in `study-drawer.css` / `case-framework` drawer CSS so chrome cannot diverge

## 3. Homologate session headers

- [x] 3.1 Refactor Case Framework overview/section headers to `SessionCanvasHeader` (preserve tracking/status in `aside`)
- [x] 3.2 Refactor Timelines overview + detail headers to `SessionCanvasHeader`
- [x] 3.3 Verify tokens + Canvas-first: header secondary to Canvas content; no dashboard chrome

## 4. Timeline track alignment

- [x] 4.1 Introduce `--timeline-spine-x` / shared radius and center all marker + recall node circles on the spine
- [x] 4.2 Visual check start / present / horizon / collapse nodes share one axis

## 5. Docs and QA

- [x] 5.1 Brief UX/docs note (or comment in `02-components` / architecture) that ResearchDrawer + SessionCanvasHeader are the official instruments for drawer/header
- [x] 5.2 Typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
- [x] 5.3 Manual smoke: Study drawer, Timeline drawers, CF drawer, headers CF↔Timelines, spine centering, Select keyboard
