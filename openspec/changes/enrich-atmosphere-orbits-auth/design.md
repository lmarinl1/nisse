## Context

`ResearchNetworkAtmosphere` already runs as Canvas 2D behind Study Home (~5 rings, ~48 sparse nodes, edge max-distance ~0.38×min side, mixed CW/CCW speeds, radial core fade). Auth (`AuthScreen` login/register) is a centered content column on the default workspace background with no atmosphere. See `proposal.md` (Why) and delta specs for observable behavior.

Constraints: atmosphere ≠ noise; discovery tokens; `pointer-events: none`; `prefers-reduced-motion`; no new deps; auth form/brand remain the interaction focus.

## Goals / Non-Goals

**Goals:**

- Tune the shared orbital simulator toward denser rings, thinner strokes, shorter/more edges, extra-orbital nodes, and denser core emerge/fade — without losing bidirectional orbit or center fade.
- Mount the same component behind login and register with a readable content layer.
- Keep one implementation path (shared component), not a forked auth animation.

**Non-Goals:**

- WebGL / Three.js.
- Syncing nodes to real Study graph data or labeled institutional axes.
- Atmosphere inside Workspace Canvas or diagnostics.
- Redesigning auth copy, validation, or API.

## Decisions

### 1. Enrich the existing Canvas loop (params, not rewrite)

**Choice:** Keep `requestAnimationFrame` Canvas 2D; raise ring count (~8–10), lower ring/edge `lineWidth`, raise node/edge caps, tighten max edge distance (~0.18–0.24× min side), add a node cohort with `radius > outerRing` for extra-orbital points, and bias spawn/opacity toward small radii for denser core particles that pulse in/out.

**Why:** Specs ask for densification of the current motif; the loop already has CW/CCW and radial fade.

**Alternatives:** Second WebGL scene (rejected: cost/complexity); CSS-only orbits (cannot do short connect/disconnect well).

### 2. Core emerge/fade as soft particles, not new UI chrome

**Choice:** Represent denser center as many small nodes with low radius + alpha lifecycle (emerge → hold → fade), drawn under/with the orbital nodes; keep the existing radial gradient fade from center.

**Why:** Matches “puntos que emergen y se desvanecen más densos desde el centro” without inventing badges or overlays.

**Alternatives:** Only bump radial gradient alpha (too flat; loses particle feel).

### 3. Shared mount + optional layout/intensity prop

**Choice:** Reuse `ResearchNetworkAtmosphere` on auth. Add a light prop if needed, e.g. `layout?: 'study' | 'auth'` (or `fieldCenter` / intensity), so Study can keep asymmetric field (~0.62×) while auth centers the field behind the form. Prefer one density default (`medium` or enriched sparse) unless auth needs slightly lower alpha for form contrast.

**Why:** Specs require the same motif; centering on auth avoids an empty left void behind a narrow form.

**Alternatives:** Duplicate CSS background image of a static frame (rejected: loses shared live motif and reduced-motion path).

### 4. Auth shell structure

**Choice:** Wrap `AuthScreen` in a full-viewport relative shell: atmosphere absolute inset 0 / z-index 0; content column relative z-index 1 with optional light scrim under the form (token-based `color-mix`), not a heavy card. Preserve brand lockup + emerge motion on content.

**Why:** Matches Study Home stacking; keeps auth as laboratory entry, not marketing hero.

### 5. Accessibility & performance (unchanged contracts)

**Choice:** Keep reduced-motion static snapshot, visibility pause, ResizeObserver + DPR cap, node/edge caps raised carefully (target still under ~120 nodes / ~60 live edges unless profiling allows).

**Why:** Denser visuals must not become a battery sink or marketing strobe.

## Risks / Trade-offs

- **[Auth form contrast]** → Soft scrim under text column; lower edge alpha on auth layout if needed; verify inputs/focus rings.
- **[Visual noise / dashboard chart feel]** → Keep rings thin and faint; no labels; short edges only; avoid thick glow stacks.
- **[CPU with denser field]** → Cap counts; pause when hidden; profile on mid hardware before raising further.
- **[Study vs auth composition]** → Different field center via prop; same drawing code.

## Migration Plan

1. Tune atmosphere parameters + core particle lifecycle in `ResearchNetworkAtmosphere`.
2. Restructure auth shell CSS/JSX and mount atmosphere on login + register.
3. Visual QA: Study Home, login, register, reduced-motion, mobile width.
4. Rollback: revert auth mount and/or restore prior ring/edge constants.

## Open Questions

- Exact ring count (8 vs 10) and auth field centering vs slight offset: decide during visual polish without changing specs.
- Whether Study Home should switch default density from `sparse` to `medium` after densification lands: default keep Study mount prop unless sparse still looks thin post-tune.
