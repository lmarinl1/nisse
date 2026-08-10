## Why

El header del subítem quedó apretado a la derecha; el toggle manual “Marcar como terminado” contradice un progreso derivado del contenido; y el overview del Marco muestra una banda de tracking desproporcionada con scroll horizontal indeseado. Hay que alinear espacio, terminado automático y proporción del ítem principal.

## What Changes

- Aumentar/mejorar distancias entre elementos del costado derecho del header de cada subítem (flag Guardado, tríada de estados).
- **Eliminar** la acción UI “Marcar como terminado” (toggle).
- **Terminado automático**: una sección pasa a Terminado solo cuando ningún campo del subelemento está vacío; si algún campo se vacía, deja de estar Terminado (vuelve a En construcción o Sin comenzar según corresponda).
- Overview (ítem principal): corregir proporción del bloque de tracking (5 etapas) para que ocupe el ancho de forma equilibrada y **eliminar scroll horizontal**.

## Non-goals

- No cambiar field keys ni rutas.
- No reintroducir wizard lineal ni bloquear edición por estado.
- No rediseñar Companion ni rail.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `case-framework`: auto-Terminado por campos completos; sin toggle; espaciado header derecho; overview tracking sin overflow-x y con proporción corregida.

## Impact

- **Frontend** (section header, status derivation UX, overview CSS/layout); posible sync de `reviewed` en API al guardar (auto) o derivación solo en UI — ver design.
- Research question: ¿Cuándo una etapa está realmente terminada?
- Cognitive Objects: ninguno.
