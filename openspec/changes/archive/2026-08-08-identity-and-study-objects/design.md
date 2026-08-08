## Context

Hoy el monorepo solo expone health (`GET /api/health/`) y un frontend demo. Auth de Django (Mongo) ya está en `INSTALLED_APPS`, pero no hay Profile, Study ni Workspace. Ver `proposal.md` (Why) y deltas en `specs/`.

Constraints: MongoDB vía django-mongodb-backend; API bajo `/api/`; UI como laboratorio (`docs/ux-framework/05`, `08`, Empty States en `03`/`01`); IDs en inglés, copy en español; sin "Project".

## Goals / Non-Goals

**Goals:**

- Modelo estable `Study` como Aggregate Root + `Profile` 1:1 con User.
- Auth local mínima usable en lab (register/login/session o token) con ownership estricto.
- Contrato API + cliente tipado + rutas Library / Create / Workspace.
- Empty State y Workspace shell alineados al UX Framework (Canvas protagonista).

**Non-Goals (diseño):**

- React Flow / grafos reales, Companion IA, tokens de diseño completos si no existen aún (mínimo viable de shell + tokens básicos).
- SSO, invitaciones, roles, multi-owner.
- Hard delete, restore UI avanzada de archivo (solo archivar y ocultar del default).

## Decisions

### 1. Auth local con DRF TokenAuthentication (+ User Django)

**Choice:** `django.contrib.auth.User` + registro/login que emiten token DRF (`authtoken`); cliente envía `Authorization: Token …`. Profile vía `get_or_create` en login/register y en `GET /api/profile/me/`.

**Why:** El SPA Vite no comparte origen con Django; Token evita fricción CSRF de cookies cross-origin en local. User/Mongo ya están cableados.

**Alternatives:** Session + CSRF + `credentials: include` (más idiomático Django, más setup CORS/CSRF); JWT (deps extra, innecesario ahora).

### 2. Domain models in `core`

```text
Profile
  user (1:1 User)
  display_name (default from username)
  created_at / updated_at

Study
  owner (FK → User)          # ownership; Profile is identity projection
  name (required)
  description (optional, blank)
  status: active | archived  # no hard delete
  created_at / updated_at
```

**Why:** Study ownership on User keeps authz simple; Profile remains the product-facing Diseñador de Futuros without social fields. Status enum leaves room for future lifecycle without schema churn.

**Alternatives:** owner → Profile (extra join); soft-delete boolean only (status is clearer for future states).

**Mongo note:** Prefer simple FK fields; avoid complex M2M until needed. Future child aggregates MUST store `study_id` (never orphan).

### 3. API contract

| Method | Path | Behavior |
|--------|------|----------|
| POST | `/api/auth/register/` | create User + Profile + token |
| POST | `/api/auth/login/` | token + ensure Profile |
| POST | `/api/auth/logout/` | invalidate token (if applicable) |
| GET | `/api/profile/me/` | current Profile |
| GET | `/api/studies/` | owner's non-archived by default |
| POST | `/api/studies/` | create `{name, description?}` → 201 |
| GET | `/api/studies/{id}/` | owner only |
| PATCH | `/api/studies/{id}/` | name/description |
| POST | `/api/studies/{id}/archive/` | set archived |

No `DELETE` for Studies. Foreign ids → 404 (prefer over 403 to reduce leakage). Health unchanged.

Thin views + serializers; queryset filtered by `owner=request.user`.

### 4. UX / Workspace grammar

```text
Application
├── Auth (mínimo)
├── StudyLibrary | StudyEmptyState     # entrada a la investigación
├── StudyCreate (Drawer o vista mínima) # nombre + descripción
└── StudyWorkspace
    ├── context strip (nombre del Objeto de Estudio)
    ├── WorkspaceCanvas (vacío, protagonista)
    └── slots reservados (Companion/panels) sin implementar contenido
```

- Library = biblioteca de investigaciones (Receta Biblioteca / entrada a Research Workspace), no tabla CRUD.
- Empty State copy: invitar a formular una pregunta → crear primer Objeto de Estudio (`03-patterns` Empty State).
- Create: progressive disclosure; al éxito → navegar a `/studies/:id` Workspace.
- Drawer antes que Modal para create/edit (`nisse-core`).
- Naming UI: `StudyLibrary`, `StudyEmptyState`, `StudyCreateDrawer`, `StudyWorkspace`, `WorkspaceCanvas` — nunca Project*.

Refs: `docs/ux-framework/05-workspace-grammar.md`, `08-screen-recipes.md`, `12-react-architecture.md`.

### 5. Frontend structure (feature-first)

Add deps: `react-router-dom` (required). Prefer TanStack Query for server state if it keeps tasks small; otherwise fetch + local state is acceptable for this first slice.

```text
frontend/src/
  app/          # providers, router
  features/
    identity/   # auth screens, session store
    study/      # library, empty state, create/edit
    workspace/  # StudyWorkspace shell
    canvas/     # WorkspaceCanvas vacío
  shared/api/   # typed client extensions
  routes/
```

Replace health-as-home; keep health callable for diagnostics.

### 6. Tests

Backend: ownership, archive vs list, profile ensure, unauthenticated 401. Frontend: smoke routes / empty state copy if practical; prioritize API tests.

## Risks / Trade-offs

- **[Token auth vs sessions]** → Document CORS + token in `.env.example`; revisit sessions when same-site deploy exists.
- **[CRUD-looking library]** → UX review checklist: Empty State + Library as research entry; no KPI/admin table as hero.
- **[Mongo migration quirks]** → Keep models simple; run migrate in WSL against docker Mongo early.
- **[Auth scope creep]** → Register/login only; no password-reset/OAuth in this change.
- **[Empty Canvas feels unfinished]** → Microcopy that the space awaits the first question/objects; no fake widgets.

## Migration Plan

1. Add models + migrations; migrate Mongo.
2. Ship auth + profile + studies API; verify with curl/httpie in WSL.
3. Frontend routes + client; feature-flag nothing—replace demo home.
4. Rollback: revert deploy; data (Studies/Profiles) remains harmless if unused.

## Open Questions

- Persistencia de token en `localStorage` vs `sessionStorage` (seguridad vs UX en lab): default `localStorage` for local research use; revisit before production.
- ¿Listar archivados en una vista secundaria? Fuera de este change; default list = activos only.
