## 1. Backend Profile model and migration

- [x] 1.1 Extend `Profile` with `first_name`, `last_name`, `role_title`, `country_code`, `phone` (blank-safe) and keep `display_name` as backfilled convenience per design.md
- [x] 1.2 Add migration + data backfill: copy existing `display_name` into `first_name` when present
- [x] 1.3 Update `ensure_profile` defaults for new users without inventing fake personal data

## 2. Backend Profile API

- [x] 2.1 Expand `ProfileSerializer` for GET/PATCH payload (nombre fields, cargo, country_code, phone, email from User, username) with validation (required on write, `+\d{1,4}` country code, phone digits, email format, username/email uniqueness excluding self)
- [x] 2.2 Implement `PATCH` on `ProfileMeView` using only `request.user` / `ensure_profile`; ignore any client-supplied user id
- [x] 2.3 Add/adjust API tests: GET fields, PATCH success, validation 400, cannot mutate another user, logout still 401s Profile (WSL: `source .venv/bin/activate && cd backend && python manage.py test`)

## 3. Frontend identity primitives

- [x] 3.1 Extend `Profile` type + `updateProfileMe` (PATCH) in `shared/api/client.ts`
- [x] 3.2 Add `profileInitials.ts` and unit-cover edge cases (compound apellidos, empty parts, Unicode)
- [x] 3.3 Build `UserIdentity` variants (`header` | `workspace` | `dropdown` | `settings`) with yellow-border transparent avatar; reuse one initials source
- [x] 3.4 Add official icons for settings/logout (and named exports) under `shared/icons` if missing; no emojis
- [x] 3.5 Extend `AuthContext` with `updateProfile` so all consumers share one Profile state

## 4. Header menu and Study entry chrome

- [x] 4.1 Build accessible `UserMenu` dropdown (identity header, Perfil/Settings → `/settings`, Cerrar sesión → existing logout; close on outside/Escape/action; keyboard)
- [x] 4.2 Replace ad-hoc identity/logout in `StudyHome` with brand + `UserIdentity` (`workspace`) coexistence and header/menu control
- [x] 4.3 Verify tokens + no dashboard chrome; brand remains primary over user reference

## 5. Settings screen

- [x] 5.1 Add authenticated `/settings` route and `SettingsScreen` with single Perfil section (extensible shell, no fake sections)
- [x] 5.2 Build `ProfileSettingsForm` grouped (personal / contacto / identidad), prominent avatar, field errors, `Guardar cambios` states, success toast `Cambios guardados`
- [x] 5.3 Wire dirty navigation guard (`useBlocker` or equivalent) with Spanish confirm copy; skip when clean
- [x] 5.4 Loading skeletons/placeholders and load-error retry without inventing profile data or crashing the app
- [x] 5.5 Responsive single-column on small viewports; controlled centered width on desktop

## 6. Verification

- [x] 6.1 Manual smoke in WSL (backend `runserver` + `cd frontend && npm run dev`): edit profile → Header/Campo/dropdown update without re-login; logout clears session; unsaved warning; validation errors
- [x] 6.2 Frontend typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
