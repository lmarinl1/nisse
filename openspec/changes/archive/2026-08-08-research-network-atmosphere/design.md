## Context

Study entry (`StudyHome` / library / Empty State) already uses dark workspace tokens and discovery yellow accents, but the background is a static gradient. See `proposal.md` (Why). Reference visual: dark field + lime/discovery nodes in orbital/plexus arrangement with soft connecting structure — **metaphor only**, not institutional labels.

Constraints: NISSE motion must explain thought (`docs/ux-framework/09`); atmosphere ≠ decoration; tokens from `06`; Canvas/research UI stays primary; no new backend.

## Goals / Non-Goals

**Goals:**

- Shared `ResearchNetworkAtmosphere` mountable behind any research shell.
- First mount: Study entry full-bleed behind content.
- Connect/disconnect edge lifecycle + subtle node drift; discovery color via CSS variables.
- Reduced-motion safe; pointer-events none; readable foreground.

**Non-Goals (design-level):**

- WebGL/Three.js unless 2D proves insufficient (default: Canvas 2D).
- Synchronizing nodes to real Study graph data.
- Auth page / Workspace Canvas adoption in this change (API of the component enables later reuse).

## Decisions

### 1. Canvas 2D particle/graph loop (no new deps)

**Choice:** `<canvas>` driven by `requestAnimationFrame`, nodes with positions on soft orbital rings + near-neighbor edges that fade in/out.

**Why:** Matches reference (concentric field + node cluster) with tiny bundle cost; easy opacity control for legibility.

**Alternatives:** Pure CSS (too rigid for connect/disconnect); SVG DOM edges (heavier reflow); Three.js (overkill).

### 2. Component API

```tsx
<ResearchNetworkAtmosphere
  className?: string
  density?: 'sparse' | 'medium'  // default sparse for library
  variant?: 'orbital'           // reserved for future variants
/>
```

Wrapper: `position: absolute; inset: 0; pointer-events: none; z-index: 0`. Parent `StudyHome` becomes `position: relative`; content `z-index: 1` with optional slight scrim if needed for contrast.

**Why:** Keeps atmosphere a reusable instrument (`shared/components` or `features/atmosphere`), not buried in Study CSS.

### 3. Visual language (tokens)

- Node/edge color: `var(--color-discovery-primary)` at low alpha (≈ 0.15–0.45).
- Background remains `--color-workspace-background` (canvas transparent).
- Faint orbital rings at very low alpha (structure without chart chrome).
- No labels on nodes in v1.

Motion tempo: slow (edge lifetime ~2–5s), ease in/out fades — contemplative, not marketing pulse (`09`).

### 4. Accessibility & performance

- `matchMedia('(prefers-reduced-motion: reduce)')` → draw static frame once (or hide animation loop).
- `ResizeObserver` on canvas; DPR-aware sizing.
- Cap nodes (~40–80) and edges; pause loop when document hidden (`document.visibilityState`).
- Optional: IntersectionObserver pause when off-screen.

### 5. Placement

Integrate only in `StudyHome` (covers library + empty). Do not place inside `StudyWorkspace` Canvas (that space is for future Cognitive Objects).

## Risks / Trade-offs

- **[Legibility]** → Keep opacities low; optional soft radial vignette behind text column; verify Empty State contrast.
- **[Battery / CPU]** → Cap particles; pause when hidden; reduced-motion static.
- **[Looks like decorative AI fluff]** → Sparse density; orbital rigor; copy/UI still research-first; no glowing marketing blobs.
- **[Color drift vs reference lime]** → Prefer token `--color-discovery-primary`; may nudge token slightly toward reference lime in a follow-up if product wants exact match (out of scope unless trivial).

## Migration Plan

1. Add component + styles.
2. Wire into `StudyHome`.
3. Visual QA (library, empty, reduced-motion, mobile).
4. Rollback = remove mount; component can remain unused.

## Open Questions

- Exact discovery hex vs reference lime (#DFFF00-ish): default keep current token; tune only if contrast/atmosphere feels dull after first implement.
- Whether Empty State should use denser center cluster than library: default same density; adjust in polish if needed.
