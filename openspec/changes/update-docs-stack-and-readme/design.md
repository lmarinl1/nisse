## Context

See proposal.md — Why. Code already ships Neo4j (`docker-compose.yml`, `backend/core/neo4j_client.py`, derivations graph API) and React Flow (`@xyflow/react` in `features/time-derivations`). Root README, AGENTS.md, and `nisse-practices.mdc` still read Mongo-only; `docs/` only contains `ux-framework/`. Main OpenSpec `project-structure` purpose still says Mongo-backed only (Neo4j Compose requirement lives in unarchived `add-time-derivations` delta).

Constraints: docs-only change; WSL bash commands only; Spanish product copy / English identifiers; do not invent product behavior; keep UX philosophy sections of README intact where still accurate.

## Goals / Non-Goals

**Goals:**
- Single coherent onboarding path: README → AGENTS/rules → `docs/` architecture → UX framework.
- Accurate dual-store + React Flow + research-session map for humans and agents.
- Fold Neo4j Compose into main `project-structure` purpose/requirements via this change’s apply + archive path.

**Non-Goals:**
- Implementing missing research sessions; rewriting all OpenSpec feature specs; production ops runbooks; translating the entire UX framework.

## Decisions

1. **New `docs/architecture/` (or `docs/dev/`) folder for technical onboarding**
   - **Choice:** Add `docs/architecture/` with focused markdown pages (overview dual-store, Neo4j/Compose, React Flow canvases, research-session map) plus a short `docs/architecture/README.md` index linked from root README.
   - **Alternatives:** Stuff everything into root README → rejected (too long; agents need citable `@` paths). Put under `docs/ux-framework/` → rejected (engineering ≠ Design Language).
   - **Rationale:** Matches existing `docs/ux-framework/` pattern without diluting UX docs.

2. **Keep philosophy-heavy README; expand “Desarrollo técnico” + structure**
   - **Choice:** Preserve NISSE philosophy sections; update Estructura, Stack, Arranque (Compose = mongo+neo4j), add short “Arquitectura de datos” and “Sesiones de investigación” with links into `docs/architecture/`.
   - **Alternatives:** Replace README with pure tech README → rejected (product identity is intentional).

3. **Sync three agent surfaces, don’t duplicate long prose**
   - **Choice:** README = human onboarding; AGENTS.md = short commands + stack table; `nisse-practices.mdc` = one-line stack including Neo4j; deep detail only in `docs/architecture/`.
   - **Alternatives:** Copy full architecture into each rule → rejected (drift).

4. **Update `12-react-architecture.md` surgically**
   - **Choice:** Refresh feature tree to real modules (`identity`, `study`, `workspace`, `case-framework`, `timelines`, `time-derivations`, `atmosphere`, …); mark React Flow as adopted for Derivaciones; note aspirational libs (Zustand, TanStack, etc.) only if still desired—do not claim they are installed if `package.json` lacks them.
   - **Alternatives:** Full rewrite of architecture doc → deferred.

5. **Edit main `project-structure` Purpose during apply**
   - Spec instruction: Purpose changes belong on `openspec/specs/project-structure/spec.md` directly. Apply tasks MUST update that Purpose to name Mongo + Neo4j when implementing the delta.

6. **Document current ports and defaults from Compose / `.env.example`**
   - Mongo `27017`; Neo4j `7474` (HTTP/Browser), `7687` (Bolt); defaults from `backend/.env.example` only as documented examples (not production secrets).

## Risks / Trade-offs

- **[Risk] Docs drift again as features land** → Mitigation: `project-docs` requirements + checklist task to update architecture map when adding sessions/stores.
- **[Risk] Duplicating OpenSpec behavior prose** → Mitigation: architecture docs describe topology and “where code lives”; point to `openspec/specs/` / changes for normative behavior.
- **[Risk] Unarchived `add-time-derivations` also ADDs Neo4j Compose** → Mitigation: this change’s ADDED requirement is compatible; archive order may merge duplicates—keep wording aligned; do not block docs on other archives.
- **[Trade-off] Incomplete session implementations listed as placeholders** → Acceptable; clearer than omitting them.

## Migration Plan

1. Write architecture pages + update README/AGENTS/rules/UX architecture doc.
2. Update `openspec/specs/project-structure/spec.md` Purpose during apply.
3. No runtime deploy; rollback = revert doc commits.

## Open Questions

- Exact filename split under `docs/architecture/` (single overview vs 3–4 pages) can be chosen at apply time without changing requirements, as long as README links cover dual-store, Neo4j/Compose, React Flow, and session map.
