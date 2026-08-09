## Why

Dentro de un Objeto de Estudio el Workspace aún es una sola ruta con un Canvas genérico. El proceso de investigación necesita etapas direccionables (marco, conocimiento previo, fuerzas, ejes, escenarios, validación, evaluación, monitoreo) sin abandonar el Study ni convertir la navegación en drawers/modales.

## What Changes

- Sidebar de investigación **persistente** en el Workspace del Study (no modal, no drawer temporal).
- Ocho sesiones de investigación en orden fijo, cada una con icono del set oficial (`shared/icons`) y label en español.
- Rutas URL por sesión bajo la convención existente: `/studies/:studyId/:session` (ids semánticos estables).
- Cada sesión renderiza su propio Canvas vacío; el estado visual no se comparte accidentalmente entre sesiones.
- Sesión activa marcada en el Sidebar; historial del navegador, reload y deep-link conservan la sesión.
- Responsive: Sidebar visible en desktop; en viewports menores, menú compacto que conserva la sesión actual visible (UX Framework).
- Reutilizar chrome de identidad reciente: `NisseBrandLockup`, tokens discovery (no neon de marca en paneles), iconos `size="nav"`.

## Non-goals

- No implementar contenido, metodologías ni Objetos Cognitivos dentro de cada sesión (Canvas vacíos).
- No persistir estado de Canvas en backend en este change.
- No añadir iconos custom si el catálogo alcanza; no Lucide u otras librerías.
- No convertir el Sidebar en dashboard de KPIs ni lista administrativa.
- No abrir ventanas nuevas ni salir del Objeto de Estudio al cambiar de sesión.
- No cambiar contratos API de Studies.

## Capabilities

### New Capabilities

- `research-session-nav`: Navegación lateral persistente de sesiones de investigación dentro de un Study Workspace, con URLs direccionables y Canvas por sesión.

### Modified Capabilities

- `frontend-app`: La ruta de Workspace deja de ser un único Canvas genérico; debe soportar shell con Sidebar + rutas de sesión.
- `study-objects`: Abrir un Study entra al Workspace con sesión direccionable (default) manteniendo el Study como Aggregate Root.

## Impact

- **Frontend / UX / Workspace**: `AppRouter`, `StudyWorkspace`, nuevo `ResearchSessionNav` (o equivalente), routing anidado, CSS de workspace/sidebar; iconos de `shared/icons`; brand lockup en rail.
- **Backend / API**: ninguno.
- **Research question**: ¿Cómo se recorre el proceso de investigación dentro de un mismo Objeto de Estudio sin perder contexto ni fragmentar el laboratorio?
- **Cognitive Objects**: ninguno nuevo aún; las sesiones son perspectivas del Workspace, no entidades de dominio persistidas.
- **Touches**: frontend + UX/workspace only.
