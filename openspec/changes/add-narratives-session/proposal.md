## Why

El proceso de investigación del Workspace aún no contempla una etapa explícita de **Narrativas** entre la construcción de escenarios y su validación. Esa secuencia es parte natural del pensamiento especulativo: narrar futuros posibles antes de validarlos.

## What Changes

- Añadir la sesión de investigación **Narrativas** (id `narratives`) en el menú Proceso, **entre Escenarios y Validación**.
- Exponer la ruta `/studies/:studyId/narratives` con Canvas vacío propio, igual que las demás sesiones.
- Actualizar specs de navegación de ocho a **nueve** sesiones ordenadas.

## Non-goals

- No implementar contenido, instrumentos ni Cognitive Objects dentro del Canvas de Narrativas.
- No cambiar el orden ni las labels del resto de sesiones (salvo insertar Narrativas).
- No tocar atmósfera, Campo, Companion ni backend.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `research-session-nav`: nueve sesiones; insertar Narrativas entre Escenarios y Validación; id `narratives` URL-addressable.
- `frontend-app`: rutas del Workspace incluyen el noveno session id.
- `study-objects`: el Sidebar del Workspace cubre nueve etapas de proceso.

## Impact

- **Frontend / UX-workspace:** `researchSessions.ts` (tipo, lista, icono), `ResearchSessionNav` (consume la lista), Canvas genérico ya ruteado por `:session`.
- **Backend:** ninguno.
- **Research question:** ¿Qué narrativas dan sentido a los escenarios antes de validarlos?
- **Cognitive Objects:** ninguno en este change (Canvas vacío).
