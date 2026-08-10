## Why

Tras el refinamiento del Marco, los headers con relleno discovery, el Companion más estrecho que el rail, el Canvas con margen muerto a la derecha y scrollbars inconsistentes diluyen la gramática visual del laboratorio. Hay que unificar superficies, chips de estado y el estándar de scroll (línea + cápsula/círculo amarillo) en producto y Design Language.

## What Changes

- Headers del Marco (ítem principal y subítems): fondo igual al de los demás cuadros; borde discovery permitido (sin relleno amarillo).
- **Todos** los scrollbars de la app siguen un estándar: cápsula o círculo discovery que se desliza sobre una línea fina (referencia visual aportada, en amarillo), no riel convencional.
- Documentar ese estándar en `docs/ux-framework/`.
- Chips de estado/guardado («Sin comenzar», «En construcción», «Con contenido», «Terminado», «Guardado», etc.): sin relleno; borde + texto en amarillo, gris o verde según semántica.
- Contenido del Canvas usa el ancho útil del stage (sin hueco amplio a la derecha); Companion derecho con ancho alineado al rail izquierdo.

## Non-goals

- No cambiar modelo/API del Case Framework ni field keys.
- No rediseñar Companion con IA ni contenido nuevo.
- No imponer scroll custom con botones de flecha en extremos si el estándar CSS (línea + thumb circular/cápsula) cubre el look; flechas del mockup son referencia, no requisito bloqueante.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `case-framework`: headers sin fill discovery; chips outline; contenido a ancho de Canvas.
- `frontend-app`: estándar global de scrollbar; grid Workspace con Companion ≈ ancho del rail; stage sin margen muerto horizontal del contenido.
- `research-session-nav`: scrollbar del menú Proceso alineado al estándar global (sin estilo divergente).

## Impact

- **Frontend / UX-workspace** + docs Design Language.
- Tokens/CSS globales (`tokens`, `index`/`App`, `workspace`, `case-framework`).
- Research question: ¿Cómo se lee el Workspace como un solo instrumento visual?
- Cognitive Objects: ninguno.
