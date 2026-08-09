## ADDED Requirements

### Requirement: Study Workspace routes include research sessions
The frontend SHALL expose Study Workspace URLs of the form `/studies/:studyId/:session` for the eight research session ids, nested under authentication. Selecting a session MUST update the route and render that session's Canvas inside the Study Workspace shell (persistent research Sidebar + stage), without opening a modal or a new window.

#### Scenario: Session route renders Workspace shell
- **WHEN** an authenticated user opens `/studies/:studyId/scenarios`
- **THEN** the UI shows the Study Workspace shell with the research Sidebar and the Escenarios session Canvas

#### Scenario: Unauthenticated session URL denied
- **WHEN** an unauthenticated user requests a Study session URL
- **THEN** they are redirected to authentication before entering the Workspace

## MODIFIED Requirements

### Requirement: Workspace shell for a Study
The frontend SHALL provide a Workspace route family for a Study that renders a persistent research-session Sidebar and an empty Canvas as the primary surface for the active session, ready for future Cognitive Objects and Companion capabilities without implementing session-specific research content yet.

#### Scenario: Navigate to Workspace
- **WHEN** the user opens or creates a Study
- **THEN** the UI shows the Study Workspace on the default research session with an empty Canvas as the protagonist and the research Sidebar visible
