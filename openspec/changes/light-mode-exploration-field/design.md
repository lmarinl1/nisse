## Context

`ResearchNetworkAtmosphere` today is a single **orbital** canvas: rings, orbiting nodes, core/nucleus particles (“yellow cloud”), short-lived edges—tuned for dark entry (Auth + StudyHome). Light mode (`data-theme="light"`) reuses that metaphor and breaks the observatory-at-night reading. Theme resolution already exists via `ThemeProvider` / `data-theme`. See `proposal.md` for motivation; delta specs under `specs/` for contracts. Existing main requirements in `openspec/specs/research-network-atmosphere/spec.md` assume dark orbital presence (~60% field, discovery yellow).

## Goals / Non-Goals

**Goals:**

- Theme-aware atmosphere: dark → keep orbital; light → exploration field.
- Light field: sparse `#D7FF2F` particles, incomplete ephemeral graphs, subtle cursor affinity, reduced-motion safe.
- Update UX framework (visual + motion) with dual metaphors and the exploration product line.

**Non-Goals:**

- Redesigning dark orbital art direction.
- Interactive graph tool, physics playground, or WebGL rewrite unless canvas 2D proves insufficient (prefer extending current canvas approach).
- Changing Settings theme UX or token tables beyond atmosphere accent usage.

## Decisions

### 1. Variant selection from resolved theme

- **Choice:** Inside `ResearchNetworkAtmosphere`, read `data-theme` on `document.documentElement` (MutationObserver or `useTheme().resolved` if available without coupling auth-only trees). Prefer `useTheme()` on authenticated Study entry; on Auth (also under `ThemeProvider` in AppRouter) use the same hook. Fallback: observe `data-theme`.
- **Why:** Single source of truth already drives CSS tokens; atmosphere must track it for metaphor, not only colors.
- **Alternatives:** CSS-only swap (cannot swap simulation logic); prop from parents (duplication).

### 2. One component, two simulation modes

- **Choice:** Extend the existing canvas component with `mode: 'orbital' | 'exploration'` (internal). Shared resize, DPR, reduced-motion gate, color parsing from tokens (`--color-brand-neon` for light accents; discovery tokens for dark as today).
- **Why:** Same mount API (`density`, `layout`); Auth/StudyHome stay thin.
- **Alternatives:** Separate `ExplorationFieldAtmosphere` (more files, duplicated plumbing).

### 3. Exploration-field simulation (light)

- **Particles:** Low count (well below orbital totals), soft opacity pulse (appear/disappear), positions in a loose scatter (Poisson-like or jittered grid)—not rings.
- **Edges:** Cap concurrent edges low; prefer local neighbors; lifecycle grow → hold briefly → fade; occasional 1-hop branch (A–B then B–C) that dissolves; never attempt global connectivity.
- **Cursor:** Track pointer in atmosphere host coordinates (window or container `pointermove` with `pointer-events: none` on canvas + listen on parent/`window`). Influence radius small; nearby nodes drift slightly toward cursor / brighten; spawn short-lived edge if local pair within threshold (rate-limited).
- **Accent:** Stroke/fill from `--color-brand-neon` (`#D7FF2F`); no multi-color palette; glow via low alpha only (no large shadowBlur).
- **Metaphor check:** If it reads as “stars in space,” reduce orbit-like motion and nucleus; prefer drift + fade.

### 4. Dark path unchanged

- **Choice:** Keep current orbital constants/behavior when `mode === 'orbital'`. Do not retune dark intensity in this change unless a shared refactor forces a no-op extract.
- **Why:** Scope control; dark already matches observatory metaphor.

### 5. Docs

- **`01-visual-language.md`:** Section under Atmósfera / modos — dual entry atmospheres; metaphor quote; accent rule for light field.
- **`09-motion-language.md`:** Entry atmosphere motion: emerge/dissolve relations; cursor affinity; reduced-motion.
- Optional one-liner in `12-react-architecture.md` under `atmosphere/` if it helps discoverability (keep short).

### 6. Accessibility

- Keep `aria-hidden` on atmosphere wrappers.
- `prefers-reduced-motion: reduce` → static sparse particles / frozen incomplete edges (both modes), no continuous connect loop, no cursor-driven spawning storms.

## Risks / Trade-offs

- **[Cursor listeners vs scroll/performance]** → Throttle pointer updates; disable affinity when reduced-motion; pause when tab hidden (`document.visibilityState`).
- **[Light field too loud / too faint]** → Tune opacity caps against warm paper; QA on Auth + Study at desktop/mobile.
- **[Coupling to ThemeProvider]** → Auth already under ThemeProvider; document fallback to `data-theme` if hook unavailable in tests.
- **[Spec tension with “stronger discovery presence”]** → Delta MODIFIED clarifies dark vs light presence budgets.

## Migration Plan

1. Implement exploration mode behind theme detection; default dark path identical.
2. Update docs.
3. Manual QA Auth/Study light & dark + reduced-motion + theme toggle.
4. Rollback: force `orbital` only if needed (feature flag unnecessary if theme gate is clear).

## Open Questions

None blocking. Exact particle/edge budgets can be tuned during apply within “sparse, incomplete, no nucleus” constraints.
