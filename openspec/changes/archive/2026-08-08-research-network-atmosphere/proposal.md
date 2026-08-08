## Why

La biblioteca de Objetos de Estudio aún se siente plana: el fondo oscuro no comunica el modelo mental de conocimiento relacional. Una atmósfera de red/nodos en amarillo discovery (como el referente visual de órbitas y plexo) refuerza exploración sin convertirse en ruido administrativo, y debe ser un motivo visual **reutilizable** en NISSE.

## What Changes

- Introducir un instrumento visual compartido: atmósfera animada de **red + nodos** que se conectan y desconectan suavemente.
- Aplicarla primero como fondo de la superficie de biblioteca / Empty State de Objetos de Estudio.
- Usar tokens discovery (amarillo) sobre fondo workspace oscuro; la UI de contenido permanece legible y en primer plano.
- Respetar `prefers-reduced-motion` (estática o desactivada).
- Documentar el patrón como atmósfera común (no decoración genérica).

**Touches:** frontend + UX/motion. Sin cambios de API/dominio.

**Research question:** ¿Cómo se siente el conocimiento emergiendo como relaciones?

**Cognitive Objects:** ninguno nuevo; la atmósfera evoca relaciones futuras sobre el Canvas/biblioteca.

## Non-goals

- Labels institucionales o branding de la imagen de referencia (solo la metáfora visual de red/órbita).
- Sustituir el Canvas de investigación ni simular Objetos Cognitivos reales.
- Interactividad de nodos (click/drag) en este change.
- Dependencias pesadas de 3D/WebGL si un canvas 2D/SVG basta.
- Aplicar la atmósfera a todas las pantallas de una vez (solo biblioteca + componente reutilizable).

## Capabilities

### New Capabilities

- `research-network-atmosphere`: atmósfera animada reutilizable de red/nodos discovery; primera instancia en la biblioteca de Objetos de Estudio; accesibilidad de motion.

### Modified Capabilities

- `frontend-app`: la entrada autenticada (biblioteca / empty state) incorpora la atmósfera de fondo sin alterar el flujo de Studies.

## Impact

- **Frontend:** componente en `shared` o `features/atmosphere`; integración en `StudyHome`.
- **Tokens/motion:** discovery yellow, opacidades bajas, duraciones contemplativas (`docs/ux-framework/09`).
- **Perf:** animación ligera; pausar fuera de viewport si aplica.
- **Deps:** preferir Canvas 2D o SVG nativo; Framer Motion solo si ya aporta valor claro.
