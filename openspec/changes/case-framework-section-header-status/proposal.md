## Why

El header del Canvas de cada subítem del Marco aún trata el progreso como chips sueltos y el feedback de guardado como texto genérico; los textareas con tinte discovery distraen de la escritura. Hace falta un header de estados más legible (tríada + toggle a la derecha) y un “Guardado” discreto, con superficies de edición neutrales.

## What Changes

- En el header del Canvas de cada subítem, a la derecha: mostrar los **tres** estados posibles (Sin comenzar, En construcción, Terminado) en gris; solo el activo se “enciende” (blanco / amarillo discovery / verde).
- Colocar el toggle **Marcar como terminado** también en el costado derecho del header.
- Cuando el contenido está guardado, mostrar una **flag discreta** “Guardado” arriba a la derecha del cuadro/header, fondo amarillo discovery suave.
- Textareas / superficies de edición del subítem: fondo del sistema (workspace/canvas), **sin** tinte amarillo.

## Non-goals

- No cambiar API ni field keys.
- No rediseñar el overview del ítem principal (salvo que reutilice chips heredados sin tocarlos en este change).
- No eliminar el status API `with_content`; en UI de tríada se agrupa bajo En construcción.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `case-framework`: composición del header de sección (tríada de estados, toggle derecho, flag Guardado) y fondo neutro de editores.

## Impact

- **Frontend / UX-workspace** (`CaseFrameworkSectionCanvas`, CSS del Marco).
- Research question: ¿Cómo se lee de un vistazo en qué momento está cada etapa?
- Cognitive Objects: ninguno.
