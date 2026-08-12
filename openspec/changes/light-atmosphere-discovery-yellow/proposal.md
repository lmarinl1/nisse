## Why

En light mode, el campo de exploración usa brand neon (`#D7FF2F` / `--color-brand-neon`), que no coincide con el amarillo discovery de los CTAs principales (p. ej. **Nueva pregunta** / `.btn-discovery` → `--color-discovery-primary`). Eso rompe la coherencia visual: la atmósfera parece de otro “amarillo” que la UI de acción.

## What Changes

- El accent del **exploration field** (light) pasa a `--color-discovery-primary` (mismo token que botones discovery).
- Actualizar specs/docs que exigían brand neon como único acento del campo light.
- Dark orbital sigue usando discovery (como hoy); brand neon permanece para mark/logo, no para esta atmósfera light.

## Non-goals

- Cambiar la paleta de botones, tokens light de discovery, o el brand mark neon.
- Rediseñar la simulación del campo (densidad, cursor, metáfora) más allá del color de trazo/relleno.
- Cambios de dark mode.

## Capabilities

### New Capabilities

- _(none)_

### Modified Capabilities

- `research-network-atmosphere`: accent del exploration field light = discovery primary (alineado a CTAs).

## Impact

- **Frontend + UX docs** (sin backend).
- Código: `ResearchNetworkAtmosphere.tsx` (`readExplorationColor`).
- Docs: `docs/ux-framework/01-visual-language.md` (y motion si menciona `#D7FF2F` para el campo light).
