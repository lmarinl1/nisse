## Context

Hoy coexisten dos chromes de drawer (`study-drawer` ~26rem vs case-framework ~28rem), títulos sin Discovery Yellow, Select nativo sin estilo, CTAs inconsistentes, y headers de timelines sin mark. Ver proposal.md — Why. Specs: `research-drawer`, `session-canvas-header`, deltas `frontend-app` + `study-timelines`.

Constraints: tokens en `shared/tokens`; brand en `shared/brand` + `13-brand-mark.md`; Drawer > Modal (`02`/`03`/`05`); Discovery Yellow ≠ neon kit; sin Material/Ant; WSL only.

## Goals / Non-Goals

**Goals:**
- Una primitiva `ResearchDrawer` + form fields + `ResearchSelect`.
- `SessionCanvasHeader` oficial consumido por case-framework y timelines.
- Track vertical: centros de círculos = eje spine.
- Tokens/CSS documentados; UX docs touch mínimas si el contrato lo requiere.

**Non-Goals:**
- Rediseñar rail/Companion; cambiar API; theming multi-marca.

## Decisions

### 1. Width = 25vw with clamps

```css
width: clamp(18rem, 25vw, 28rem);
```

~¼ viewport, usable min, capped so ultrawide no se vuelve panel gigante. Mobile: `min(100vw - gutter, 28rem)` still right-anchored.

**Alternatives:** fixed `26rem` only → rechazado (no cumple “1/4”). Exact `25%` sin clamp → frágil.

### 2. Shared module layout

```text
frontend/src/shared/ui/
  ResearchDrawer.tsx + research-drawer.css
  ResearchSelect.tsx
  FormField.tsx (label + hint + error)
  SessionCanvasHeader.tsx + session-canvas-header.css
```

Migrate StudyCreateDrawer, Timeline*, CaseFramework drawer to `ResearchDrawer`. Deprecate divergent width/z stacks; keep feature CSS for content only.

### 3. Select: Radix Select (headless)

Add `@radix-ui/react-select` — accesible, styleable, sin look genérico. Estilos 100% tokens NISSE (surface, border-subtle, discovery focus, no purple).

**Alternatives:** native+CSS only → limitado en dark lab; react-select → pesado; shadcn full kit → rechazo (pulls dashboard aesthetics).

Fallback if dep blocked: custom listbox with same CSS contract.

### 4. Brand mark in drawer header

Use discovery mask pattern already in case-framework (`nisse-mark--discovery` + `official-clean`) or `NisseMark`/`NisseBrandLockup` compact. Stars required (not favicon-without-stars). Title color: `--color-discovery-primary`.

### 5. Primary CTA = btn-discovery

Unify on existing `btn-discovery` (or tokenized alias). Remove dangling `primary` class usages in timelines. Ghost/secondary unchanged.

### 6. SessionCanvasHeader API

```tsx
<SessionCanvasHeader
  eyebrow="…"
  title="…"
  purpose="…"
  aside?: ReactNode  // actions / tracking
/>
```

Extract anatomy from `case-framework__hero-header`; rewrite timelines heroes to use it; thin-wrap case-framework to the shared component to avoid drift.

### 7. Timeline spine centering

Compute node `::before` with `left: calc(spineCenter - radius)` where spine is absolute at a CSS variable `--timeline-spine-x`. Markers and recall nodes share the same variable. Verify present/start/horizon.

### 8. Design system / docs touch

- Extend `tokens.css` if needed (`--drawer-width`, `--drawer-title-color`).
- Short note in `docs/ux-framework/02-components.md` or a delta comment in change only; prefer implementing primitives that match docs’ Drawer/Select catalog (`12-react-architecture.md`) without large doc rewrite unless required for archive.

## Risks / Trade-offs

- [Risk] 25vw too narrow for Markdown editors in RecallDrawer → Mitigation: clamp max 28rem; scroll body; editor can be denser.
- [Risk] Radix adds bundle → Mitigation: tree-shakeable; only Select.
- [Risk] Refactor all drawers regresses Esc/focus → Mitigation: keep backdrop + Esc; smoke each drawer.
- [Risk] Case-framework header extraction breaks tracking UI → Mitigation: `aside` slot preserves tracking/status triad.
- [Trade-off] Exact visual match to case-framework vs slightly simplified shared header → prefer shared component with optional `variant` denser/overview.

## Migration Plan

1. Add shared UI + tokens.
2. Add Radix Select + ResearchSelect styles.
3. Migrate drawers one feature at a time (Study → Timelines → Case Framework).
4. Introduce SessionCanvasHeader; migrate CF then Timelines.
5. Fix timeline spine math.
6. Remove obsolete drawer CSS widths; `tsc` + visual smoke.

## Open Questions

- None blocking: Radix Select is the default; swap to CSS-only listbox only if install/policy blocks the dep during apply.
