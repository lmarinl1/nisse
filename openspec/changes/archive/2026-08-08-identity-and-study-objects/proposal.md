## Why

NISSE aún no tiene un contenedor de investigación: sin Identidad ni Objeto de Estudio, no hay Workspace donde anclar conocimiento futuro. Esta es la primera capacidad de dominio y debe quedar estable como Aggregate Root antes de Objetos Cognitivos, Escenarios o Companion.

## What Changes

- Autenticación mínima con **Perfil** (Diseñador de Futuros) por usuario autenticado.
- Dominio **Study** (UI: **Objeto de Estudio**; nunca "Project"): listar, crear, editar básicos, archivar, abrir Workspace.
- Primer acceso con Empty State que invita a formular una pregunta e iniciar el primer Objeto de Estudio (no un CRUD vacío).
- Creación mínima (nombre + descripción opcional) → entrada inmediata al Workspace.
- Workspace inicial: Canvas vacío estructural (sin Objetos Cognitivos, IA, Escenarios, Bitácoras, etc.).
- Aislamiento: un usuario solo accede a sus propios Studies; sin eliminación física.

**Touches:** backend + frontend + UX/workspace.

**Research question:** ¿Qué investigación quiero comenzar a explorar?

**Cognitive Objects:** ninguno aún; Study es el contenedor raíz. El Canvas queda preparado para objetos futuros.

## Non-goals

- Colaboración, equipos, compartición o funcionalidades sociales.
- Eliminación física de Studies.
- Objetos Cognitivos, Companion/IA, Escenarios, Bitácoras, metodologías, visualizaciones.
- OAuth/SSO de terceros (se asume auth local mínima en este change).
- Multi-tenant organizacional o roles avanzados.

## Capabilities

### New Capabilities

- `identity-profile`: usuario autenticado y Perfil de Diseñador de Futuros (creación/garantía de perfil; sin features sociales).
- `study-objects`: ciclo de vida del Study (listar activos, crear, editar básicos, archivar, abrir Workspace); Aggregate Root; ownership estricto.

### Modified Capabilities

- `frontend-app`: la experiencia principal deja de ser el health check demo; pasa a biblioteca de Objetos de Estudio + Workspace vacío.
- `backend-api`: la API bajo `/api/` incorpora auth/perfil y endpoints de Study (además del health existente).

## Impact

- **Backend:** modelos Profile/Study en Django+MongoDB; serializers/views DRF; ownership filters; migrations.
- **Frontend:** rutas Study Library / Create / Workspace; Empty State; shell Canvas; cliente API tipado; copy en español.
- **UX:** Gramática del Workspace (`docs/ux-framework/05`), Empty States (`03`, `01`), Receta Research Workspace (`08`); nunca dashboard/CRUD como metáfora.
- **Deps:** auth session/token DRF, React Router (y posiblemente Query) si aún no están en el scaffold.
