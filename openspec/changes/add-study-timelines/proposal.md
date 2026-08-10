## Why

`prior-knowledge` (Conocimiento previo) es un Canvas vacío. El Diseñador de Futuros necesita un instrumento para **diseñar el tiempo y mapear contextos de emergencia**: construir líneas temporales, registrar Recuerdos con incertidumbre (comprobado → ficción), Momentos de evidencia y colapsos entre líneas — para responder progresivamente *¿por qué este problema aparece aquí y ahora?*

## What Changes

- Renombrar la sesión **Conocimiento previo** → **Líneas de tiempo** (label + icono de tiempo/traza).
- **BREAKING:** session id `prior-knowledge` → `timelines`; rutas `/studies/:studyId/timelines` y `/studies/:studyId/timelines/:timelineId` (redirect desde `prior-knowledge` si aplica).
- Sidebar: **Líneas de tiempo** como acordeón; subitems = líneas activas (principal primero); URL propia por línea.
- Canvas overview: crear/explorar/archivar/restaurar/eliminar (solo archivadas) líneas; métricas ligeras, no dashboard.
- Canvas individual: línea **vertical** (retrospectiva → horizonte dinámico con marcador Hoy/Presente); CRUD de Recuerdos vía Drawer; Momentos Markdown.
- Colapsos: un Recuerdo compartido entre ≥2 líneas con señal visual y Momento de colapso.
- Persistencia Study-scoped: Timeline, Recall, Moment, Collapse (+ members); línea principal auto-creada al crear el Study (`is_default`, nombre = nombre del Objeto de Estudio).
- Fechas normalizadas (a.C. / era / futuro) para orden correcto.

## Non-goals

- IA, RAG, scraping, ingestión automática, causalidad estadística, grafos complejos, colaboración, comentarios, versionado avanzado, exportación, notificaciones, calendarios externos.
- Zoom temporal complejo (v1: scroll + legibilidad).
- Cambiar el resto de sesiones de proceso (salvo el rename de esta etapa).

## Capabilities

### New Capabilities

- `study-timelines`: instrumento de investigación temporal (líneas, Recuerdos, Momentos, colapsos, archivo/eliminación, horizonte, clasificaciones).

### Modified Capabilities

- `research-session-nav`: label/icono/id `timelines`; acordeón con subitems de líneas activas.
- `frontend-app`: rutas nested under `timelines`; Canvas genérico deja de aplicar a esa rama.
- `backend-api`: endpoints autenticados Study-scoped para timelines/recalls/moments/collapses.
- `study-objects`: al crear Study se materializa la línea principal; artefactos temporales pertenecen al Aggregate Root.

## Impact

- **Backend + frontend + UX/workspace** (un change API+UI).
- **Backend:** modelos/API bajo `core`; rutas `/api/studies/:id/timelines/…`.
- **Frontend:** acordeón en rail (patrón `case-framework`); feature `timelines`; Drawers; cliente tipado.
- **Deps:** reutilizar Markdown editor existente; sin IA.
- **Research question:** ¿Por qué este problema aparece aquí y ahora?
- **Cognitive Objects:** Timeline, Recuerdo (Recall), Momento, colapso entre líneas.
