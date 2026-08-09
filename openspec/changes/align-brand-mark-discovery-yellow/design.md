## Context

`ResearchSessionNav` muestra el eyebrow “Proceso”. `NisseBrandLockup` usa variantes `official`/`favicon` con neon fijado en el SVG, mientras iconos activos del rail usan `--color-discovery-primary`. `docs/ux-framework/13-brand-mark.md` hoy dice que discovery no reemplaza el neon del mark. Ver proposal.md — Why.

Nota: `brand-identity` aún no está en `openspec/specs/` (change `integrate-brand-identity-surfaces` pendiente de archive). Este change introduce la capability con la política actualizada.

## Goals / Non-Goals

**Goals:**

- Eliminar copy “Proceso” del rail.
- Unificar color del mark in-app con el acento discovery de iconos activos.
- Actualizar Design Language para que no contradiga el producto.

**Non-Goals:**

- No reescribir todos los SVG oficiales a discovery (kit marketing puede conservar neon).
- No cambiar geometría del telescopio.

## Decisions

1. **In-app: `currentColor` + `--color-discovery-primary`**  
   Preferir variantes `official-currentColor` / `favicon-currentColor` (o mask CSS) en `NisseBrandLockup`, con `color: var(--color-discovery-primary)` en el lockup. Alternativa descartada: recolorar SVGs oficiales (rompe kit neon).

2. **`<img>` no hereda `currentColor`**  
   Si el mark se sirve vía `<img>`, usar SVG inline, `mask-image`, o componente que inyecte el SVG. Documentar la elección en implementación; preferir el path ya previsto en `13-brand-mark.md` para currentColor.

3. **Docs**  
   Actualizar `13-brand-mark.md`: dualidad “kit neon vs lockup discovery”. Ajustar `10-iconography.md` (active = discovery; mark in chrome alinea con ese acento). Comentario en `tokens.css` si hace falta.

4. **Proceso**  
   Quitar el `<p className="research-session-nav__eyebrow">Proceso</p>`; conservar `aria-label` del `<nav>`.

## Risks / Trade-offs

- [Conflict con delta “Brand neon vs discovery” de `integrate-brand-identity-surfaces`] → Mitigation: al archivar, este change manda para lockups in-app; fusionar requisitos.
- [currentColor vía img no funciona] → Mitigation: inline SVG o CSS mask en el apply.
- [Mark discovery + wordmark blanco puede bajar contraste de identidad] → Mitigation: wordmark sigue text-primary; mark discovery como señal de acento.

## Migration Plan

Frontend + docs only. Rollback: restaurar eyebrow y variantes neon en lockup.
