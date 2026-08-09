## Why

El rail del Workspace se lee como una columna continua; las tres funciones (identidad, navegación de sesiones, contexto del Objeto de Estudio) no se distinguen con claridad. Hay que agruparlas como paneles de laboratorio con borde sutil y radio del sistema — no como cards de dashboard.

## What Changes

- Dividir el menú lateral del Study Workspace en **tres paneles** separados, con borde redondeado (`--radius-*` / `--color-border-subtle`), alineados a los grupos marcados: (1) identidad NISSE, (2) sesiones de investigación, (3) Objeto de Estudio + regreso al Campo.
- En el panel de identidad, además del lockup, mostrar la frase de producto: **«El futuro no se predice: se anticipa y se diseña.»**
- Mantener el orden ya establecido (identidad → sesiones → pie de contexto) y el Canvas como protagonista.

## Non-goals

- No rediseñar Companion ni Canvas.
- No convertir el rail en dashboard de KPIs ni en stack de “cards” comerciales.
- No cambiar rutas, labels de sesión ni copy del Objeto de Estudio (salvo el lema nuevo en identidad).

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `research-session-nav`: el Sidebar se organiza en tres paneles visuales; el panel de identidad incluye el lema de producto.

## Impact

- **Frontend / UX-workspace:** `StudyWorkspace`, `ResearchSessionNav` (si el panel envuelve el nav), `workspace.css`; tokens de borde/radio existentes.
- **UX framework:** respetar paneles secundarios (`01`, `03`, `05`); no inventar patrón de cards.
- **Backend:** ninguno.
- **Research question:** ¿Cómo orientar al investigador en el Workspace sin ruido administrativo?
- **Cognitive Objects:** ninguno nuevo.
