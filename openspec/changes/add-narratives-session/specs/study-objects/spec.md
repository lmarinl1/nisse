## MODIFIED Requirements

### Requirement: Open Study Workspace with empty Canvas
Opening a Study SHALL enter its Workspace on a URL-addressable research session (default `case-framework` when no session is specified). A newly created Workspace SHALL present an empty Canvas for that session as structure for future capabilities. The Workspace MUST NOT yet implement Cognitive Objects, AI Companion content, scenarios content, journals, visualizations, or methodologies inside any session Canvas. The Workspace MUST present the persistent research-session Sidebar so the owner can move between the nine process stages without leaving the Objeto de Estudio.

#### Scenario: Open newly created Workspace
- **WHEN** the user opens a newly created Study
- **THEN** the Workspace shows the default research session with an empty Canvas as the primary research surface, without those deferred capabilities, and with the research Sidebar visible

#### Scenario: Canvas remains protagonist
- **WHEN** the user is inside a Study Workspace on any research session
- **THEN** the Canvas occupies the primary visual space consistent with the NISSE Workspace grammar while the Sidebar remains secondary structural navigation

#### Scenario: Session change keeps Study context
- **WHEN** the user navigates from one research session to another inside a Study
- **THEN** they remain in the same Objeto de Estudio with the Sidebar still present and a distinct empty Canvas for the newly selected session
