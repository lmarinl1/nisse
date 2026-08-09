## Context

Hoy el Canvas es `border + radius-lg + --color-workspace-canvas` sobre `workspace__stage` con fondo background. El rail/Companion usan `--color-workspace-surface` a columna completa; los `workspace__rail-panel` tienen borde pero `flex-shrink: 0` y sessions no crece. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**

- Columnas rail/stage/companion = fondo background + padding uniforme.
- Paneles y Companion = misma “caja” que Canvas.
- Sessions panel `flex: 1` + `min-height: 0` (scroll interno si hace falta).

**Non-Goals:**

- No rediseñar tipografía ni iconos.
- No sticky/fixed fuera del layout flex/grid actual.

## Decisions

1. **Fondo de columnas:** quitar fill `workspace-surface` (o igualarlo a background) en `.workspace__rail` / `.workspace__companion`; quitar `border-right/left` de columna si el framing vive en los paneles.

2. **Superficie compartida:** clase utilitaria o reutilizar panel styles: `border`, `radius-lg`, `background: var(--color-workspace-canvas)` (o panel token si contraste lo pide). Companion: un único `.workspace__companion-panel` (o `workspace__rail-panel`) que llene la columna en altura.

3. **Sessions crece:** `.workspace__rail-panel--sessions { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }` y nav/list `overflow-y: auto` si la lista supera el alto.

4. **Alineación:** mismo padding en rail, stage y companion (p. ej. `var(--space-4)`); Canvas height `calc(100% - …)` o `flex:1` dentro del stage para alinear con Companion full-height panel.

5. **Study foot:** sigue `margin-top: auto` solo si sessions no absorbe todo el flex; con sessions `flex:1`, el foot puede quedar sin `margin-top: auto` (orden natural: identity → sessions flex → study). Preferir **quitar `margin-top: auto` del foot** y dejar que sessions crezca; study al final del stack.

## Risks / Trade-offs

- [Lista de 9 sesiones en panel alto deja mucho vacío] → Mitigation: OK; es el “extender el menú” pedido; opcional alinear items al top.
- [Companion muy alto con poco copy] → Mitigation: panel full-height con copy arriba (respiración), no centrar forzado.

## Migration Plan

CSS + wrapper mínimo en Companion. Rollback: restaurar columnas surface.
