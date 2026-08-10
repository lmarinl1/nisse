## MODIFIED Requirements

### Requirement: Workspace shell for a Study
The frontend SHALL provide a Workspace route family for a Study that renders a persistent research-session Sidebar and a Canvas as the primary surface for the active session. For research sessions other than `case-framework` and `timelines`, the Canvas MAY remain an empty stage ready for future session-specific content. For `case-framework`, the Canvas MUST host the Case Framework overview or section instrument. For `timelines`, the Canvas MUST host the timelines overview or individual Timeline instrument. The shell MUST remain ready for future Cognitive Objects and Companion capabilities without requiring those capabilities in this change.

#### Scenario: Navigate to Workspace
- **WHEN** the user opens or creates a Study
- **THEN** the UI shows the Study Workspace on the default research session with the research Sidebar visible and a Canvas protagonist appropriate to that session

### Requirement: Study Workspace routes include research sessions
The frontend SHALL expose Study Workspace URLs of the form `/studies/:studyId/:session` for the defined research session ids, nested under authentication, plus Case Framework nested URLs `/studies/:studyId/case-framework` and `/studies/:studyId/case-framework/:section`, plus timelines nested URLs `/studies/:studyId/timelines` (overview) and `/studies/:studyId/timelines/:timelineId`. Selecting a session, Case Framework section, or Timeline MUST update the route and render the corresponding Canvas inside the Study Workspace shell (persistent research Sidebar + stage), without opening a modal or a new window. Legacy `/studies/:studyId/prior-knowledge` MUST redirect to `/studies/:studyId/timelines`.

#### Scenario: Session route renders Workspace shell
- **WHEN** an authenticated user opens `/studies/:studyId/scenarios`
- **THEN** the UI shows the Study Workspace shell with the research Sidebar and the Escenarios session Canvas

#### Scenario: Timeline route
- **WHEN** an authenticated user opens `/studies/:studyId/timelines/:timelineId`
- **THEN** the UI shows the Study Workspace shell with that Timeline's vertical Canvas

#### Scenario: Unauthenticated session URL denied
- **WHEN** an unauthenticated user requests a Study session URL
- **THEN** they are redirected to authentication before entering the Workspace
