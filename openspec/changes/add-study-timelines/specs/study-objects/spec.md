## ADDED Requirements

### Requirement: Timeline artifacts belong to Study
Timelines, Recuerdos, Momentos, and collapses are research artifacts that MUST belong to exactly one Study Aggregate Root. The system MUST NOT allow orphan temporal artifacts outside a Study.

#### Scenario: Timeline created under Study
- **WHEN** a Timeline is first persisted for a Study
- **THEN** that content is scoped to that Study Aggregate Root and inaccessible as an orphan resource

### Requirement: Study creation materializes principal Timeline
Creating a Study SHALL also create its principal Timeline with the Study's name as the initial Timeline name. The Workspace MUST expose that Timeline under Líneas de tiempo without a separate manual bootstrap step.

#### Scenario: New Study has principal timeline
- **WHEN** the user successfully creates a Study
- **THEN** the principal Timeline exists and is available under `/studies/:studyId/timelines` and as the first active Sidebar subitem

## MODIFIED Requirements

### Requirement: Open Study Workspace with empty Canvas
Opening a Study SHALL enter its Workspace on a URL-addressable research session (default `case-framework` when no session is specified). For sessions other than `case-framework` and `timelines`, a newly entered session Canvas MAY remain empty as structure for future capabilities. For `case-framework`, the Workspace MUST present the Case Framework research instrument (overview by default) instead of an empty placeholder. For `timelines`, the Workspace MUST present the timelines research instrument (overview by default, or individual Timeline when addressed) instead of an empty placeholder. The Workspace MUST NOT yet implement AI Companion content, scenarios content, journals, visualizations, or methodologies inside non-instrument session Canvases. The Workspace MUST present the persistent research-session Sidebar so the owner can move between process stages without leaving the Objeto de Estudio.

#### Scenario: Open newly created Workspace
- **WHEN** the user opens a newly created Study
- **THEN** the Workspace shows the default research session with the research Sidebar visible; if the default is `case-framework`, the Case Framework overview instrument is shown; the principal Timeline already exists for later use under Líneas de tiempo

#### Scenario: Canvas remains protagonist
- **WHEN** the user is inside a Study Workspace on any research session
- **THEN** the Canvas occupies the primary visual space consistent with the NISSE Workspace grammar while the Sidebar remains secondary structural navigation

#### Scenario: Session change keeps Study context
- **WHEN** the user navigates from Líneas de tiempo to another research session inside a Study
- **THEN** they remain in the same Objeto de Estudio with the Sidebar still present and a distinct Canvas for the newly selected session
