## Why

En el Drawer de tipos, la pista metodológica se corta sin forma de leerla completa; en el Canvas, el eyebrow de texto del tipo primario no comunica el set de lentes del nodo ni permite explorar nombre, referencia, inspiración y pista sin abrir el Drawer. Hace falta consultar las lentes en el propio Workspace (Canvas + Companion) sin saturar el nodo.

## What Changes

- Truncar la pista en el mosaico / selector de tipos del Derivation Drawer y añadir «Ver más» que abre un tooltip/popover con la pista completa (clic).
- Quitar el texto eyebrow del tipo primario en el nodo de derivación.
- Mostrar en el nodo una toolbar de chips (icono + nombre) por cada tipo asociado; clic en un chip abre una card flotante con nombre, referencia, inspiración y pista.
- Reutilizar el mapeo de iconos del catálogo (`iconForDerivationType`); no inventar logos nuevos fuera de `shared/icons`.

## Non-goals

- Cambios de API / persistencia / catálogo backend de tipos.
- Nuevos assets de marca o logos dedicados por tipo fuera del set oficial de iconos.
- Rediseño completo del flujo en dos pasos del Drawer ni del grafo (edges, tags, recall).

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `time-derivations`: consulta de pista completa en Drawer; representación de tipos en el nodo pasa de eyebrow textual a chips clicables con card de detalle.

## Impact

- **Frontend / UX Workspace** — `DerivationDrawer`, `DerivationNodes`, `DerivationsCanvas`, CSS de time-derivations; posible Popover/Tooltip Radix (clic) en `shared/ui` o local a la feature.
- **Cognitive Objects:** Derivación, Tipo de deriva (lente metodológica).
- **Pregunta de investigación:** ¿Qué lentes metodológicas cargan esta deriva y qué pista me invita a seguir?
- **Backend:** ninguno.
