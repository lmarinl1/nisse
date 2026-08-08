## 1. Favicon and brand primitives

- [x] 1.1 Verify `frontend/index.html` favicon points to `/brand/nisse-favicon.svg`; fix if missing or stale
- [x] 1.2 Add `NisseBrandLockup` in `frontend/src/shared/brand` (mark + wordmark “NISSE”, size/variant props) and export from the brand barrel
- [x] 1.3 Style the lockup with tokens + clear space (`.nisse-mark` / brand CSS); support `official` (entry) and `favicon` (compact) variants

## 2. Identity surfaces

- [x] 2.1 Replace typography-only brand on `AuthScreen` with `NisseBrandLockup` (`official`, modest size)
- [x] 2.2 Replace Study Home header brand with the same lockup; keep atmosphere and Study actions as protagonists
- [x] 2.3 Update `DiagnosticsPage` identity chrome to use the lockup
- [x] 2.4 Add compact mark (favicon variant) to Workspace rail identity / back-to-library chrome without overlaying the Canvas

## 3. Official UI icons on controls

- [x] 3.1 Use `CloseIcon` (and `PlusIcon` where create is iconified) in `StudyCreateDrawer` / Study Home actions that map to catalog meanings
- [x] 3.2 Replace Workspace “← Biblioteca” chevron/text affordance with `ArrowLeftIcon` + label where it improves orientation
- [x] 3.3 Audit touched headers for emoji/ad-hoc glyphs; remove or replace with catalog icons only when they orient

## 4. Color roles and QA

- [x] 4.1 Confirm discovery/atmosphere accents still use discovery tokens; do not recolor panels to `--color-brand-neon`
- [x] 4.2 Visual checklist against `docs/ux-framework/10-iconography.md` and `13-brand-mark.md` (clear space, sizes 16/20/24/32 for UI icons, no logo stretch)
- [x] 4.3 Typecheck/build frontend in WSL: `cd frontend && npx tsc -b && npm run build`
