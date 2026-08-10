## Context

El Marco ya tiene headers con fill discovery, chips rellenos, `max-width` estrecho en contenido, Companion `minmax(12rem, 15rem)` vs rail `minmax(14rem, 17rem)`, y scrollbars solo parciales. Ver proposal.md — Why. Referencia visual: línea fina + thumb circular/cápsula (mockup), en discovery yellow.

## Goals / Non-Goals

**Goals:**
- Headers neutrales + borde discovery.
- Estándar global de scrollbar (CSS) + docs UX.
- Chips outline (gris / discovery / verde).
- Canvas content full stage width; Companion ≈ rail.

**Non-Goals:**
- Scrollbar custom con botones ▲▼ en todos los overflow (el mockup guía la metáfora; v1 = CSS line + circular/capsule thumb).
- Cambios de API/backend.

## Decisions

### 1. Header fill

`.case-framework__hero-header`: `background: var(--color-workspace-canvas)` (o mismo token que tiles); `border-color` discovery mix. Quitar mix amarillo de fill.

### 2. Global scrollbar tokens + utility

En `tokens.css` (o bloque dedicado):
- `--scrollbar-size`, `--scrollbar-thumb` (discovery), `--scrollbar-track-line`.

Aplicar vía:
```css
* { scrollbar-width: thin; scrollbar-color: … }
*::-webkit-scrollbar { … }
*::-webkit-scrollbar-track { background transparent; border-left/center line }
*::-webkit-scrollbar-thumb { border-radius: 999px; /* capsule/circle */ }
```
Unificar: quitar estilos locales divergentes en `.research-session-nav` o hacerlos heredar el global.

Docs: sección nueva en `docs/ux-framework/01-visual-language.md` (o `06-design-tokens.md`) + entrada en `README.md` del framework. Título sugerido: “Scrollbar / Chrome de desplazamiento”.

### 3. Chip outline semantics

| Estado | Color |
|--------|--------|
| Sin comenzar / idle Guardado | gris (`--color-text-secondary` / border-subtle) |
| En construcción / Con contenido / Guardando | discovery |
| Terminado / Guardado OK reciente | verde (token success o `--color-success` si existe; si no, añadir token mínimo) |

Estilo: `background: transparent`, `border: 1px solid current`, `color: same`.

### 4. Width

- Quitar o elevar `max-width` de `.case-framework__*` content (hero, mosaic, spine) para usar ~100% del stage con padding interno.
- Grid: `minmax(14rem, 17rem) 1fr minmax(14rem, 17rem)` (Companion = rail).

## Risks / Trade-offs

- [Risk] `*::-webkit-scrollbar` afecta embeds raros → Mitigation: scope a `.workspace`, `.case-framework`, surfaces de app si hace falta.
- [Risk] Verde sin token → Mitigation: añadir `--color-status-success` en tokens.
- [Trade-off] Sin flechas del mockup en v1 → documentar como opcional futuro.

## Migration Plan

1. Tokens + CSS global + case-framework/workspace tweaks + docs.
2. Sin migración DB.
3. Rollback: revert CSS/docs.

## Open Questions

- Ninguna bloqueante: verde exacto se toma del token success nuevo o del más cercano existente en `tokens.css`.
