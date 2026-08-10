## Context

Tras `homologate-drawers-headers-forms`, `ResearchDrawer` usa grid `auto auto minmax(0,1fr) auto` y `overflow: auto` en body, pero el CTA del footer con `btn-discovery` en `display: grid` se estira a ancho completo y puede verse excesivo; el foco usa `outline` + `outline-offset` (irregular junto al border); el scroll puede fallar si hijos (p. ej. Markdown editor) fuerzan altura sin `min-height: 0` / overflow en cascada. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:** CTA footer compacto; scroll fiable al editar Recuerdo; focus ring uniforme en controles del drawer.

**Non-Goals:** Cambiar copy, API, Select Radix API, o anchos del drawer.

## Decisions

### 1. Compact footer CTA

- Footer: `justify-items: stretch` → primary button `width: auto` / `justify-self: stretch` with **max** optional, or `justify-items: start` so button is content-sized.
- Add `.btn-discovery--compact` (smaller padding, optional `width: 100%` with `max-height` / denser padding) used only in drawer footers — avoids shrinking library CTAs.
- Timeline create-recuerdo footer uses compact class.

**Alternatives:** shrink all `.btn-discovery` globally → rechazado (rompe Study library/auth).

### 2. Scroll body

- Keep panel grid; ensure `.research-drawer__body { min-height: 0; overflow-y: auto; }`.
- Nested forms/sections: `min-height: 0`; Markdown editor containers must not use `overflow: hidden` that traps without scroll on the body.
- Verify RecallDrawer: long description + momentos list scrolls inside body; footer Stay pinned.

### 3. Uniform focus ring

Replace outline focus with:

```css
box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-discovery-primary) 45%, transparent);
outline: none;
```

Apply to inputs/textarea/select and `.research-select__trigger` inside drawers. Same for open/focus states.

**Alternatives:** thicker border-color only → peor contraste; outline sin offset → aún puede clippear en overflow parents.

## Risks / Trade-offs

- [Risk] Content-sized CTA looks left-aligned odd → Mitigation: full-width but compact height (padding) if visual review prefers.
- [Risk] Markdown editor internal scroll fights body scroll → Mitigation: prefer single body scroll; constrain editor max-height only if needed.
- [Trade-off] Compact class local vs new footer button component → start with CSS class.

## Migration Plan

1. CSS: focus ring + footer compact + scroll hardening.
2. Wire compact class on create/edit recuerdo CTAs (and other drawer footers for consistency).
3. Visual smoke create + edit long recuerdo.
4. `tsc`/build.

## Open Questions

- None: default to full-width footer button with **reduced padding/height** if content-sized feels too short in review.
