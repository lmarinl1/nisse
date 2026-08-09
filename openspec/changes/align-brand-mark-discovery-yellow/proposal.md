## Why

El eyebrow “Proceso” añade jerarquía administrativa innecesaria al rail. Además, el telescopio del lockup sigue en neon de marca (`#D7FF2F`) mientras los iconos activos del menú usan discovery (`#E8C547`), así que la identidad del laboratorio se siente partida.

## What Changes

- Quitar el label visible **“Proceso”** del menú de sesiones (el nav sigue siendo la lista de etapas).
- En superficies de producto (auth, Campo, Workspace, diagnostics), el brand mark del lockup MUST usar el **amarillo discovery** — el mismo acento que los iconos UI en estado activo.
- Actualizar `docs/ux-framework/13-brand-mark.md` (y notas cruzadas en `10-iconography.md` / tokens) para que el rol in-app del mark sea discovery; el neon queda para kit de marca / marketing / assets oficiales exportables, no para chrome de investigación.
- Ajustar implementación del lockup (`currentColor` / token discovery) y coherencia con iconos activos del Sidebar.

## Non-goals

- No recolorar la atmósfera de red a brand neon.
- No redibujar la geometría del telescopio ni crear un set de iconos nuevo.
- No cambiar rutas ni labels de sesiones.
- No archivar otros changes abiertos (`integrate-brand-identity-surfaces`, etc.).

## Capabilities

### New Capabilities

- `brand-identity`: Identidad de producto in-app: lockup con mark en discovery yellow alineado a iconos activos; roles de color mark vs UI documentados.

### Modified Capabilities

- `research-session-nav`: el Sidebar de sesiones no muestra el eyebrow “Proceso”.

## Impact

- **Frontend:** `ResearchSessionNav`, `NisseBrandLockup` / `brand.css` / variantes `currentColor`, posiblemente tokens comment.
- **UX framework:** `13-brand-mark.md`, `10-iconography.md` (y mención breve en `01-visual-language.md` si hace falta).
- **OpenSpec overlap:** si `integrate-brand-identity-surfaces` aún no está archivado, su requisito “neon vs discovery” queda supersedido por este change al archivar en orden.
- **Research question:** ¿Cómo reconocer NISSE sin separar el mark del acento de descubrimiento?
- **Cognitive Objects:** ninguno.
