## Context

Section Canvas headers hoy usan pills outline + save-pill + toggle debajo. Textareas tienen mix discovery en el fondo. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**
- Tríada de 3 estados a la derecha (gris / activo blanco|amarillo|verde).
- Toggle terminado a la derecha con la tríada.
- Flag “Guardado” discreta arriba-derecha cuando `saveState === 'saved'` (o idle post-save).
- Editores con fondo `--color-workspace-canvas` / background de sistema.

**Non-Goals:**
- Cambiar overview.
- Renombrar API statuses.

## Decisions

### 1. Header layout

```text
[ mark | title/subtitle ]     [ triad ] [ terminado toggle ]
                              [ Guardado flag — corner ]
```

CSS: `hero-header` como grid/flex; bloque derecho `case-framework__hero-aside` con triad + toggle; flag `position: absolute; top/right` dentro del header frame.

### 2. Triad mapping

| API status | Triad active |
|------------|--------------|
| `not_started` | Sin comenzar (white) |
| `in_progress`, `with_content` | En construcción (discovery) |
| `reviewed` | Terminado (success green) |

Inactive labels: `--color-text-muted` / secondary. No outline chips for the triad — text/indicators only (or minimal dots), gray until active.

### 3. Guardado flag

Show when `saveState === 'saved'` (and optionally brief after save). Hide on `dirty`/`saving`/`error`. Style: small pill, `background: discovery` soft/solid discreet, dark or canvas text per contrast; corner of header.

On first load `idle` without prior save this session: no flag (or show only after first successful save in session — prefer after `saved`).

### 4. Textarea background

`.md-research-editor__input` and preview surfaces: `background: var(--color-workspace-canvas)` or `--color-workspace-background` matching tiles; remove discovery color-mix fill.

## Risks / Trade-offs

- [Risk] White on dark for Sin comenzar may need `--color-text-primary` not literal #fff → Mitigation: use primary text token as “blanco”.
- [Trade-off] `with_content` no longer separate in header triad → acceptable per request of 3 states.

## Migration Plan

Frontend-only. Rollback = revert section header CSS/JSX.

## Open Questions

- Ninguna bloqueante.
