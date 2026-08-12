## Why

En el Canvas, descripción, vínculo temporal y etiquetas solo se consultan abriendo el Drawer. Hace falta inspeccionar ese contexto desde el costado del nodo (junto a las lentes) sin deformar el círculo ni saturar el grafo.

## What Changes

- En el rail lateral del nodo de derivación, añadir hasta tres iconos de contexto (solo si hay dato):
  - **Descripción** → popover con descripción renderizada en Markdown.
  - **Vínculo temporal** → popover/card con línea de tiempo, nombre del recuerdo y marca temporal (día/mes/año según disponibilidad).
  - **Tags** → popover con las etiquetas del nodo.
- Si no hay información para un campo, el icono **no se muestra**.
- Si hay información: icono visible en estado **apagado** (muted); al activarlo (clic / popover abierto) pasa a **encendido** (amarillo discovery).
- Reutilizar datos ya presentes en el grafo (`description_markdown`, `recall`, `tags`); sin nuevas APIs.

## Non-goals

- Editar descripción/tags/recall desde el popover del Canvas.
- Cambiar el rail de tipos metodológicos ni la geometría del círculo.
- Backend / persistencia nueva.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `time-derivations`: iconos de contexto en el rail del nodo con popovers condicionados a datos disponibles e estado apagado/encendido.

## Impact

- **Frontend / UX Workspace** — `DerivationNodes`, `DerivationsCanvas` (pasar más campos en `data`), CSS; popovers Radix existentes; `renderMarkdownToHtml` del case-framework (o helper compartido).
- Posible icono `tag` en `shared/icons` si no existe en el set oficial (hoy no hay glyph `tag`).
- **Cognitive Objects:** Derivación, Recuerdo (vínculo), etiquetas.
- **Pregunta de investigación:** ¿Qué contexto (narrativa, ancla temporal, tags) carga esta deriva en el Canvas?
- **Backend:** ninguno (asumiendo enriquecimiento `recall` ya en el graph).
