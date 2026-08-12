## 1. Architecture docs (`docs/architecture/`)

- [x] 1.1 Create `docs/architecture/README.md` index linking dual-store, Neo4j/Compose, React Flow canvases, and research-session map
- [x] 1.2 Write dual-store overview (Mongo documents vs Neo4j derivation graph; browser → Django only; point to OpenSpec for behavior)
- [x] 1.3 Write Neo4j / Compose guide (ports 7474/7687, `NEO4J_*` from `.env.example`, `docker-compose up -d` from WSL, Browser URL note)
- [x] 1.4 Write React Flow canvases note (`@xyflow/react`, `features/time-derivations`, theming/Controls; not a tutorial)
- [x] 1.5 Write research-session map from `researchSessions.ts` (implemented vs placeholder; feature folder pointers)

## 2. Root onboarding surfaces

- [x] 2.1 Update README Estructura + Stack table (Mongo + Neo4j + React Flow / `@xyflow/react`)
- [x] 2.2 Update README Arranque: Compose brings up mongo+neo4j; document Neo4j env vars and ports; link `docs/architecture/`
- [x] 2.3 Add short README sections for data architecture and research sessions (links, not full prose)
- [x] 2.4 Update `AGENTS.md` stack table, Compose comment, and commands so Neo4j is not omitted
- [x] 2.5 Update `.cursor/rules/nisse-practices.mdc` Stack line to include Neo4j + full Compose

## 3. UX framework alignment

- [x] 3.1 Update `docs/ux-framework/12-react-architecture.md` feature tree to real modules; mark React Flow as adopted for Derivaciones; clarify which listed libs are not yet in `package.json`
- [x] 3.2 Update `docs/ux-framework/README.md` index blurb if the architecture page description needs to mention graph canvases

## 4. OpenSpec main purpose + verify

- [x] 4.1 Update `openspec/specs/project-structure/spec.md` Purpose to name MongoDB + Neo4j dual store (apply-time Purpose edit)
- [x] 4.2 Cross-check README/AGENTS/`docs/architecture` against `docker-compose.yml` and `backend/.env.example` for ports and variable names
- [x] 4.3 Run `openspec validate update-docs-stack-and-readme --strict` from WSL and fix any doc/spec issues found
