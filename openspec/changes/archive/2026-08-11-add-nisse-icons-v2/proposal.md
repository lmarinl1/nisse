## Why

El set oficial de UI (`frontend/src/shared/icons`) aún no incluye el **NISSE Icon Set II** (34 SVG de tiempo, astronomía, navegación, grafos y futuros). Sin esos glifos, sesiones y objetos cognitivos siguen usando proxies débiles (p. ej. calendario para timelines, grafo genérico para escenarios). Hay que incorporar el pack y alinear el Design Language.

## What Changes

- Incorporar los 34 SVG de `nisse-icons-v2` al catálogo oficial (`svg/` + `registry.tsx` + `named.tsx` + `index.ts`), mismo contrato técnico (24×24, stroke 2, `currentColor`).
- Actualizar `docs/ux-framework/10-iconography.md` y `frontend/src/shared/icons/README.md` (catálogo, familias, mapeo a objetos/sesiones).
- Remapear usos actuales a glifos v2 más dicientes donde el concepto mejore (sobre todo `researchSessions` y mapeos documentados de Objetos Cognitivos).
- **No tocar** el brand mark / logo principal (`public/brand`, `NisseMark`, favicon). El glifo UI `telescope` es instrumento de interfaz, no reemplazo del mark.

## Non-goals

- No rediseñar ni sustituir el brand mark / telescopio de identidad.
- No añadir Lucide u otras librerías de iconos.
- No hardcodear `#D7FF2F` del kit de prototipo en UI (sigue `currentColor` + tokens).
- No inventar glifos fuera del pack v2 ni del set I existente.
- No cambiar APIs backend ni contratos REST.

## Capabilities

### New Capabilities

- `iconography`: Catálogo oficial de iconos UI de NISSE (registro, extensión Set II, semántica, separación mark vs iconos, sincronía con el UX framework).

### Modified Capabilities

- `research-session-nav`: Las sesiones del Sidebar deben usar glifos semánticamente más precisos del catálogo ampliado (cuando exista un icono v2 más diciente que el proxy actual).

## Impact

- **Frontend / UX / Workspace:** `frontend/src/shared/icons/**`, consumidores que remapeen (p. ej. `researchSessions.ts`, posiblemente Case Framework / Cognitive Object tables en docs).
- **UX framework:** `docs/ux-framework/10-iconography.md` (y mención breve en README de icons).
- **Backend / API:** ninguno.
- **Research question:** ¿cómo representar tiempo, observación, orientación, relaciones y futuros con instrumentos visuales coherentes en el laboratorio?
- **Cognitive Objects afectados (mapeo iconográfico):** Timeline, Señal, Relación/grafo, Escenario, Incertidumbre/horizonte; sin cambiar modelo de datos.
