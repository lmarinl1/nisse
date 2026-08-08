## Purpose

Nisse is a monorepo that delivers a Django REST API backed by MongoDB and a
React (Vite + TypeScript) client. OpenSpec is the source of truth for behavior
changes across both packages.

## Requirements

### Requirement: Monorepo layout
The repository SHALL keep backend and frontend as sibling packages under a
single git root, with shared planning artifacts in `openspec/`.

#### Scenario: Developer clones the repo
- **WHEN** a developer opens the repository root
- **THEN** they find `backend/`, `frontend/`, `openspec/`, and `docker-compose.yml`

### Requirement: Spec-driven changes
Non-trivial behavior changes SHALL be proposed, applied, and archived through
OpenSpec (`/opsx-propose`, `/opsx-apply`, `/opsx-archive`) so requirements stay
aligned with the codebase.

#### Scenario: New feature request
- **WHEN** a feature spans API and UI
- **THEN** a single OpenSpec change documents proposal, delta specs, design, and tasks for both packages
