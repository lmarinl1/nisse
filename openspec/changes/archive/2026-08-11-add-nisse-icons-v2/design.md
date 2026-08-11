## Context

See `proposal.md` — Why. Today icons live in `frontend/src/shared/icons` with SVG sources under `svg/`, React glyphs inlined in `registry.tsx`, thin wrappers in `named.tsx`, and a barrel `index.ts`. The Design Language catalog is `docs/ux-framework/10-iconography.md`. Brand identity is a separate layer (`public/brand` + `NisseMark`). Source pack: `C:\Users\lmari\Downloads\nisse-icons-v2` (34 SVG, no overlap with Set I names). Constraints: WSL-only tooling; no third-party icon libs; `currentColor` + tokens (not kit neon hardcoded).

## Goals / Non-Goals

**Goals:**
- Register all 34 Set II SVGs into the official pipeline without changing Icon primitive API shape.
- Document catalog + families + Cognitive Object / session mappings in the UX framework.
- Remap research-session (and documented cognitive) icons to more precise Set II glyphs where the metaphor improves.
- Keep brand mark assets untouched.

**Non-Goals:**
- Regenerating or replacing Set I SVG files that have no v2 counterpart.
- Changing session count, labels, or routes.
- Building an icon picker / gallery product surface.
- Syncing brand neon into UI icon strokes.

## Decisions

### 1. Copy SVGs then mirror paths into `registry.tsx` (same pattern as Set I)
**Choice:** Store editable sources in `frontend/src/shared/icons/svg/<name>.svg`; register path geometry as React fragments in `registry.tsx` (strip outer `<svg>`, keep children; `stroke-width` → handled by `Icon` wrapper). Export `*Icon` wrappers in `named.tsx` and barrel.
**Why:** Matches existing architecture; `Icon name="…"` stays the single primitive.
**Alternatives considered:** Import SVGs as React components via Vite plugin — rejected to avoid new dependency and divergent stroke handling; `<img src>` — rejected (breaks `currentColor` / a11y pattern).

### 2. Source of truth for import path during apply
**Choice:** Copy from `/mnt/c/Users/lmari/Downloads/nisse-icons-v2/*.svg` into `frontend/src/shared/icons/svg/` during implementation (WSL). Do not commit the Downloads folder; only repo copies.
**Why:** Pack lives outside the monorepo today.
**Alternatives:** Vendor the pack under `docs/` — unnecessary duplication.

### 3. Brand mark vs UI `telescope`
**Choice:** Add UI `telescope` as a catalog instrument. Never overwrite `public/brand` or `NisseMark` with that SVG.
**Why:** Proposal non-goal “menos el principal”; Design Language already separates layers.
**Alternatives:** Skip `telescope` entirely — rejected; pack includes it and monitoring/observation need it.

### 4. Session icon remapping (initial)
**Choice:** Update `researchSessions.ts` (and any identical documented mapping) as follows:

| Session id | From (proxy) | To (Set II / keep) |
|---|---|---|
| `case-framework` | `document` | keep `document` |
| `timelines` | `calendar` | `timeline-clock` |
| `evolution-forces` | `timeline` | `trajectory` |
| `critical-axes` | `decision` | `compass` |
| `scenarios` | `graph` | `orbit` |
| `narratives` | `candidates` | `constellation` |
| `validation` | `check` | keep `check` |
| `evaluation` | `filter` | `perspective` |
| `monitoring` | `eye` | `telescope` |

**Why:** Replaces weakest proxies with pack metaphors (time, futures, navigation, astronomy) without renaming sessions.
**Alternatives:** Keep all proxies and only add unused glyphs — rejected (user asked to update current icons to more dicente ones); replace Set I glyph files wholesale — N/A (no name collisions).

### 5. Docs update scope
**Choice:** Extend `10-iconography.md` catalog table + families + Cognitive Object map; bump version note; refresh `shared/icons/README.md` briefly. Touch `13-brand-mark.md` only if a one-line cross-ref clarifying UI `telescope` ≠ mark is needed.
**Why:** Framework is the human catalog; code README is the extend recipe.

### 6. Color / pack README divergence
**Choice:** Ignore pack README guidance that suggests hardcoding `#D7FF2F` in product; keep existing token rules.
**Why:** Already normative in Set I + `10-iconography.md` + brand/discovery split.

## Risks / Trade-offs

- [Registry drift vs SVG files] → Mitigation: same checklist as today (svg + registry + named + docs); apply tasks enforce all four.
- [Session icons change look without label change] → Mitigation: intentional; document mapping in design + framework; no route/API break.
- [Confusion between UI telescope and brand mark] → Mitigation: explicit non-goal, spec requirement, optional one-line in brand doc.
- [Large catalog growth] → Mitigation: kebab-case names already stable; no runtime cost beyond registry object size.

## Migration Plan

1. Copy SVGs → register → named exports.
2. Remap session icons.
3. Update UX framework + icons README.
4. Visual smoke: Workspace Sidebar + a few controls still render; brand lockup unchanged.
5. Rollback: revert change commit; no data migration.

## Open Questions

None deferred that would change specs or the remapping table above.
