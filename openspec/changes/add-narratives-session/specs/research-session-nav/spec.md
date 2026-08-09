## RENAMED Requirements

- FROM: `### Requirement: Eight ordered research sessions`
- TO: `### Requirement: Nine ordered research sessions`

## MODIFIED Requirements

### Requirement: Nine ordered research sessions
The Sidebar SHALL list exactly nine research sessions in this order, with Spanish product labels: (1) Marco del objeto de estudio, (2) Conocimiento previo, (3) Fuerzas de evolución, (4) Ejes críticos, (5) Escenarios, (6) Narrativas, (7) Validación, (8) Evaluación, (9) Monitoreo. Each item MUST show a semantically related icon from the official NISSE icon catalog.

#### Scenario: Ordered session list
- **WHEN** an authenticated user is inside a Study Workspace
- **THEN** the Sidebar shows those nine items in that order, each with an icon, with Narrativas immediately after Escenarios and before Validación

### Requirement: URL-addressable sessions
Each research session SHALL be addressable by a stable semantic session segment under the existing Study route convention `/studies/:studyId/:session`. Session ids MUST be: `case-framework`, `prior-knowledge`, `evolution-forces`, `critical-axes`, `scenarios`, `narratives`, `validation`, `evaluation`, `monitoring`. Navigation MUST update the browser URL so history, reload, and shared links restore the same session. Session selection MUST NOT rely only on ephemeral React state.

#### Scenario: Navigate to a session URL
- **WHEN** the user selects "Escenarios" in the Sidebar
- **THEN** the browser location becomes `/studies/:studyId/scenarios` and that session's Workspace surface is shown

#### Scenario: Browser history between sessions
- **WHEN** the user navigates from one session to another and then uses the browser back control
- **THEN** the previous session URL and its Canvas surface are restored while the Sidebar remains visible

#### Scenario: Reload preserves session
- **WHEN** the user reloads a session URL such as `/studies/:studyId/validation`
- **THEN** the Workspace opens that Study on the Validación session with the Sidebar marking Validación as active

#### Scenario: Deep link to a session
- **WHEN** an authenticated owner opens a copied URL `/studies/:studyId/prior-knowledge`
- **THEN** they land on Conocimiento previo for that Study without first visiting another session

#### Scenario: Navigate to Narrativas
- **WHEN** the user selects "Narrativas" in the Sidebar
- **THEN** the browser location becomes `/studies/:studyId/narratives` and that session's Workspace surface is shown

### Requirement: Invalid session segment handling
When the session segment is not one of the nine defined ids, the system SHALL recover without leaving the Study by directing the user to the default session `case-framework`.

#### Scenario: Unknown session recovers to default
- **WHEN** an authenticated owner opens `/studies/:studyId/not-a-session`
- **THEN** the client resolves to `/studies/:studyId/case-framework` within the same Study Workspace
