## Purpose

Defines what developer-facing documentation in the NISSE monorepo must cover so onboarding and coding agents match the real dual-store stack, Compose services, canvas libraries, and research-session modules.

## ADDED Requirements

### Requirement: Root README documents the dual-store stack
The repository root `README.md` SHALL describe the local development stack as Django + MongoDB + Neo4j + React (Vite + TypeScript), including that MongoDB is the document store and Neo4j is the graph store used by Derivaciones del tiempo. The README MUST document starting both Compose services, Neo4j ports suitable for driver and browser access, and the Neo4j environment variable names expected by the backend.

#### Scenario: Newcomer reads stack and Compose sections
- **WHEN** a developer opens the root `README.md` development section
- **THEN** they can identify MongoDB and Neo4j as required local services, find Compose up instructions that cover both, and locate Neo4j URI/user/password variable names without consulting source code

### Requirement: Agent guidelines match the documented stack
`AGENTS.md` and the always-applied engineering Cursor rule SHALL name Neo4j alongside MongoDB in the stack summary and SHALL instruct developers/agents to bring up the full Compose stack (not Mongo alone) for local work that depends on graph sessions.

#### Scenario: Agent reads stack guidance
- **WHEN** an agent or developer follows `AGENTS.md` or the engineering Cursor rule for local setup
- **THEN** the guidance mentions Neo4j as part of the stack and does not imply that MongoDB alone is the complete data tier

### Requirement: Architecture docs explain store boundaries and graph canvases
The repository SHALL publish technical documentation under `docs/` that explains (1) which research data lives in MongoDB versus Neo4j, (2) that the browser talks to Neo4j only through the Django API, and (3) that interactive derivation graphs on the frontend use React Flow (`@xyflow/react`) on the Derivaciones del tiempo canvas.

#### Scenario: Developer learns dual-store and canvas stack
- **WHEN** a developer opens the architecture/developer docs linked from the README
- **THEN** they can state the Mongo vs Neo4j boundary, that clients do not connect to Neo4j directly, and that React Flow powers the time-derivations graph canvas

### Requirement: Research session map is discoverable
Developer documentation SHALL list the Study Workspace research sessions (implemented and placeholder) with enough detail that a newcomer can map sidebar session ids to feature folders or known “not built yet” status, including at least case-framework, timelines, and time-derivations as implemented paths.

#### Scenario: Newcomer maps sessions to code
- **WHEN** a developer consults the research-session map in project docs
- **THEN** they can locate case-framework, timelines, and time-derivations and distinguish sessions that are still placeholders

### Requirement: UX React architecture doc reflects shipped features
`docs/ux-framework/12-react-architecture.md` SHALL list the real primary feature modules under `frontend/src/features/` relevant to the current product (including time-derivations and timelines) and SHALL treat React Flow as the adopted library for graph canvases rather than only an aspirational bullet.

#### Scenario: Architect checks React architecture doc
- **WHEN** a developer reads the React architecture Design Language page for feature layout guidance
- **THEN** the documented feature tree includes time-derivations / timelines (or equivalent current names) and React Flow is described as in use for derivation graphs
