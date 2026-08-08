## Purpose

The frontend is a React + TypeScript SPA that consumes the Django API.

## Requirements

### Requirement: Health status display
The application SHALL retain the ability to verify backend readiness via `GET /api/health/`, but the primary authenticated experience MUST be the Objeto de Estudio library / Empty State / Workspace flow—not a health-status home screen framed as the product.

#### Scenario: Backend available
- **WHEN** a client calls the health endpoint successfully (for example from a diagnostic surface or during development checks)
- **THEN** the response fields status, service, and api_version remain available to the UI layer

#### Scenario: Backend unavailable
- **WHEN** the health request fails during a diagnostic check
- **THEN** the UI can show a clear error guiding the developer to start MongoDB and the Django server

### Requirement: Configurable API base URL
The frontend SHALL read the API base URL from `VITE_API_BASE_URL`.

#### Scenario: Default local URL
- **WHEN** `VITE_API_BASE_URL` is `http://127.0.0.1:8000/api`
- **THEN** health requests go to `http://127.0.0.1:8000/api/health/`

### Requirement: Authenticated research entry
After authentication, the frontend SHALL route the user into the Objeto de Estudio library (or Empty State) as the Speculative Research Workspace entry, not into a generic dashboard of unrelated widgets.

#### Scenario: Authenticated landing
- **WHEN** an authenticated user opens the application entry route
- **THEN** they land on the Study library or Empty State for Objetos de Estudio

### Requirement: Workspace shell for a Study
The frontend SHALL provide a Workspace route for a Study that renders an empty Canvas as the primary surface, ready for future Cognitive Objects and Companion capabilities without implementing them yet.

#### Scenario: Navigate to Workspace
- **WHEN** the user opens or creates a Study
- **THEN** the UI shows the Study Workspace with an empty Canvas as the protagonist

### Requirement: Study entry uses research network atmosphere
The authenticated Objeto de Estudio entry (library or Empty State) SHALL present the shared research network atmosphere behind its content, keeping interaction focused on creating or opening Studies.

#### Scenario: Atmosphere behind study entry
- **WHEN** an authenticated user lands on the Study entry route
- **THEN** the research network atmosphere appears as a background layer while Study UI controls remain usable in the foreground

### Requirement: Study entry atmosphere has strong presence
The Objeto de Estudio entry (library or Empty State) SHALL present the research network atmosphere with clearly visible discovery intensity and a field that occupies roughly sixty percent of the viewport behind content, while keeping Study interactions usable in the foreground.

#### Scenario: Strong atmosphere behind study entry
- **WHEN** an authenticated user lands on the Study entry route
- **THEN** a clearly perceptible yellow network field fills a large portion of the background (~60% visual presence) without blocking Study UI controls
