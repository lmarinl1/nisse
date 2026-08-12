## Why

Developer-facing docs (`README.md`, `AGENTS.md`, Cursor rules, and `docs/`) still describe a Mongo-only stack. The product already runs **Neo4j** (graph for Derivaciones del tiempo), **React Flow** (`@xyflow/react`), dual-store APIs, and several research sessions that newcomers cannot discover from the README. Docs must catch up so onboarding and agents match the real laboratory.

## What Changes

- Refresh **README.md**: stack table, repo tree, Compose (Mongo + Neo4j), env vars, dual-store note, React Flow canvases, feature map, links to new technical docs.
- Refresh **AGENTS.md** and **`.cursor/rules/nisse-practices.mdc`** stack/onboarding snippets so agents do not assume Mongo-only.
- Add **technical docs** under `docs/` (architecture + developer guides): Neo4j role, Mongo vs Neo4j boundaries, React Flow usage, research-session map, Compose/ports.
- Align **`docs/ux-framework/12-react-architecture.md`** (and index) with real `features/` modules and `@xyflow/react` as the graph canvas stack—not aspirational-only lists.
- Update OpenSpec **`project-structure`** purpose/requirements so the monorepo contract names Neo4j and accurate developer docs.
- Introduce **`project-docs`** capability: what onboarding docs MUST cover going forward.

## Non-goals

- No product code, API, schema, or UI behavior changes.
- No archiving of unrelated open changes; no rewriting of the full UX Design Language beyond architecture alignment.
- No production Neo4j/Mongo hardening guides; local WSL + Compose only.
- No replacing OpenSpec deltas with prose docs (specs remain source of truth for behavior).

## Capabilities

### New Capabilities

- `project-docs`: Developer-facing documentation surface (README, AGENTS, `docs/` architecture/dev guides, condensed Cursor stack notes) must accurately describe the dual-store stack, Compose services, React Flow canvases, and research-session modules.

### Modified Capabilities

- `project-structure`: Monorepo purpose and layout requirements MUST reflect MongoDB + Neo4j (Compose) and point developers at accurate stack documentation (not Mongo-only).

## Impact

- **Docs / agent guidance only**: `README.md`, `AGENTS.md`, `.cursor/rules/nisse-practices.mdc`, new files under `docs/` (e.g. architecture), light updates to `docs/ux-framework/12-react-architecture.md` (+ README index if needed).
- **OpenSpec**: delta specs for `project-docs` and `project-structure`.
- **No** backend/frontend runtime impact; no new npm/pip dependencies.
- Touches: engineering documentation + agent rules (not Workspace UI / Cognitive Objects).
