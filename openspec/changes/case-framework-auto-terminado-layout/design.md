## Context

Section headers tienen tríada + toggle + flag Guardado apretados. Status API aún usa `reviewed` manual. Overview tracking es `grid` de 5 columnas pero el hero/overview puede forzar overflow-x o dejar el tracking “pegado” a la izquierda con hueco muerto. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Más gap en `.case-framework__hero-aside` / triad / flag.
- Quitar `SectionCompletionToggle` del section canvas.
- Triad: Terminado ⇔ todos los fields no vacíos; sync opcional de `reviewed` al PATCH.
- Overview: tracking full-width, `overflow-x: hidden`, proporción equilibrada.

**Non-Goals:**
- Eliminar campo `reviewed` del modelo en este change (puede quedar sincronizado automáticamente).
- Cambiar overview tiles/drawer.

## Decisions

### 1. Spacing

Aumentar `gap` en hero-aside y status-triad (p.ej. `var(--space-3)` / `var(--space-2)`); dar margen inferior al flag respecto a la tríada (`top` + `margin` o stack con gap explícito). Evitar que el flag se solape con la tríada.

### 2. Remove toggle

Eliminar uso de `SectionCompletionToggle` en `CaseFrameworkSectionCanvas`. El componente puede quedar en el repo sin usarse o borrarse si no tiene otros consumidores.

### 3. Auto Terminado

UI triad mapping:
| Fields | Triad |
|--------|--------|
| all empty | Sin comenzar |
| some filled | En construcción |
| all filled | Terminado |

Preferir derivar de `fields` en el cliente para la tríada (fuente de verdad inmediata). Al guardar: si todos llenos, PATCH `reviewed: true`; si no, `reviewed: false` — así overview/nav que lean `status` del API se alinean. Alternativa solo-UI: mapear `with_content` → Terminado y dejar de usar `reviewed` en triad; sync `reviewed` sigue siendo mejor para nav dots.

**Choice:** sync `reviewed` automáticamente en autosave según completeness; triad puede usar status API o local derivation from fields (prefer fields for instant feedback, then API status after save).

### 4. Overview layout

- `.case-framework__tracking { width: 100%; grid-template-columns: repeat(5, minmax(0, 1fr)); }`
- Parent hero: `overflow-x: hidden`; quitar min-widths que empujen overflow.
- Labels: clamp/wrap; no `nowrap` forzoso en filas.
- Asegurar `.case-framework--overview` / spine no crean scroll horizontal (`max-width: 100%`, `min-width: 0` en grid children).

## Risks / Trade-offs

- [Risk] Usuario quiere marcar Terminado con campos vacíos a propósito → Mitigation: producto pide auto-only; incertidumbre visible vía Sin comenzar/En construcción.
- [Trade-off] `reviewed` deja de ser manual → documentado.

## Migration Plan

Frontend (+ PATCH reviewed auto). Estudios con `reviewed: true` y campos vacíos se corregirán en próximo save. Rollback: restaurar toggle.

## Open Questions

- Ninguna bloqueante.
