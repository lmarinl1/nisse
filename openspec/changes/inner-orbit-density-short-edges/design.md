## Context

Post `triple-atmosphere-micro-nodes`, the Canvas loop uses `RING_STEP = 0.085`, nine rings, micro-sized nodes, and `EDGE_MAX_DIST = 0.22` (screen fraction of min side)—longer than one orbit step. Orbital nodes are ring-biased but not explicitly ×5 on rings 1–2. See `proposal.md` (Why).

## Goals / Non-Goals

**Goals:**

- Allocate ~×5 nodes to rings 1 and 2 vs their current share.
- Cap edge length at one inter-orbit spacing (`scale * RING_STEP`, accounting for the 0.92 ellipse factor if needed).
- Slightly bump core / inner density.

**Non-Goals:**

- Global ×N of all rings; size triad changes; auth shell changes.

## Decisions

### 1. Explicit inner-orbit cohorts

**Choice:** When building orbital nodes, reserve dedicated counts for ring 1 and ring 2 equal to ~5× their fair share under the previous uniform/biased distribution (or spawn additional nodes locked to `ringRadius(1|2)`), and keep remaining nodes on rings 3–9.

**Why:** Specs require ×5 on the first two orbits specifically, not only a soft radial bias.

**Alternatives:** Only stronger `Math.pow` bias (rejected: not reliably ×5).

### 2. Edge max = orbit step in field space

**Choice:** Replace the loose `EDGE_MAX_DIST` screen fraction with a cap derived from `RING_STEP`: max pixel length ≈ `fieldScale * RING_STEP` (optionally `* 0.92` for the vertical ellipse). Reject candidates beyond that.

**Why:** Matches “nunca superen la distancia entre 2 órbitas” in the same geometry as the drawn rings.

### 3. Mild core bump

**Choice:** Small increase to `coreParticleCount` and/or tighter core radius distribution—enough to feel “un poco más” dense, not another global triad.

## Risks / Trade-offs

- **[Inner rings look solid/noisy]** → Keep micro sizes; short edges only; don’t raise stroke weight.
- **[Fewer long spokes feel emptier mid-field]** → Acceptable; local plexus is the goal.
- **[CPU with more inner nodes]** → Cap still finite; pause when hidden.

## Migration Plan

1. Adjust node allocation + edge distance check in `ResearchNetworkAtmosphere.tsx`.
2. Visual QA Study + auth + reduced-motion.
3. Rollback = prior allocation and `EDGE_MAX_DIST`.

## Open Questions

- Exact ×5 baseline: fair share of current orbital pool on rings 1–2 vs absolute headcount—prefer measuring current expected share under the existing bias and multiplying that; record chosen numbers in the PR/commit if helpful.
