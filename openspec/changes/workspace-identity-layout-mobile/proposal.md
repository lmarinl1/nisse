## Why

El panel de identidad del Workspace aún apila mark + wordmark en línea horizontal compacta (favicon sin estrellas), y el lema queda debajo sin la composición pedida. En móvil, el rail de paneles enmarcados necesita un comportamiento responsive explícito para seguir usable sin romper el Canvas.

## What Changes

- Redistribuir el **primer panel** (identidad): mark oficial **con estrellas**, un poco más grande, a la izquierda; **NISSE** arriba a la derecha; el lema del futuro abajo a la derecha.
- Asegurar **responsive móvil** del shell Workspace (tres paneles del rail + Companion + Canvas): apilado usable, sesiones navegables en compacto, sin perder el framing de “cuadro sobre fondo”.

## Non-goals

- No cambiar el copy del lema ni las sesiones.
- No alterar Companion content ni atmósfera.
- No redibujar el telescopio; solo variante/tamaño del mark existente.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `research-session-nav`: layout del panel de identidad; comportamiento compacto/móvil del Sidebar de paneles.
- `frontend-app`: shell Workspace responsive en viewports estrechos (rail / stage / Companion).

## Impact

- **Frontend:** `StudyWorkspace` (estructura del panel identidad), posiblemente `NisseBrandLockup` o composición local con mark + wordmark separados; `workspace.css` (grid identidad + media queries).
- **Brand:** preferir variante `official-clean` (con estrellas) tintada discovery, tamaño &gt; compact/favicon.
- **Backend:** ninguno.
