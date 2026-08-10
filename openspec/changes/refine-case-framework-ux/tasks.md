## 1. Iconography and Sidebar chrome

- [x] 1.1 Add official `chevron` (down) SVG + registry/named export in `frontend/src/shared/icons`
- [x] 1.2 Refactor Case Framework primary item so chevron sits inside the selectable row (remove external expand button); wire expand/collapse + `aria-expanded`
- [x] 1.3 Style chevron hover: discovery yellow + circular halo
- [x] 1.4 Restyle `.research-session-nav` scrollbar as thin soft-yellow capsule on a line (WebKit + Firefox)

## 2. Section Canvas composition

- [x] 2.1 Build protagonist section header (Marco mark, title, subtitle, progress status, save feedback)
- [x] 2.2 Replace reviewed checkbox with `Marcar como terminado` color-line switch (`role="switch"`); map UI label Terminado ← status `reviewed`
- [x] 2.3 Layout section fields as two-column mosaic (single column on narrow viewports)
- [x] 2.4 Upgrade field block: title + subtitle; guiding question as footer/tooltip hint; tabs Escribir / Previsualizar using existing Markdown render helper

## 3. Overview Canvas and Drawer

- [x] 3.1 Add overview header band with yellow-circle tracking of all five subitem statuses
- [x] 3.2 Render each overview field as fixed-size tile (empty state = empty tile; fit = inline MD)
- [x] 3.3 On overflow, open right-side read-only Drawer with full Markdown for that field; close without editing

## 4. QA

- [x] 4.1 Manual smoke: chevron in-item + hover halo; mosaic + tabs; terminado toggle; overview tiles + Drawer; capsule scrollbar
- [x] 4.2 Typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
