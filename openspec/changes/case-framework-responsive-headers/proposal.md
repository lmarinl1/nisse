## Why

En el Canvas overview del Marco del objeto de estudio, la franja de progreso con los 5 subítems se desborda del header (sobre todo el ítem 05) cuando los títulos son largos. Eso rompe la lectura integrada del instrumento: el progreso deja de caber en el marco del Canvas.

## What Changes

- Contener los 5 subítems de tracking **dentro** del header del overview (sin overflow horizontal ni recorte fuera del borde).
- Permitir **saltos de línea** en el título de cada subítem (el texto completo permanece legible; no truncar con ellipsis agresivo).
- Hacer **responsive** todos los headers de Canvas de sesión que usan `SessionCanvasHeader` (overview y sección del Marco, y headers homologados de otras sesiones) para que brand, copy y aside se reorganicen sin salirse del contenedor en viewports estrechos o con Companion abierto.

## Non-goals

- No cambiar API, estados de progreso ni copy de producto de los subítems.
- No rediseñar la tríada de estados / flag Guardado de sección (change aparte).
- No tocar el spine/overview tiles ni el Drawer de overflow de campos.
- No añadir scroll horizontal como “solución” al tracking del overview.

## Capabilities

### New Capabilities

- `case-framework`: layout del header overview del Marco — tracking de 5 subítems contenido, con wrap de títulos, sin overflow.
- `session-canvas-header`: responsividad del header compartido de Canvas (brand, copy, aside) para que no se salga del contenedor en viewports estrechos ni con paneles laterales abiertos.

### Modified Capabilities

- (ninguna — ambas capacidades aún no viven en `openspec/specs/`; este change las introduce vía delta)

## Impact

- **Frontend / UX-workspace**: `CaseFrameworkOverviewCanvas`, `session-canvas-header.css`, `case-framework.css` (tracking + headers de sección que reutilicen el mismo patrón).
- Research question: ¿Cómo se lee de un vistazo el progreso del Marco sin que el header se rompa?
- Cognitive Objects: ninguno (solo instrumento de lectura del Marco).
