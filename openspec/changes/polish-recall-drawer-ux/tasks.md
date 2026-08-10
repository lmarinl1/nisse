## 1. Research Drawer CSS polish

- [x] 1.1 Replace drawer input/select focus `outline` with uniform discovery `box-shadow` ring (all four sides; `outline: none` on focus)
- [x] 1.2 Harden `.research-drawer__body` scroll (`min-height: 0`, `overflow-y: auto`) so nested create/edit Recuerdo content scrolls
- [x] 1.3 Add compact footer CTA treatment (`.btn-discovery--compact` or footer layout) so «Crear recuerdo» / Guardar no se vean excesivos

## 2. Wire Recuerdo drawers

- [x] 2.1 Apply compact CTA on create-recuerdo footer in `TimelineCanvas` and save CTA in `RecallDrawer` (and align other Research Drawer footers if trivial)
- [x] 2.2 Verify edit Recuerdo with long Markdown + momentos: body scrolls; header/footer remain usable

## 3. QA

- [x] 3.1 Visual smoke: focus ring even on input/textarea/select; create CTA size; edit scroll
- [x] 3.2 Typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
