## Context

Hoy el producto ya tiene `Profile` 1:1 con `User`, `GET /api/profile/me/`, token auth, `AuthContext` y un chrome mínimo en `StudyHome` (texto + logout). Faltan campos de trabajo, PATCH, `UserIdentity` compartido y Settings. Ver proposal.md — Why. Specs: `identity-profile`, `user-settings`, deltas `backend-api` + `frontend-app`.

Constraints: tokens NISSE; iconos solo `shared/icons`; Drawer > Modal; Settings es pantalla, no dashboard; WSL only; sin auth paralela.

## Goals / Non-Goals

**Goals:**
- Extender el `Profile` existente (no segundo usuario).
- `GET`/`PATCH /api/profile/me/` con identidad solo desde sesión.
- `UserIdentity` + estado de perfil único; Settings Perfil; dropdown + logout existente.
- Migración segura para perfiles legacy incompletos.

**Non-Goals:**
- Preferencias/seguridad/notificaciones; avatar foto; perfiles públicos; rediseño del Workspace shell completo.

## Decisions

### 1. Store work fields on `Profile`; sync User credentials where they already live

Keep `Profile` as product identity. Add:

| Field (API/UI) | Storage |
|---|---|
| `first_name` / nombre | `Profile.first_name` |
| `last_name` / apellidos | `Profile.last_name` |
| `role_title` / cargo | `Profile.role_title` |
| `country_code` | `Profile.country_code` (e.g. `+57`) |
| `phone` / celular | `Profile.phone` (national number; validated with country_code) |
| `email` | `User.email` (unique when non-empty) |
| `username` | `User.username` (existing uniqueness) |

Deprecate client reliance on `display_name` for chrome: derive display first name from `first_name`. Keep `display_name` temporarily as computed/backfilled convenience (`first_name` or username) to avoid breaking smoke until clients migrate.

**Alternatives:** Custom User model fields only → mixes auth and product identity. Separate `UserProfile` table → unnecessary; 1:1 Profile already exists.

### 2. API shape

```text
GET   /api/profile/me/
PATCH /api/profile/me/
POST  /api/auth/logout/   # existing
```

`ProfileMeView.patch` uses `ensure_profile(request.user)` then validates/writes. Serializer exposes camel/snake consistent with current API (snake_case like today). Username/email updates go through User with uniqueness checks excluding self.

### 3. Legacy / incomplete profiles

Migration: add fields with `blank=True` defaults empty; backfill `first_name` from existing `display_name` when present. Registration stays username+password for now. **Requiredness is enforced on PATCH/Settings save**, not on every GET. Header/Workspace use safe initials fallback until the user completes Settings.

**Alternatives:** Force completion gate before Studies → rejected for this change (too invasive).

### 4. Initials helper

Centralize `getProfileInitials(firstName, lastName)` in frontend (and mirror rule in tests). Rule: first Unicode letter of each trimmed field, uppercased; if one side missing, use the available letter; if both missing, `?`. For `De la Cruz`, first letter of the apellidos string → `D` (no particle-stripping in v1).

### 5. Frontend module layout

```text
frontend/src/features/identity/
  AuthContext.tsx          # extend: updateProfile, setProfile after PATCH
  UserIdentity.tsx         # variants: header | workspace | dropdown | settings
  profileInitials.ts
  SettingsScreen.tsx       # route page
  ProfileSettingsForm.tsx
  UserMenu.tsx             # dropdown chrome
```

Route: `/settings` under `RequireAuth`. Study entry replaces ad-hoc identity/logout with `UserIdentity` + `UserMenu`. Reuse existing form field patterns / Research form primitives if `homologate-drawers-headers-forms` lands first; otherwise match current study form tokens without inventing a new design system.

### 6. Dropdown menu items

v1 actions: **Settings** → `/settings`; **Cerrar sesión** → existing `logout()`. Identity block at top of dropdown satisfies the “perfil” reference; a separate “Perfil” item also routes to `/settings` (same destination) to match the feature checklist without inventing a second screen.

### 7. Unsaved changes

Use `useBlocker` (React Router) when dirty; confirm copy in Spanish (`Seguir editando` / `Salir sin guardar`). Prefer lightweight confirm surface consistent with NISSE (non-dashboard); Modal only if no existing pattern fits—Drawer is wrong for leave confirmation.

### 8. Country code + phone validation

v1: country_code must match `^\+\d{1,4}$`; phone digits-only length 6–15; no full libphonenumber dependency unless already present. Document that deeper regional validation can come later.

## Risks / Trade-offs

- [Incomplete legacy profiles look sparse in Header] → Initials fallback + empty-safe copy; nudge via Settings, no hard gate.
- [Username change mid-session] → Update AuthContext profile immediately; token remains valid (token is not username-bound in current DRF Token auth).
- [Parallel OpenSpec change for drawers/forms] → Prefer shared form primitives when available; otherwise local Settings CSS on tokens to avoid blocking.
- [Email uniqueness with blank legacy emails] → Treat blank as unset; enforce uniqueness only for non-empty values.

## Migration Plan

1. Add Profile fields + migration/backfill `first_name` from `display_name`.
2. Extend serializer + PATCH; tests for auth isolation and validation.
3. Ship `UserIdentity` + AuthContext update + Study entry chrome.
4. Add `/settings` form + dirty guard + client `updateProfileMe`.
5. Smoke: login → edit profile → see Header/Campo update → logout.

Rollback: revert deploy; new columns remain nullable/blank-safe.

## Open Questions

- None blocking: registration enrichment (collect nombre/apellidos at signup) deferred; Settings completion is enough for v1.
