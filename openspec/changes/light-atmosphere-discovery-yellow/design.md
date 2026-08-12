## Context

`ResearchNetworkAtmosphere` exploration mode (light) currently paints with `--color-brand-neon` (`#D7FF2F`). Primary actions such as **Nueva pregunta** use `.btn-discovery` → `var(--color-discovery-primary)` (light value `#c9a227`). See `proposal.md`. Specs in the prior change `light-mode-exploration-field` required brand neon for the light field; this change revises that accent contract.

## Goals / Non-Goals

**Goals:**

- Point exploration-field color read to `--color-discovery-primary`.
- Align UX docs that still say brand neon for the light field accent.

**Non-Goals:**

- Changing discovery token hex values, button styles, or brand-neon mark usage.
- Retuning particle physics beyond what’s needed for readable discovery yellow on cream (only if contrast after the swap is clearly worse—prefer token as-is first).

## Decisions

### 1. Token source

- **Choice:** `getComputedStyle(document.documentElement).getPropertyValue('--color-discovery-primary')` with fallback `#c9a227` (light) / keep orbital path on discovery as today.
- **Why:** Same semantic token as `.btn-discovery`; auto-tracks theme.
- **Alternatives:** Hardcode `#c9a227` (breaks if tokens change); keep neon (rejected by product ask).

### 2. Docs

- Replace “brand neon `#D7FF2F` as sole accent” for light exploration field with “discovery primary (CTA yellow)” in `01-visual-language.md` and `09-motion-language.md` where applicable.
- Clarify brand neon remains for telescope mark / marketing, not this atmosphere.

## Risks / Trade-offs

- **[Discovery on cream vs neon visibility]** → Discovery is deeper; should improve contrast on paper. If too muted, raise alpha slightly without changing hue.
- **[Spec archive order]** → If `light-mode-exploration-field` isn’t archived yet, both deltas touch the same requirement; archive/apply this after or reconcile at archive time.

## Migration Plan

1. Swap color read in exploration mode.
2. Update UX docs wording.
3. Visual check Auth + Study light next to Nueva pregunta.

## Open Questions

None.
