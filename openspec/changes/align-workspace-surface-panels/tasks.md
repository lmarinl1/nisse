## 1. Shared framing

- [x] 1.1 Restyle workspace rail and companion columns as background + padding (no solid edge-filled sidebar), matching the stage field behind the Canvas
- [x] 1.2 Apply Canvas-like framed surface (border, radius-lg, canvas/panel fill) to rail panels and wrap Companion in the same treatment

## 2. Stack and grow

- [x] 2.1 Make the sessions rail panel flex-grow to fill height between identity and study panels; allow internal scroll if needed
- [x] 2.2 Align desktop padding so rail panels, Canvas, and Companion tops share one inset band

## 3. Verify

- [x] 3.1 Spot-check desktop Workspace: three stacked framed rail panels (sessions stretched), Companion framed like Canvas, aligned with stage (WSL `npm run dev` in `frontend/`)
