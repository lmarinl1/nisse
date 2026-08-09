## Why

El rail del Study Workspace mezcla contexto del Objeto de Estudio, proceso de proceso y salida a la lista de estudios en un orden que no prioriza la exploración. Además, “Biblioteca” evoca gestión documental, no un laboratorio de especulación.

## What Changes

- Reordenar el rail fijo del Workspace: **Proceso** (sesiones) queda arriba, justo bajo la marca; el bloque **Objeto de Estudio** (nombre + contexto) baja al pie del rail; el enlace de regreso queda siempre al final, anclado abajo.
- Renombrar la sesión `case-framework` de “Marco del caso de estudio” a **“Marco del objeto de estudio”**.
- Sustituir el término de producto **Biblioteca** por **Campo** / **Campo de investigación** (lista de Objetos de Estudio y enlace “Volver al campo”), alineado a la metáfora de laboratorio de `docs/ux-framework/00-philosophy.md`.
- Actualizar copy de errores/estados vacíos que digan “biblioteca”.

## Non-goals

- No cambiar rutas, ids de sesión ni API.
- No rediseñar el Canvas, Companion ni el contenido de cada sesión.
- No renombrar identificadores de código (`StudyLibrary`, rutas `/`, etc.) salvo copy visible y specs de producto.
- No tocar el change en curso `enrich-atmosphere-orbits-auth`.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `research-session-nav`: jerarquía del Sidebar (Proceso primero; contexto del Study y salida al pie) y label de `case-framework`.
- `study-objects`: metáfora/copy de la entrada de Studies: Campo de investigación en lugar de Biblioteca.
- `frontend-app`: shell del Workspace y landing autenticada usan Campo; rail con Proceso prioritario.

## Impact

- **Frontend / UX-workspace:** `StudyWorkspace`, `ResearchSessionNav`, `researchSessions.ts`, `workspace.css`, `StudyLibrary`, mensajes en `StudyHome` / errores del Workspace.
- **Backend:** ninguno.
- **Research question:** ¿Cómo orientar al investigador hacia el proceso sin perder el contexto del Objeto de Estudio?
- **Cognitive Objects:** ninguno nuevo; solo presentación del Objeto de Estudio en el rail.
