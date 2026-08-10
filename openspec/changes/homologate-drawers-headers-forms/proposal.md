## Why

Los Drawers (Study, Case Framework, Timelines) y los headers de subitems no comparten chrome: anchos distintos, títulos sin acento discovery, selects nativos sin estilo, botones de acción inconsistentes (`primary` vs `btn-discovery`), y el brand mark con estrellas ausente en varios drawers. Eso rompe la sensación de laboratorio único y desvía del Design Language (Drawer derecho, Discovery Yellow, mark oficial).

## What Changes

- Homologar **todos** los Drawers a ~**1/4 del viewport** desde la derecha, título en amarillo discovery, mark con estrellas en el header del drawer, CTA Guardar/Crear/Actualizar en discovery yellow.
- Introducir primitiva de **Select** (y campos de formulario) alineada a tokens NISSE — librería headless ligera o control propio estilizado (decisión en design).
- Oficializar **SessionCanvasHeader** (patrón case-framework: mark + eyebrow + título + propósito) para todos los subitems/canvases de sesión (timelines overview/detail, case-framework, futuros).
- Corregir alineación de nodos en la línea temporal vertical: centros de círculos = eje de la spine.
- Actualizar tokens/CSS compartidos y docs UX mínimas que documenten el contrato visual.

## Non-goals

- No rediseñar atmósfera, Companion ni navegación de proceso.
- No cambiar contratos API ni lógica de timelines/case-framework.
- No introducir librerías de UI “dashboard” (Material, Ant, Chakra) ni temas purple/cream genéricos.
- No convertir Drawers en Modales.

## Capabilities

### New Capabilities

- `research-drawer`: chrome compartido de Drawer de investigación (ancho ¼, header con mark + título discovery, formularios, Select, CTA discovery).
- `session-canvas-header`: header homologado de Canvas de subitem/sesión (mark, eyebrow, título, propósito/acciones).
- `study-timelines`: extensión visual (nodos centrados en spine; headers oficiales) — complementa el instrumento si el change de timelines aún no está archivado en main.

### Modified Capabilities

- `frontend-app`: Study / Case Framework / Timelines consumen research-drawer y session-canvas-header.

## Impact

- **Frontend + UX/workspace** (sin backend).
- **Shared:** `frontend/src/shared/ui/` (Drawer, Select, form fields) + tokens; brand via `NisseMark` / discovery mask (`docs/ux-framework/13-brand-mark.md`).
- **Deps:** probable `@radix-ui/react-select` (headless) o Select CSS-only — ver design.
- **Research question:** ¿El instrumento mantiene contexto del Canvas mientras se edita desde un drawer coherente con el laboratorio?
- **Cognitive Objects:** ninguno nuevo; refinamiento de instrumentos existentes.
