## Why

La atmósfera orbital (órbitas, “estrellas”, nube/núcleo amarillo) comunica observatorio nocturno y encaja en dark mode, pero en light mode (papel técnico) se siente fuera de metáfora: ya no hay cielo nocturno. Hace falta una atmósfera light-only de **campo de exploración** —relaciones incompletas que emergen— alineada a “NISSE no predice el futuro; explora relaciones que todavía no habíamos visto.”

## What Changes

- En light (resolved `data-theme="light"`), Auth y Campo/Study entry usan un **campo de exploración**: fondo claro, partículas sutiles en acento brand neon `#D7FF2F`, aparición/desaparición, conexiones parciales y ramificaciones incompletas (nunca grafo completo).
- Sin órbitas, sin anillos, sin nube/núcleo denso tipo dark.
- Respuesta sutil al cursor: nodos cercanos reaccionan y pueden revelar conexiones.
- Dark mode conserva la atmósfera orbital actual sin cambios de metáfora.
- Documentar dualidad dark-orbital / light-exploration en `docs/ux-framework` (visual + motion + atmósfera).

## Non-goals

- Sustituir la atmósfera dark; tema custom; partículas cyberpunk / glow fuerte / exceso de densidad.
- Hacer la atmósfera chrome interactivo (clicks, selección, navegación); solo pointer para atracción sutil, sin capturar gestos de UI.
- Nuevos Cognitive Objects, API, o Settings nuevas.

## Capabilities

### New Capabilities

- _(none)_

### Modified Capabilities

- `research-network-atmosphere`: variantes por tema resuelto (orbital dark vs exploration field light); afinidad al cursor; acento brand neon; constraints de identidad.
- `frontend-app`: Auth + Study entry montan la atmósfera theme-aware (light usa campo de exploración).

## Impact

- **Frontend + UX** (sin backend).
- **Research question:** ¿Qué metáfora visual sostiene la entrada al laboratorio de día (exploración relacional) vs de noche (observatorio)?
- **Cognitive Objects:** ninguno nuevo; la atmósfera sigue siendo motif de conocimiento relacional.
- Código principal: `frontend/src/features/atmosphere/ResearchNetworkAtmosphere.tsx` (+ CSS); consumidores Auth/StudyHome; docs en `docs/ux-framework/01-visual-language.md` y `09-motion-language.md`.
