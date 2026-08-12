## Why

En el Canvas de una línea de tiempo individual (`/studies/:studyId/timelines/:timelineId`), el contenido largo hace scroll de toda la ventana/Workspace en lugar de confinar el desplazamiento al componente central (stage/Canvas). Eso rompe la gramática del laboratorio: el rail y el Companion deben permanecer fijos mientras se explora la trayectoria.

## What Changes

- Contener el overflow vertical del Canvas de Timeline (subitem) al stage central: scroll solo dentro de esa superficie.
- Ajustar layout CSS (altura acotada al viewport del Workspace + `overflow-y` en el root del instrumento) alineado al patrón ya usado en Case Framework.
- Verificar que header/acciones del Canvas y Drawers sigan usables; rail y Companion no se desplazan con la trayectoria.
- Aplicar el mismo containment al overview de timelines si comparte el mismo defecto de crecimiento sin clip (misma familia visual).

## Non-goals

- No cambiar modelo de datos, API ni reglas de Recuerdos/Momentos/colapsos.
- No rediseñar el track temporal ni el Drawer de recuerdo.
- No rehacer scroll de otras sesiones salvo el mínimo necesario en el shell para que el stage acote altura.
- No tratar mobile stacking salvo que el fix de desktop lo requiera para no romper overflow existente.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `frontend-app`: el Canvas de Timeline (subitem de Líneas de tiempo) MUST confinar el scroll vertical a la superficie central del Workspace; el shell (rail + Companion) MUST permanecer fijo respecto a ese scroll.

## Impact

- **Frontend / UX Workspace:** `frontend/src/features/timelines/` (p. ej. `timelines.css`, `TimelineCanvas.tsx`, posiblemente overview) y, si hace falta, containment del stage en `workspace.css`.
- **Backend / API:** ninguno.
- **Research question:** ¿cómo se despliega la trayectoria en el tiempo sin perder el marco del Study?
- **Cognitive Objects:** Timeline / Recuerdo (presentación en Canvas); sin nuevos objetos.
