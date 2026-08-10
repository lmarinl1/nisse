## Why

Hoy `case-framework` (Marco del objeto de estudio) es solo un Canvas vacío. El Diseñador de Futuros necesita construir el objeto de investigación de forma progresiva —tema, marco teórico, conceptos, tensiones, consolidación— con persistencia real y lectura integrada, sin convertir el Workspace en un formulario CRUD.

## What Changes

- Convertir **Marco del objeto de estudio** en acordeón del Sidebar con cinco subelementos URL-addressable, iconos propios y expansión exclusiva (un elemento principal a la vez).
- Añadir Canvas de **vista integrada** (solo lectura) en `/studies/:studyId/case-framework` que consolida las cinco secciones.
- Añadir cinco Canvas editables con campos Markdown, preguntas orientadoras y guardado automático con debounce.
- Persistir el Marco y sus secciones en backend, asociados al Study (aislados entre Studies).
- Mostrar estado de progreso discreto (no bloqueante) en navegación y vista integrada.
- Actualizar el contrato de Workspace: `case-framework` deja de ser Canvas vacío y pasa a ser el primer instrumento de investigación con contenido.

## Non-goals

- IA, agentes, RAG, búsqueda semántica, bibliografía, grafos, escenarios, narrativas, validación/evaluación/monitoreo.
- Colaboración, comentarios, versionado avanzado, exportación.
- Wizard lineal o validaciones que obliguen a completar todas las secciones.
- Cambiar el orden o el contenido de las demás sesiones de proceso (salvo el acordeón de `case-framework`).

## Capabilities

### New Capabilities

- `case-framework`: modelo, API y experiencia de investigación del Marco del objeto de estudio (cinco secciones, vista integrada, edición Markdown, progreso, persistencia por Study).

### Modified Capabilities

- `research-session-nav`: `case-framework` como acordeón con cinco hijos; expansión exclusiva de elementos principales; indicadores de progreso discretos.
- `frontend-app`: rutas anidadas bajo `case-framework` para overview y secciones; Canvas de sesión genérico deja de aplicar a esa rama.
- `backend-api`: endpoints autenticados para leer/actualizar el Case Framework del Study.
- `study-objects`: el Workspace de `case-framework` deja de exigir Canvas vacío; los artefactos del Marco pertenecen al Study Aggregate Root.

## Impact

- **Backend + frontend + UX/workspace** (un solo change API+UI).
- **Backend:** modelos/serializers/views bajo `core`; rutas `/api/studies/:id/case-framework/…`.
- **Frontend:** acordeón en `ResearchSessionNav`; feature `case-framework` (overview, section canvas, markdown editor, autosave); rutas en `AppRouter`; cliente en `shared/api`.
- **Deps:** probable librería ligera de Markdown (edición y/o render); sin IA.
- **Research question:** ¿Cómo se construye progresivamente el objeto de estudio a través de tema, teoría, conceptos y tensiones?
- **Cognitive Objects:** ninguno formal aún; el Marco es instrumento textual estructurado precursor de objetos futuros.
