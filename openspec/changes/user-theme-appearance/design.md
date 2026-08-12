## Context

Today `frontend/src/shared/tokens/tokens.css` defines a single `:root` dark atmosphere (`color-scheme: dark`). Settings (`/settings`) only edits Perfil identity fields via `GET`/`PATCH /api/profile/me/`. Design Language already distinguishes Modo Light (papel técnico) vs Modo Dark (profundidad) in `docs/ux-framework/01-visual-language.md` and semantic tokens in `06-design-tokens.md`, but no dual CSS mapping or user preference exists. See `proposal.md` for motivation; specs under `specs/` for behavioral contracts.

## Goals / Non-Goals

**Goals:**

- Dual token atmospheres (dark = current; light = warm paper) switched by `data-theme` on `document.documentElement`.
- Persist `theme_preference` on Profile; resolve `system` via `prefers-color-scheme`.
- Settings Apariencia (Claro / Oscuro / Dependiente del dispositivo) editable and saveable.
- Document explicit light/dark token values in UX framework docs.

**Non-Goals:**

- Per-component theme overrides, user-custom palettes, or third-party theme libraries.
- Changing brand mark geometry; only which variant/contrast pairs with the atmosphere.
- README/stack docs (Neo4j, React Flow, etc.) — out of this change’s scope.

## Decisions

### 1. Attribute-based theme, not separate CSS bundles

- **Choice:** Keep one `tokens.css`. Move current `:root` color/atmosphere values under `:root, [data-theme="dark"]` (or `:root` defaults dark + `[data-theme="dark"]` explicit). Add `[data-theme="light"]` overrides for color, borders, shadows, scrollbar mixes, and `:root` background gradients.
- **Why:** Components already consume CSS variables; zero churn in feature CSS if they stay on tokens.
- **Alternatives:** Tailwind `dark:` class strategy (more invasive); CSS `@media (prefers-color-scheme)` alone (cannot honor explicit light/dark preference).

### 2. Preference model and defaults

- **Choice:** `Profile.theme_preference` ∈ `{light, dark, system}`, default **`dark`**.
- **Why:** Preserves today’s laboratory for existing users; `system` is opt-in. Specs require this default.
- **Alternatives:** Default `system` (surprises dark-designed users on light OS).

### 3. Resolution pipeline

```text
theme_preference → resolvedAppearance ('light'|'dark') → set data-theme + color-scheme
```

- **Choice:** Small `ThemeProvider` (or equivalent) near auth root: reads Profile when authenticated; listens to `matchMedia('(prefers-color-scheme: dark)')` when preference is `system`; writes `document.documentElement.dataset.theme`. Optional `localStorage` mirror of last known preference to reduce FOUC before Profile loads (still defaulting to `dark` if empty).
- **Why:** Single write point; Settings and shell stay in sync via Auth/Profile state after PATCH.
- **Alternatives:** Only CSS media queries; only localStorage without API (breaks cross-device preference).

### 4. Light palette (NISSE + optional Colegiatura warmth)

Inspired by warm academic paper surfaces (Colegiatura ECE feel: cream/warm neutrals, high-contrast ink) while remaining NISSE—not a brand clone:

| Token | Dark (current) | Light (proposed) |
| --- | --- | --- |
| workspace.background | `#0c1014` | `#f3eee6` warm paper |
| workspace.surface | `#141a21` | `#faf6ef` |
| workspace.panel | `#1a222c` | `#fffdf8` |
| workspace.canvas | `#10161d` | `#ebe4da` |
| text.primary | `#e8edf2` | `#1a222c` |
| text.secondary | `#9aa5b5` | `#5c6675` |
| text.muted | `#6b7585` | `#7a8494` |
| discovery.primary | `#e8c547` | `#c9a227` (slightly deeper for contrast on cream) |
| discovery.secondary | `#c9a227` | `#a8861f` |
| brand.neon / deep-space | unchanged (mark assets) | unchanged; UI lockups still use discovery |
| success/warning/error/info | current | slightly deepened for WCAG on light surfaces |

Background atmosphere in light: soft warm radial washes (discovery at low opacity + ivory), **no** cool blue-slate wash from dark mode.

### 5. Settings UX

- **Choice:** Add Settings nav section **Apariencia** (or a dedicated block under the Settings panel) with a three-option control (segmented radios or ResearchSelect). Persist via Profile PATCH (`theme_preference`). Apply theme **optimistically** on selection for immediate feedback; still require Guardar if co-located with dirty Profile form—or save Apariencia independently with the same success toast pattern.
- **Decision detail:** Prefer **optimistic apply + include in Profile form save** (one Guardar) to reuse dirty-state protection; if Apariencia is a separate panel, allow immediate PATCH on change with `Cambios guardados`.
- **Recommended:** Separate Apariencia section with **immediate persist on change** (preference is atomic) so users aren’t blocked by unfinished Perfil edits. Dirty-state for Perfil remains unchanged.
- **Alternatives:** Only a header toggle (faster but weaker “preferencia de perfil”); force full form save only.

### 6. Docs

- Update `01-visual-language.md` Modo Light/Dark with concrete hex/token tables.
- Update `06-design-tokens.md` noting dual atmospheres and that components bind to semantic tokens only.
- Do not invent new semantic token names; only dual values.

## Risks / Trade-offs

- **[Hardcoded hex outside tokens]** → Audit high-traffic CSS during apply; fix leaks that break in light.
- **[Atmosphere / React Flow / canvas contrast]** → Verify canvas stage and network atmosphere remain legible on cream; may need theme-aware opacity tweaks without redesigning features.
- **[FOUC]** → Default `data-theme="dark"` in `index.html` + early script or provider sync; localStorage optional.
- **[Mongo field on existing Profiles]** → Default `dark` on model; missing field treated as dark in serializer.
- **[Immediate Apariencia PATCH vs form dirty]** → Documented decision: Apariencia saves independently to avoid coupling with unfinished Perfil edits.

## Migration Plan

1. Ship backend field + API (default `dark`); existing Profiles behave as today.
2. Ship dual tokens with `data-theme="dark"` default — visual no-op for current users.
3. Ship ThemeProvider + Settings Apariencia.
4. Update UX docs in the same change.
5. Rollback: remove UI control and light overrides; field can remain unused.

## Open Questions

None that block specs or tasks. Fine-tuning exact light hex values during apply is allowed if contrast audits require small adjustments within “warm paper + discovery” intent.
