## ADDED Requirements

### Requirement: Neo4j service in local Compose stack
The repository `docker-compose.yml` SHALL include an official Neo4j service suitable for local development, with a named volume for data persistence, published ports needed by the driver/browser workflow, configurable credentials via environment variables, and network reachability from the Django development host. Developers MUST be able to run Neo4j without installing it on the host OS. Credentials MUST NOT be committed as production secrets. Developer-facing docs that describe Compose MUST mention this Neo4j service alongside MongoDB.

#### Scenario: Developer starts Neo4j via Compose
- **WHEN** a developer runs the project's documented Compose up flow from WSL
- **THEN** a Neo4j container starts with persisted volume data and is reachable using the documented local URI and credentials from `.env.example`

#### Scenario: Docs mention Neo4j in Compose
- **WHEN** a developer reads the documented Compose startup steps in the root README or AGENTS guide
- **THEN** Neo4j is listed as a service brought up with the same Compose flow as MongoDB

### Requirement: Monorepo purpose names both data stores
The project-structure purpose (and any root onboarding summary that restates it) SHALL describe NISSE as a Django REST API using MongoDB for documents and Neo4j for the derivation graph, plus a React (Vite + TypeScript) client, with OpenSpec as the source of truth for behavior changes.

#### Scenario: Purpose reflects dual store
- **WHEN** a developer reads the project-structure capability purpose in `openspec/specs/project-structure/spec.md`
- **THEN** both MongoDB and Neo4j are named as part of the data tier

## MODIFIED Requirements

### Requirement: Monorepo layout
The repository SHALL keep backend and frontend as sibling packages under a single git root, with shared planning artifacts in `openspec/`, UX Design Language under `docs/ux-framework/`, and developer architecture/onboarding docs under `docs/` (in addition to the root README). Local infrastructure for MongoDB and Neo4j SHALL be defined in `docker-compose.yml` at the repository root.

#### Scenario: Developer clones the repo
- **WHEN** a developer opens the repository root
- **THEN** they find `backend/`, `frontend/`, `openspec/`, `docs/`, and `docker-compose.yml`

#### Scenario: Developer locates technical docs
- **WHEN** a developer looks for architecture or dual-store onboarding material beyond the UX Design Language
- **THEN** they find it under `docs/` (linked from the root README) without requiring undocumented tribal knowledge
