## 1. Backend Profile preference

- [x] 1.1 Add `Profile.theme_preference` (`light` | `dark` | `system`, default `dark`) in `backend/core/models.py`
- [x] 1.2 Expose and validate `theme_preference` on Profile serializer and `GET`/`PATCH /api/profile/me/`
- [x] 1.3 Add/adjust API tests for default, valid PATCH, and invalid value rejection

## 2. Dual design tokens

- [x] 2.1 Refactor `frontend/src/shared/tokens/tokens.css` so current values are the dark atmosphere (`data-theme="dark"` / default)
- [x] 2.2 Add `[data-theme="light"]` overrides per design (warm paper surfaces, high-contrast text, discovery accents, warm gradients)
- [x] 2.3 Ensure `color-scheme` matches resolved theme; set default `data-theme="dark"` early (e.g. `index.html`) to avoid FOUC

## 3. Theme resolution (frontend)

- [x] 3.1 Extend `Profile` / `ProfileUpdateInput` types with `theme_preference`
- [x] 3.2 Implement ThemeProvider (or equivalent): resolve preference → appearance, set `documentElement.dataset.theme`, listen to `prefers-color-scheme` when `system`
- [x] 3.3 Wire provider into app root with Auth/Profile; optional localStorage mirror of last preference

## 4. Settings Apariencia

- [x] 4.1 Add Settings section/nav **Apariencia** with Claro / Oscuro / Dependiente del dispositivo
- [x] 4.2 Persist on change via Profile PATCH (independent of Perfil dirty form); show save feedback / errors
- [x] 4.3 Verify optimistic theme apply + restored preference after reload

## 5. Docs + visual QA

- [x] 5.1 Update `docs/ux-framework/01-visual-language.md` and `06-design-tokens.md` with dual atmospheres and concrete light values
- [x] 5.2 Spot-check Workspace (Canvas/panels/Companion), Settings, and entry under light and dark; fix token leaks (hardcoded hex) that break contrast
- [x] 5.3 Confirm components still use semantic tokens only (no new hardcoded theme colors in features)
