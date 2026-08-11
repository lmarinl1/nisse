## 1. Import Set II SVG sources

- [x] 1.1 From WSL, copy the 34 Set II SVGs from `/mnt/c/Users/lmari/Downloads/nisse-icons-v2/*.svg` into `frontend/src/shared/icons/svg/` (exclude `README.md`; do not touch `public/brand` or any brand assets)
- [x] 1.2 Verify each SVG is 24×24, `stroke="currentColor"`, stroke width 2, and has no hardcoded kit neon fill/stroke hex that would fight `Icon` / tokens

## 2. Register catalog API

- [x] 2.1 Add React glyph fragments for all 34 names in `frontend/src/shared/icons/registry.tsx` and extend the `icons` map / `IconName` union
- [x] 2.2 Add named wrappers in `named.tsx` and re-export them from `index.ts` (PascalCase `*Icon`, kebab-case registry keys)

## 3. Remap research session instruments

- [x] 3.1 Update `frontend/src/features/workspace/researchSessions.ts` to the design remapping table (`timeline-clock`, `trajectory`, `compass`, `orbit`, `constellation`, `perspective`, `telescope`; keep `document` / `check`)
- [x] 3.2 Grep for other weak proxy mappings that should follow the same semantic upgrades (docs tables or Case Framework section icons only if they clearly match); leave unrelated Set I usages alone

## 4. UX framework & README sync

- [x] 4.1 Update `docs/ux-framework/10-iconography.md`: catalog table for Set II, families (time / astronomy / navigation / graphs / futures), Cognitive Object map, and a note that UI `telescope` ≠ brand mark
- [x] 4.2 Update `frontend/src/shared/icons/README.md` to mention Set II and that extension still goes through svg → registry → named → docs
- [x] 4.3 Add a one-line cross-ref in `docs/ux-framework/13-brand-mark.md` only if needed to reinforce mark vs UI icon separation

## 5. Visual & token verification

- [x] 5.1 Confirm Workspace Sidebar shows remapped session icons at nav size with token/`currentColor` inheritance (no hardcoded neon)
- [x] 5.2 Confirm brand lockup / favicon / `NisseMark` unchanged and Canvas/Companion patterns untouched by this change
- [x] 5.3 Run frontend typecheck (`cd frontend && npm run build` or project’s existing `tsc` script) in WSL to ensure `IconName` / exports compile
