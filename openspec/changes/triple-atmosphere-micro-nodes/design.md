## Context

`ResearchNetworkAtmosphere` (post `enrich-atmosphere-orbits-auth`) already has ~9 thin orbits, short edges, extra-orbital nodes, core emerge/fade, and Study/auth layouts. Current sparse caps are roughly orbital 72 + extra 14 + core 28 with max edges 42, and node sizes ~1.4–3.8px. See `proposal.md` (Why).

Constraints: Canvas 2D only; no new deps; keep reduced-motion, pause-on-hidden, discovery tokens, non-interactive.

## Goals / Non-Goals

**Goals:**

- Apply the explicit triad: ×3 node/particle counts, ÷3 draw sizes, ×3 concurrent edge cap (and spawn rate enough to fill it).
- Increase central density bias (more core particles and/or tighter radial spawn).

**Non-Goals:**

- Changing ring count, auth shell, or field scale/center props.
- Exact pixel-perfect parity with a reference still; visual QA is the acceptance bar.

## Decisions

### 1. Scale counts and sizes via constants (no architecture change)

**Choice:** Multiply `nodeCount`, `extraOrbitalCount`, `coreParticleCount`, and `maxEdgeCount` by ~3; divide node/extra/core `size` ranges by ~3; raise edge spawn probability so the higher edge cap is actually reached.

**Why:** Specs are quantitative relative to current; the draw loop already supports the cohorts.

**Alternatives:** New density preset only (rejected: user asked for global motif densification on the current atmospheres).

### 2. Center density via core cohort + radial bias

**Choice:** Give the core particle pool a larger share of the ×3 increase (and optionally bias more orbital nodes onto inner rings) so the nucleus densifies more than the rim.

**Why:** Matches “más densas en el centro” without filling the whole viewport equally.

### 3. Performance guardrails

**Choice:** Keep pause when hidden and reduced-motion static; accept totals still in the low hundreds of points (e.g. sparse ~×3 of ~114 ≈ ~340) with ~126 concurrent edges — within prior design comfort if stroke stays thin and sizes tiny. If frame cost spikes, prefer lowering spawn rate slightly over undoing the ×3 caps.

**Why:** Contemplative tempo matters more than maxing every frame’s edge creations.

## Risks / Trade-offs

- **[CPU / battery]** → Cap still finite; pause when hidden; thin strokes; tiny fills.
- **[Visual mud / noise]** → Smaller sizes + short edges only; keep ring alpha low.
- **[Auth legibility]** → Existing vignette/scrim; edge alpha for auth layout already slightly lower.

## Migration Plan

1. Update counts/sizes/spawn in `ResearchNetworkAtmosphere.tsx`.
2. Visual QA Study + login/register + reduced-motion.
3. Rollback = restore prior constants.

## Open Questions

- Whether `medium` density remains a distinct step after the global ×3, or collapses visually into sparse: keep the ratio between sparse/medium unless QA says otherwise.
