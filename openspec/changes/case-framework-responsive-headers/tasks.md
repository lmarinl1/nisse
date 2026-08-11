## 1. Shared Session Canvas Header containment

- [x] 1.1 Update `session-canvas-header.css` so `__aside` is shrinkable (`min-width: 0`, `max-width: 100%`, allow shrink) and cannot force horizontal overflow past the header frame
- [x] 1.2 Ensure overview variant (or equivalent) lets the aside occupy a full-width band under brand/copy when wrapped (`flex-basis: 100%` / `width: 100%`) so dense secondary content has the full header width
- [x] 1.3 Confirm section variant still places status aside usefully (right-aligned when space allows; stacks cleanly when narrow)

## 2. Case Framework overview tracking

- [x] 2.1 Remove aggressive `-webkit-line-clamp` on `.case-framework__tracking-label`; keep wrap/`overflow-wrap` so titles use line breaks and remain fully readable
- [x] 2.2 Keep five-column `minmax(0, 1fr)` grid with `min-width: 0` items; raise collapse breakpoint if needed so tracking stacks before overflowing (Companion-open widths)
- [x] 2.3 Verify all five tracking items (including 05 Objeto de estudio) stay inside the overview header border with Companion open and closed

## 3. Cross-session smoke + UX check

- [x] 3.1 Smoke CF section header (tríada / Guardado) and Timelines overview/detail headers for no overflow after shared CSS changes
- [x] 3.2 Verify design tokens + Canvas/Companion patterns: header remains framed research surface, no horizontal scroll as a fix, Canvas stays protagonist below
- [x] 3.3 Manual check via WSL: `cd frontend && npm run dev` — overview Marco at `/studies/:id/case-framework` at desktop + narrowed stage
