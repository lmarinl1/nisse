## Why

Tras tipologías metodológicas, crear una derivación sigue siendo un formulario denso de un solo paso, y el Canvas ya no comunica el tipo en el nodo. El Diseñador de Futuros necesita elegir **lente + nombre** primero, ver pistas en mosaico, y solo después completar el resto — con nodos que muestren el tipo en gris como el eyebrow del raíz.

## What Changes

- Canvas: en el círculo de cada derivación, eyebrow gris con el **primer** tipo seleccionado; si hay más de uno, el nombre del primero + `…` (sin listar todos).
- Creación en **2 pasos** en el Drawer: (1) nombre + Chip Selector de tipos + mosaico dinámico de cards (referencia / nombre / pista) + **Siguiente**; (2) resto del formulario actual, con resumen nombre+tipos y botón **Editar** que vuelve al paso 1.
- Introducir / homologar un **Chip Selector** multi-respuesta (chips con icono del set oficial, tamaño de letra, tokens Discovery) como mecanismo de selección múltiple reutilizable.
- Edición de nodos existentes: abrir en paso 2 (detalle) con Editar → paso 1; no cambiar el contrato Neo4j de `type_ids`.

## Non-goals

- Cambiar catálogo de tipos, API Neo4j o relación con Recuerdos.
- Admin de tipos; IA; fusión de pistas.
- Rediseñar React Flow más allá del eyebrow de tipo en el nodo.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `time-derivations`: wizard de creación en 2 pasos; mosaico de tipos; nodos con eyebrow de tipo; Chip Selector en el Drawer.
- `frontend-app`: Chip Selector multi-respuesta compartido (`ResearchChipSelector` o equivalente) alineado al Design Language para selects de múltiples valores.

## Impact

- **Frontend / UX Workspace:** `time-derivations` (Drawer, nodes, CSS), `shared/ui` chip multi-select, posiblemente nota en `docs/ux-framework/02-components.md`.
- **Backend:** ninguno (salvo que el create deje de POSTear hasta Guardar del paso 2 — solo cliente).
- **Research question:** ¿desde qué lente nombro esta deriva antes de profundizar?
- **Cognitive Objects:** Derivación + Tipos de deriva como lentes.
