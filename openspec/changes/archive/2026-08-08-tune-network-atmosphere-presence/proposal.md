## Why

La atmósfera de red discovery ya existe, pero quedó demasiado opaca y pequeña: casi no se percibe detrás de la biblioteca. Hay que subir presencia visual (amarillo más vivo, escala ~60% del viewport) sin perder legibilidad ni el carácter responsive que ya funciona.

## What Changes

- Aumentar luminosidad/opacidad de nodos, aristas, anillos y nebulosa (tono discovery más apreciable).
- Ampliar el campo orbital para que ocupe aproximadamente el **60%** del área visible detrás del contenido.
- Suavizar o reducir la viñeta/scrim si está aplastando el amarillo.
- Conservar responsive (ResizeObserver / DPR) y `prefers-reduced-motion`.

**Touches:** frontend UX/motion only.

**Research question:** ¿Se siente el conocimiento relacional emergiendo en el fondo del laboratorio?

**Cognitive Objects:** ninguno; solo atmósfera.

## Non-goals

- Cambiar el token global `--color-discovery-primary` de toda la app (salvo ajuste mínimo si hace falta solo para atmósfera).
- Interactividad de nodos.
- Reaplicar en Auth/Workspace en este change.
- Romper contraste de texto/CTAs (sigue siendo fondo, no primer plano).

## Capabilities

### New Capabilities

- `research-network-atmosphere`: presencia visual de la atmósfera (intensidad discovery + escala ~60% viewport) como motivo común; mantiene fondo no interactivo, legibilidad, responsive y reduced-motion.

### Modified Capabilities

- `frontend-app`: la entrada de Objetos de Estudio muestra la atmósfera con mayor presencia sin cambiar el flujo de Studies.

## Impact

- `ResearchNetworkAtmosphere.tsx` (scale, alphas, brillo del color de dibujo).
- `study.css` viñeta (`study-home__vignette`).
- Sin backend/API.
