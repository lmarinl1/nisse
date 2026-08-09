## Context

El rail (`StudyWorkspace`) apila lockup, `ResearchSessionNav` y `workspace__rail-foot` sin contenedores visuales. Tokens ya ofrecen `--radius-*`, `--color-border-subtle`, `--color-workspace-panel`. Ver proposal.md — Why. UX: paneles secundarios, no cards (`01-visual-language`, `03-patterns`).

## Goals / Non-Goals

**Goals:**

- Tres paneles redondeados con borde sutil y gap entre ellos.
- Lema bajo el lockup en el panel de identidad.
- Mantener flex: sesiones en el medio; pie anclado abajo.

**Non-Goals:**

- No reintroducir eyebrow “Proceso”.
- No elevar paneles con multi-shadow ni fondos discovery.

## Decisions

1. **Naming BEM:** `workspace__rail-panel` (+ modificadores `--identity` / `--sessions` / `--study` si hace falta). Evitar `card`.

2. **Estilo:** `border: 1px solid var(--color-border-subtle)`; `border-radius: var(--radius-lg)`; padding `var(--space-3)`–`var(--space-4)`; gap entre paneles `var(--space-3)`. Fondo opcional `var(--color-workspace-panel)` a opacidad baja o transparente — preferir borde sobre relleno pesado para no competir con el Canvas.

3. **Lema:** copy exacto con dos puntos: «El futuro no se predice: se anticipa y se diseña.» Clase tipo `workspace__motto` / caption secondary.

4. **Estructura DOM:**
   ```
   aside.rail
     .rail-panel (identity): lockup + motto
     .rail-panel (sessions): ResearchSessionNav
     .rail-panel.rail-foot (study): context + Campo
   ```
   El `margin-top: auto` permanece en el panel de study.

5. **Mobile:** paneles siguen apilados; borde/radio se conservan; sesiones pueden seguir en scroll horizontal interno.

## Risks / Trade-offs

- [Rail estrecho + padding de paneles reduce ancho útil] → Mitigation: padding contenido, no ensanchar columnas del grid.
- [Parecer “cards”] → Mitigation: borde hairline, sin sombra, naming Panel, copy reflexivo.

## Migration Plan

Frontend-only. Rollback: quitar wrappers/CSS de paneles y el lema.
