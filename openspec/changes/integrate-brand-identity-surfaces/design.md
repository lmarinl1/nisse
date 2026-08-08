## Context

See `proposal.md` (Why) and delta specs under `specs/brand-identity` + `specs/frontend-app`.

Assets and primitives already land in the repo:

- Brand SVGs: `frontend/public/brand/`
- React API: `NisseMark` in `frontend/src/shared/brand`
- UI icons: `frontend/src/shared/icons`
- Tokens: `--color-brand-neon`, `--color-brand-deep-space`, discovery accents unchanged
- UX norms: `docs/ux-framework/10-iconography.md`, `13-brand-mark.md`

Gap: identity surfaces still use typography-only `.brand` (“NISSE”) in `AuthScreen`, `StudyHome`, `DiagnosticsPage`; Workspace chrome may lack a lockup; action controls rarely use the icon catalog. Favicon may already point at `/brand/nisse-favicon.svg` — verify and complete if missing apple-touch / sizes are out of scope.

## Goals / Non-Goals

**Goals:**

- One reusable identity lockup pattern (mark + wordmark) for entry/headers.
- Wire favicon + lockups + selective UI icons without redesigning layouts.
- Keep brand neon vs discovery accent roles explicit in CSS/composition.

**Non-Goals:**

- New design-system package or Storybook.
- Inline-SVG `currentColor` brand pipeline (defer; prefer fixed-color official/favicon assets).
- Replacing research atmosphere colors with brand neon.
- Backend or API work.

## Decisions

### 1. Identity lockup component vs ad-hoc markup

- **Choice:** Small shared composition `NisseBrandLockup` (or equivalent) in `shared/brand` wrapping `NisseMark` + wordmark text styled with display/primary type tokens.
- **Why:** Auth / Study / Diagnostics / Workspace share the same lockup rules (clear space, size variants).
- **Alternatives:** Duplicate mark+text in each screen → rejected (drift). Put lockup only in CSS with background-image → rejected (a11y / sizing control).

### 2. Variant selection by surface size

- **Choice:** Entry heroes / primary headers → `variant="official"` at ~40–48px. Dense chrome / compact slots → `variant="favicon"` at 16–24px. Prefer `official-clean` only if glow fights dense UI.
- **Why:** Matches `13-brand-mark.md` (stars noisy at small sizes).
- **Alternatives:** Always official scaled down → rejected.

### 3. Color roles

- **Choice:** Keep official SVG neon baked into mark assets. Do not recolor whole UI to `--color-brand-neon`. Discovery / research tokens stay for atmosphere and research emphasis. Wordmark uses `--color-text-primary` (or discovery only for subtle emphasis if already established — do not invent new brand typography color).
- **Why:** Dual system already documented; mixing neon into panels reads as cyberpunk, which brand rules forbid.
- **Alternatives:** Unify UI accent to `#D7FF2F` → rejected for this change.

### 4. Where icons appear

- **Choice:** Replace text-only or ambiguous controls that already mean catalog actions: drawer close → `CloseIcon`; create Study → `PlusIcon`; overflow/more → `MoreIcon`; logout/exit if iconified → prefer text label with optional `LockIcon`/`ArrowLeftIcon` only if it clarifies. Skip decorative icon rows.
- **Why:** Iconography rules: orient, don’t decorate; Canvas stays protagonist.
- **Alternatives:** Icon-heavy toolbar on Study home → rejected.

### 5. Favicon

- **Choice:** Single SVG favicon link to `/brand/nisse-favicon.svg` in `index.html`. No PNG pack in this change.
- **Why:** Kit recommendation; SVG is enough for modern browsers.
- **Alternatives:** Full PWA icon set → defer.

### 6. Workspace chrome

- **Choice:** If `StudyWorkspace` has a top chrome / back-to-library control, add compact lockup or compact mark + study title; do not overlay the Canvas with a large official mark.
- **Why:** Workspace grammar — Canvas first.

## Risks / Trade-offs

- [Official mark glow on dark auth] → Prefer `official` first; switch to `official-clean` if contrast/noise appears in QA.
- [Lockup competes with research atmosphere] → Keep mark modest (~48px), clear space via `.nisse-mark` margin; do not enlarge to hero marketing size.
- [Icon inconsistency mid-migration] → Tasks list concrete screens/controls; leave unlabeled text buttons as text when no catalog match.
- [`currentColor` brand via `<img>` ineffective] → Do not use currentColor variants in this change.

## Migration Plan

1. Confirm favicon head link.
2. Add lockup primitive + CSS using existing brand tokens/classes.
3. Swap Auth → Study Home → Diagnostics → Workspace chrome.
4. Add catalog icons to named controls (drawer close/create, etc.).
5. Visual pass vs `10-iconography` / `13-brand-mark` checklists.
6. Rollback: revert frontend commits; assets remain unused but harmless.

## Open Questions

None blocking. Optional later: apple-touch-icon / PWA masks using dark variants.
