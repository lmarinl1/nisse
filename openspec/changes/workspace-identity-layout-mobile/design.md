## Context

Hoy el identity panel usa `NisseBrandLockup` compact (favicon sin estrellas + wordmark en fila) y el lema debajo a ancho completo. El rail ya tiene media queries parciales tras `align-workspace-surface-panels`. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**

- Grid/flex 2×2 lógico: mark izquierda (row-span 2); NISSE + motto a la derecha.
- Mark `official-clean` (estrellas) discovery, ~md/lg (~40–48px), no favicon.
- Mobile: stack shell + identity legible (puede conservar 2 columnas estrechas o apilar mark sobre textos).

**Non-Goals:**

- No nuevo asset SVG.
- No cambiar tokens de color.

## Decisions

1. **Composición en `StudyWorkspace`** (no forzar `NisseBrandLockup` monolítico): mark discovery + wordmark + motto como nodos hermanos en `.workspace__identity` con CSS grid:
   ```
   grid-template-areas:
     "mark wordmark"
     "mark motto";
   ```
   Reutilizar estilo discovery mask de brand (clase `nisse-mark--discovery` + `official-clean`).

2. **Tamaño mark:** `nisse-mark--md` o ligeramente mayor (~2.75rem) en desktop; en móvil no menos de `sm`/`md`.

3. **Mobile shell:** mantener `grid-template-rows: auto 1fr auto`; sessions list horizontal; Companion abajo; Canvas ~55vh; identity grid puede compactarse (`gap` menor) sin perder orden mark | textos.

4. **Accesibilidad:** wordmark visible; mark `aria-hidden` si el nombre está en texto; panel con landmark existente.

## Risks / Trade-offs

- [Rail estrecho + mark grande comprime motto] → Mitigation: motto 2–3 líneas, `line-clamp` opcional, font caption.
- [official-clean mask con estrellas densas] → Mitigation: ya usado en entry; validar contraste discovery.

## Migration Plan

Frontend-only. Rollback: restaurar `NisseBrandLockup` compact + motto debajo.
