## Why

El drawer de Recuerdo (crear/editar) aún presenta fricción de laboratorio: el CTA «Crear recuerdo» se percibe desproporcionado, al editar no hay scroll usable del contenido largo, y el foco de inputs ilumina de forma irregular (outline + offset) en lugar de un anillo uniforme en los cuatro lados.

## What Changes

- Compactar el botón primario «Crear recuerdo» (y CTAs equivalentes en footer del Research Drawer cuando aplique) para que no ocupe un bloque excesivo.
- Garantizar scroll vertical en el cuerpo del drawer al editar un Recuerdo (contenido Markdown, momentos, formularios largos) sin perder header/footer fijos.
- Homogeneizar el foco de inputs/textarea/select en drawers: anillo discovery uniforme en todos los lados (sustituir outline irregular).

## Non-goals

- No cambiar modelo/API de timelines ni lógica de colapsos.
- No rediseñar SessionCanvasHeader ni el ancho ¼ del drawer.
- No tocar botones discovery fuera de drawers (biblioteca, auth) salvo si comparten una variante compartida de tamaño en footer.

## Capabilities

### New Capabilities

- `research-drawer`: refinamientos de UX del chrome compartido (CTA compacto en footer, scroll de body, focus ring uniforme).

### Modified Capabilities

- `frontend-app`: Recall create/edit drawers cumplen scroll y CTA compacto.

## Impact

- **Frontend + UX** (sin backend).
- Archivos: `shared/ui/research-drawer.css`, posiblemente `ResearchDrawer.tsx` / `TimelineCanvas` create footer, `RecallDrawer`, `btn-discovery` variante compacta.
- **Research question:** ¿Se puede editar un recuerdo largo sin perder contexto ni pelear con el chrome?
- **Cognitive Objects:** ninguno nuevo.
