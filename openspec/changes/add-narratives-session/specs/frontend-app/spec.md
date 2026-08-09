## MODIFIED Requirements

### Requirement: Study Workspace routes include research sessions
The frontend SHALL expose Study Workspace URLs of the form `/studies/:studyId/:session` for the nine research session ids, nested under authentication. Selecting a session MUST update the route and render that session's Canvas inside the Study Workspace shell (persistent research Sidebar + stage), without opening a modal or a new window.

#### Scenario: Session route renders Workspace shell
- **WHEN** an authenticated user opens `/studies/:studyId/scenarios`
- **THEN** the UI shows the Study Workspace shell with the research Sidebar and the Escenarios session Canvas

#### Scenario: Unauthenticated session URL denied
- **WHEN** an unauthenticated user requests a Study session URL
- **THEN** they are redirected to authentication before entering the Workspace

#### Scenario: Narrativas session route
- **WHEN** an authenticated user opens `/studies/:studyId/narratives`
- **THEN** the UI shows the Study Workspace shell with the research Sidebar and the Narrativas session Canvas
