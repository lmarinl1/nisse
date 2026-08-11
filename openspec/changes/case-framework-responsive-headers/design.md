## Context

See proposal.md — Why. Specs: `case-framework`, `session-canvas-header`.

Hoy el overview del Marco pone el tracking de 5 subítems en el `aside` de `SessionCanvasHeader`. El aside usa `flex-shrink: 0` + `min-width: 10rem`, así que el grid de 5 columnas puede expandirse más que el Canvas (sobre todo con Companion abierto) y el ítem 05 se sale del marco. Los labels ya tienen `line-clamp: 2`, pero el contenedor no está acotado: el clamp no evita el overflow horizontal.

## Goals / Non-Goals

**Goals:**
- Contener el tracking overview dentro del borde del header en anchos típicos de Workspace.
- Permitir wrap natural de títulos de tracking.
- Hacer que `SessionCanvasHeader` (todos los consumidores) respete el ancho del stage: brand/copy/aside reflow sin overflow.

**Non-Goals:**
- No cambiar markup de datos ni API de progreso.
- No rediseñar tríada / Guardado de sección.
- No introducir scroll horizontal en el header como solución.

## Decisions

### 1. Acotar el aside compartido (root fix)
- **Choice:** En `session-canvas-header.css`, el aside pasa a ser shrinkable: `min-width: 0`, `max-width: 100%`, quitar o relajar `flex-shrink: 0`. Brand/copy ya usan `min-width: 0`.
- **Why:** Sin contenedor acotado, `minmax(0, 1fr)` del grid no puede comprimir columnas.
- **Alternative:** Solo CSS en case-framework — rechazado porque Timelines y secciones reutilizan el mismo header y el usuario pidió headers responsive en general.

### 2. Overview tracking a banda full-width bajo el copy
- **Choice:** En variant overview (o clase específica del tracking), forzar el aside a `flex-basis: 100%` / `width: 100%` cuando envuelve, de modo que los 5 ítems ocupen el ancho del header bajo título+purpose (composición ya sugerida por el layout visual), no una columna estrecha a la derecha que pelea con el título.
- **Why:** Cinco títulos largos en español no caben cómodamente como “chip row” lateral; una banda inferior es el instrumento de lectura.
- **Alternative:** Mantener aside lateral + tipografía más chica — rechazado (ilegible / sigue frágil con Companion).

### 3. Wrap de títulos sin clamp agresivo
- **Choice:** Quitar `-webkit-line-clamp: 2` del label de tracking; mantener `overflow-wrap` / `word-break` y `min-width: 0` por ítem. Altura del header puede crecer; eso es aceptable.
- **Why:** El pedido explícito es saltos de línea legibles, no truncar.
- **Alternative:** Clamp a 3 líneas — peor para títulos como “Problemáticas o tensiones establecidas”.

### 4. Grid 5 → stack más temprano
- **Choice:** Conservar `repeat(5, minmax(0, 1fr))` en desktop amplio; colapsar a 1 columna (o 2) en un breakpoint más alto que el actual `900px` si hace falta tras smoke (p. ej. cuando el stage con Companion queda ~<1100px).
- **Why:** Overflow aparece antes del breakpoint móvil actual.
- **Alternative:** Siempre 1 columna — sacrifica la lectura “cinco etapas en paralelo” en desktop.

### 5. Alcance de verificación
- **Choice:** Smoke en CF overview, CF section (tríada aside), Timelines overview/detail — mismos CSS compartidos.
- **Why:** Un solo componente; regresión cruzada barata.

## Risks / Trade-offs

- [Risk] Aside shrinkable comprime demasiado acciones de Timelines → Mitigation: aside de Timelines suele ser poco denso; verificar botones no se aplastan; usar wrap vertical si hace falta.
- [Risk] Header overview más alto con wrap → Mitigation: aceptable; Canvas sigue siendo protagonista debajo.
- [Trade-off] Banda full-width vs aside lateral → preferimos legibilidad y contención sobre densidad lateral.

## Migration Plan

1. CSS en `session-canvas-header.css` + `case-framework.css` (tracking).
2. Sin migración de datos; rollback = revert CSS.
3. Smoke manual en WSL `npm run dev` con Companion abierto/cerrado.

## Open Questions

- Ninguna que bloquee specs/tasks; el breakpoint exacto de colapso se afina en apply tras smoke visual.
