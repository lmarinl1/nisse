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
The frontend SHALL provide a Workspace route family for a Study that renders a persistent research-session Sidebar and an empty Canvas as the primary surface for the active session, ready for future Cognitive Objects and Companion capabilities without implementing session-specific research content yet.

#### Scenario: Navigate to Workspace
- **WHEN** the user opens or creates a Study
- **THEN** the UI shows the Study Workspace on the default research session with an empty Canvas as the protagonist and the research Sidebar visible

### Requirement: Study Workspace routes include research sessions
The frontend SHALL expose Study Workspace URLs of the form `/studies/:studyId/:session` for the eight research session ids, nested under authentication. Selecting a session MUST update the route and render that session's Canvas inside the Study Workspace shell (persistent research Sidebar + stage), without opening a modal or a new window.

#### Scenario: Session route renders Workspace shell
- **WHEN** an authenticated user opens `/studies/:studyId/scenarios`
- **THEN** the UI shows the Study Workspace shell with the research Sidebar and the Escenarios session Canvas

#### Scenario: Unauthenticated session URL denied
- **WHEN** an unauthenticated user requests a Study session URL
- **THEN** they are redirected to authentication before entering the Workspace

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

### Requirement: Workspace shell is usable on mobile viewports
The Study Workspace shell (rail panels, session Canvas stage, and Companion) SHALL adapt on mobile-width viewports so the research Canvas remains the primary surface, side chrome stacks without solid edge-filled columns, and Companion remains reachable after the stage. Framing (border + radius on background) MUST be preserved. The system MUST NOT require a desktop width to navigate sessions or return to Campo.

#### Scenario: Mobile shell stacking
- **WHEN** an authenticated user opens a Study Workspace at a mobile-width viewport
- **THEN** rail content, Canvas, and Companion stack in a usable order with framed surfaces and working session navigation
