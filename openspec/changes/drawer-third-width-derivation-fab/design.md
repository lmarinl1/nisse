## Context

See proposal.md — Why. Today `--drawer-width` is `clamp(18rem, 25vw, 28rem)` (~1/4). All feature drawers already wrap `ResearchDrawer` (`StudyCreateDrawer`, `TimelineDrawer`, `RecallDrawer`, collapse `ResearchDrawer`, `DerivationDrawer`, `StudyRootDrawer`). Derivations create CTA is in `SessionCanvasHeader` `aside` inside `DerivationsCanvas`.

## Goals / Non-Goals

**Goals:**
- Token + CSS: desktop drawer ≈ 1/3 viewport for every `ResearchDrawer`.
- Tighten internal spacing/sections in shared drawer CSS + light per-drawer form cleanup where densest (Recall, Derivation).
- Replace header add CTA with bottom-right FAB on Derivations Canvas.
- Sync Design Language under `docs/ux-framework/` so agents and humans read **≈ ⅓**, not ¼.

**Non-Goals:**
- Backend/API changes; new drawer primitive; FABs on other sessions; redesigning SessionCanvasHeader globally.
- Full rewrite of UX framework docs beyond Drawer width/layout contract alignment.

## Decisions

### 1. Width via design token

Update `--drawer-width` in `tokens.css` to approximately one third, e.g. `clamp(20rem, 33.333vw, 36rem)` (exact clamp tuned so ultra-wide does not become a wall and laptop stays ≥ usable min). Keep `research-drawer__panel { width: var(--drawer-width) }`. No per-feature width overrides.

**Alternatives:** hardcode 33vw only → rejected (breaks tiny/huge viewports). Per-drawer widths → rejected (breaks “100% drawers”).

### 2. Clean form layout in shared CSS first

Prefer shared rules in `research-drawer.css` + existing `FormField` rhythm: body grid gap, field label density, footer sticky/actions row, markdown editor not exploding vertical chrome. Then light touch on densest drawers (Recall, Derivation) — group optional blocks, avoid duplicate titles, keep one column.

**Alternatives:** rewrite every drawer JSX heavily → out of scope; token-only without form cleanup → insufficient for “interfaz limpia”.

### 3. Derivation FAB

Remove `aside` add button from `SessionCanvasHeader` in `DerivationsCanvas`. Add a floating button bottom-right over `.time-derivations__stage` (absolute/fixed within stage), discovery styling, `PlusIcon` + accessible name («Agregar derivación»). Keep React Flow Controls clear (offset from bottom-left controls / MiniMap). Empty-state hint text stays; no header CTA.

**Alternatives:** keep header + FAB → rejected (user: no header). SpeedDial menu → unnecessary for single action.

### 4. Mobile

Narrow viewports: drawer may go toward `100%` / full slide-over (existing behavior). FAB remains bottom-right with safe padding.

### 5. Design Language docs (`docs/ux-framework/`)

Update the official contract so it matches product:

- Primary: `02-components.md` § Drawer — change `≈ ¼` / `--drawer-width` wording to **≈ ⅓ del viewport**, note clean one-column form stack + footer actions, keep `ResearchDrawer` as the shared instrument.
- Sweep for contradictions: any remaining “quarter / ¼ / 25vw” drawer guidance in `03-patterns.md`, `05-workspace-grammar.md`, `06-design-tokens.md` (if it documents drawer width), `08-screen-recipes.md`.
- Do not invent a second drawer system in docs; keep Drawer-before-Modal and Canvas-visible rules.

**Alternatives:** code-only without docs → rejected (user: framework must carry the instruction for future agents).

## Risks / Trade-offs

- **[Risk] Ultra-wide 33vw too wide** → Mitigation: max clamp (~36rem).
- **[Risk] FAB overlaps MiniMap/Controls** → Mitigation: position bottom-right with margin; MiniMap stays default corner opposite or adjust.
- **[Trade-off] Parallel `time-derivations` delta with `add-time-derivations`** → Archive/merge carefully; this change only ADDs FAB requirements.

## Migration Plan

1. Update `docs/ux-framework/` Drawer contract to ≈ ⅓ (then code matches docs).
2. Ship token + CSS (all drawers pick up width).
3. Form cleanup pass.
4. FAB + remove header CTA.
5. Visual smoke across Study / Timelines / Derivaciones drawers.

## Open Questions

- Exact max clamp (36rem vs 40rem) — choose at implement time by eye on 1440/1920.
