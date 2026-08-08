## Context

`ResearchNetworkAtmosphere` is mounted on `StudyHome` but alphas (~0.06–0.45) and orbital scale (~0.42 × min(width,height)) plus a strong left vignette make it hard to see. See `proposal.md` (Why). Keep UX rules: atmosphere ≠ noise; tokens; reduced-motion; responsive.

## Goals / Non-Goals

**Goals:**

- Visibly stronger discovery yellow (nodes/edges/rings/nebula).
- Orbital field ≈ **60%** of viewport (dominant background mass, typically right/center).
- Lighter vignette so yellow shows through while text on the left stays readable.
- Preserve ResizeObserver/DPR responsive behavior.

**Non-Goals:**

- New dependencies.
- Changing Study layout/copy.
- Exact pixel-perfect match to external brand lime unless a local draw color boost is enough.

## Decisions

### 1. Boost draw alphas + optional local brighten

**Choice:** Raise stroke/fill alphas (e.g. rings ~0.12–0.18, edges peak ~0.55–0.7, nodes ~0.45–0.85, nebula ~0.12–0.18). Optionally mix discovery toward a slightly brighter lime **only inside the canvas draw** if token alone still feels muddy.

**Why:** Presence without forcing a global token change that would yell on buttons.

**Alternatives:** Only change CSS variable globally (risk: all CTAs become neon).

### 2. Scale orbital field to ~60% viewport

**Choice:** Increase radius scale from ~0.42×min(side) to ~0.55–0.62×min(side), and bias center so the field covers ~60% of the screen (keep content-friendly left bias: center around ~58–65% X).

**Why:** Matches “más grande / 60% detrás de los elementos” while content column stays readable via vignette.

### 3. Soften StudyHome vignette

**Choice:** Reduce left scrim strength (lower workspace mix %) so atmosphere is not crushed; keep a light reading aid under the text column.

**Why:** Current vignette is a major reason it looks “muy opaco”.

### 4. Keep responsive path

No change to ResizeObserver/DPR contract; only constants and vignette CSS.

## Risks / Trade-offs

- **[Text contrast]** → Tune vignette iteratively; prefer opacity boost over full-screen neon.
- **[Looks marketing]** → Cap edge thickness; keep slow connect/disconnect; no strobe.
- **[Conflict with unarchived research-network-atmosphere change]** → This change only tunes presence; archive order should merge delta requirements additively.

## Migration Plan

1. Adjust canvas constants (+ optional draw brighten).
2. Soften vignette CSS.
3. Visual QA: library, empty, mobile, reduced-motion.
4. Rollback = revert alphas/scale/vignette.

## Open Questions

- Prefer brighter **draw mix** vs nudging `--color-discovery-primary` slightly: default draw-local boost first.
