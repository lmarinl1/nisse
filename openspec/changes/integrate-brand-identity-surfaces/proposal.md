## Why

El set de iconos UI, el brand mark (telescopio) y los tokens de color de marca ya existen en el repo, pero las superficies de identidad siguen mostrando solo tipografía “NISSE” y no usan el mark, el favicon de producto ni iconos del catálogo. Hay que cerrar esa brecha para que el laboratorio se reconozca como NISSE según el Design Language, sin convertirlo en marketing genérico.

## What Changes

- Favicon / tab del navegador: mark compacto oficial (`nisse-favicon`).
- Headers y entry surfaces (auth, Study Home, Diagnostics, chrome de Workspace cuando exista identidad): `NisseMark` + wordmark tipográfico coherente, con clear space.
- Acciones e instrumentos de UI existentes: reemplazar glifos ad-hoc/emoji (si los hay) por `shared/icons`; introducir iconos solo donde orienten (no decoración).
- Respetar dualidad de color: neon de marca (`--color-brand-neon`) en el mark; discovery (`--color-discovery-primary`) como acento de investigación en UI.
- Sin **BREAKING** de API; solo frontend / UX.

## Non-goals

- No rediseñar pantallas completas ni añadir dashboards/KPI.
- No cambiar el set geométrico del telescopio ni inventar variantes nuevas.
- No sustituir el acento discovery de UI por el neon del logo en toda la chrome.
- No migrar a librerías de iconos externas.
- No tocar backend ni contratos API.

## Capabilities

### New Capabilities

- `brand-identity`: Uso del brand mark, favicon, iconos UI oficiales y roles de color de marca en el producto.

### Modified Capabilities

- `frontend-app`: Las superficies de entrada e identidad del SPA deben presentar el brand mark y favicon oficiales; la chrome usa iconos del set cuando haya acciones/instrumentos.

## Impact

- **Frontend / UX**: `index.html`, `shared/brand`, `shared/icons`, tokens; `AuthScreen`, `StudyHome`, `DiagnosticsPage`, headers de library/workspace; CSS de brand/headers.
- **Backend / API**: ninguno.
- **Research question**: ¿Cómo se reconoce el laboratorio NISSE al entrar y al navegar sin convertir la UI en una marca decorativa?
- **Cognitive Objects**: ninguno nuevo; el mark es identidad de producto, no un Objeto Cognitivo.
- **Touches**: frontend + UX/workspace chrome only.
