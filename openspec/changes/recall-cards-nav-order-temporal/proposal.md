## Why

El rail pone Derivaciones antes que Líneas de tiempo, pero el diseño temporal del Study suele partir de la trayectoria. Además, los vínculos recuerdo↔línea (colapso) y derivación↔recuerdo se gestionan con selects/texto, no como instrumentos visuales navegables. Crear recuerdos solo pide año aunque el modelo ya admite mes/día para ordenar.

## What Changes

- Reordenar sesiones en el rail: **Líneas de tiempo** inmediatamente después de Marco; **Derivaciones del tiempo** después de Líneas.
- En Drawers de recuerdo y de derivación: mostrar relaciones como **cards** (estilo vecinos del grafo): título del recuerdo, línea de tiempo, acciones crear/quitar vínculo; clic abre/enfoca el recuerdo.
- Exponer en create/edit de recuerdos campos opcionales **mes** y **día** (persistidos separados); el orden ascendente de la pista temporal sigue usando año+mes+día (`sort_key` existente).
- Homologar UX de relación: cards con add/remove sobre colapsos (recuerdo en varias líneas) y sobre `recall_id` de derivaciones — sin nuevo grafo recuerdo↔recuerdo libre.

## Non-goals

- Nuevo modelo de aristas recuerdo↔recuerdo distinto del colapso.
- Reordenar el resto del catálogo de sesiones.
- Cambiar Neo4j más allá del vínculo recall ya existente en derivaciones.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `research-session-nav`: orden rail — timelines antes que time-derivations.
- `frontend-app` / instrumento timelines: mes/día opcionales en formularios; cards de relaciones en RecallDrawer.
- `time-derivations`: vínculo a recuerdo como cards (add/remove/abrir), no solo select.

## Impact

- **Frontend:** `researchSessions.ts`, `RecallDrawer`, create recuerdo en `TimelineCanvas`, `DerivationDrawer`, posible componente compartido `RecallRelationCarousel`.
- **Backend:** probablemente ninguno si mes/día ya están en API; verificar create/update UI → `temporal_month` / `temporal_day` / `sort_key`.
- **Research question:** ¿cómo se lee la trama temporal y sus puentes sin perder el marco del Study?
- **Cognitive Objects:** Recuerdo, Línea, Derivación (vínculos).

## Assumption

Cards y create/delete de relación se implementan sobre **colapso existente** (líneas conectadas) y **recall_id de derivación**, no un vínculo libre recuerdo↔recuerdo nuevo.
