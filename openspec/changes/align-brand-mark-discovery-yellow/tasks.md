## 1. Remove Proceso label

- [x] 1.1 Remove the visible “Proceso” eyebrow from `ResearchSessionNav` while keeping a meaningful `aria-label` on the nav

## 2. Discovery-colored brand lockup

- [x] 2.1 Switch `NisseBrandLockup` (entry + compact) so the mark renders with `--color-discovery-primary` (currentColor/mask/inline as needed; not brand-neon SVGs for in-app lockups)
- [x] 2.2 Confirm active research-session icons and the lockup mark share the discovery accent on the Workspace rail

## 3. Design Language

- [x] 3.1 Update `docs/ux-framework/13-brand-mark.md` so in-app lockups use discovery; neon remains kit/marketing
- [x] 3.2 Align related notes in `docs/ux-framework/10-iconography.md` (and `01-visual-language.md` only if a short cross-reference is needed)

## 4. Verify

- [x] 4.1 Spot-check auth, Campo, and Workspace: no “Proceso”; mark reads discovery yellow like active nav icons (WSL `npm run dev` in `frontend/`)
