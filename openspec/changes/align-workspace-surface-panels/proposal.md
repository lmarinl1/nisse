## Why

Los paneles del rail ya existen, pero el rail y el Companion siguen leyéndose como columnas rellenas (`workspace-surface`), no como **cuadros sobre el fondo** al estilo del Canvas. El panel de sesiones no ocupa la altura disponible y la alineación vertical del stage queda despareja.

## What Changes

- Tratar rail, stage y Companion como un mismo campo de fondo (`workspace-background`), con superficies enmarcadas (borde sutil + `radius-lg` + fondo canvas/panel), igual que el Canvas.
- Envolver Companion en un panel/cuadro análogo al Canvas.
- Apilar los 3 paneles del rail uno sobre otro; el panel de **sesiones** se **extiende hacia abajo** (`flex: 1`) entre identidad y Objeto de Estudio.
- Alinear padding vertical/horizontal del Workspace para que los tope de paneles laterales y del Canvas coincidan en una misma banda.

## Non-goals

- No cambiar contenido de Companion, sesiones ni lema.
- No añadir sombras multi-capa ni cards comerciales.
- No tocar atmósfera ni rutas.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `research-session-nav`: paneles del Sidebar como superficies enmarcadas sobre fondo; panel de sesiones expandible en altura.
- `frontend-app`: shell del Workspace (rail / stage / Companion) alineado visualmente como cuadros sobre fondo compartido.

## Impact

- **Frontend:** `StudyWorkspace` (wrapper Companion), `workspace.css` (fondos de columna, flex del panel sessions, padding unificado).
- **Backend:** ninguno.
- **Research question:** ¿Cómo mantener el Canvas protagonista mientras el chrome se siente del mismo laboratorio?
- **Cognitive Objects:** ninguno.
