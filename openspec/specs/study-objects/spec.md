## Purpose

Defines the Study aggregate as the long-lived Objeto de Estudio that owns every future research artifact, and the Speculative Research Workspace entry experience around listing, creating, editing, archiving, and opening Studies.

## Requirements

### Requirement: Study is the research Aggregate Root
The system SHALL model the domain entity as `Study`. Every future research artifact (Cognitive Objects, scenarios, journals, agents, sources, methodologies, and related capabilities) MUST belong to exactly one Study. The system MUST NOT allow orphan research artifacts outside a Study.

#### Scenario: Study identified as container
- **WHEN** a Study is created
- **THEN** it becomes the Aggregate Root under which subsequent research artifacts for that investigation will be scoped

### Requirement: Product naming is Objeto de Estudio
User-facing copy SHALL refer to a Study as **Objeto de Estudio**. The system MUST NOT use the term "Project" in product UI copy for this concept.

#### Scenario: Library labels
- **WHEN** the authenticated user views the Study library or Empty State
- **THEN** visible labels use "Objeto de Estudio" (or plural equivalent) and do not say "Project"

### Requirement: Owner-scoped Study access
The system SHALL allow a user to access only Studies they own. Requests for Studies owned by another user MUST be denied.

#### Scenario: List own Studies
- **WHEN** an authenticated user lists Studies
- **THEN** the response includes only Studies owned by that user

#### Scenario: Foreign Study denied
- **WHEN** an authenticated user requests a Study owned by another user by id
- **THEN** the API responds with 404 Not Found or 403 Forbidden without leaking existence details beyond a denied response

### Requirement: List active Objetos de Estudio
The system SHALL allow an authenticated user to visualize their non-archived Studies as the entry point to research (a library of investigations, not an administrative table as the primary metaphor).

#### Scenario: User with Studies sees library
- **WHEN** an authenticated user who owns one or more non-archived Studies opens the library
- **THEN** those Objetos de Estudio are listed with enough identity (at least name) to open one

### Requirement: Empty State invites the first question
When an authenticated user has no non-archived Studies, the system SHALL show an Empty State that invites beginning research by formulating a question and creating the first Objeto de Estudio. The Empty State MUST NOT feel like an empty administrative form or communicate mere absence.

#### Scenario: First access Empty State
- **WHEN** an authenticated user with zero non-archived Studies opens the library
- **THEN** the UI presents an Empty State inviting them to start by formulating a question and creating their first Objeto de Estudio

### Requirement: Simple Study creation
The system SHALL allow creating a Study with only a required name and an optional description. All other fields SHALL use defaults. After successful creation, the user MUST enter the Workspace of the new Study immediately.

#### Scenario: Create with name only
- **WHEN** an authenticated user creates a Study providing only a name
- **THEN** the Study is persisted with defaults and the client navigates into that Study's Workspace

#### Scenario: Create with name and description
- **WHEN** an authenticated user creates a Study providing a name and description
- **THEN** the Study is persisted with those values and the client navigates into that Study's Workspace

### Requirement: Edit basic Study information
The system SHALL allow the owner to edit basic Study information (at least name and description).

#### Scenario: Update name and description
- **WHEN** the owner submits an edit with a new name and/or description
- **THEN** the Study is updated and subsequent reads reflect the new values

### Requirement: Archive instead of hard delete
The system SHALL support archiving a Study. The system MUST NOT offer physical deletion of Studies in this capability. Archived Studies MUST NOT appear in the default active library.

#### Scenario: Archive a Study
- **WHEN** the owner archives a Study
- **THEN** the Study is marked archived and no longer appears in the default active library

#### Scenario: No hard delete endpoint in scope
- **WHEN** a client attempts to permanently delete a Study via the product API defined in this change
- **THEN** the system does not provide a successful hard-delete operation for Studies

### Requirement: Open Study Workspace with empty Canvas
Opening a Study SHALL enter its Workspace on a URL-addressable research session (default `case-framework` when no session is specified). A newly created Workspace SHALL present an empty Canvas for that session as structure for future capabilities. The Workspace MUST NOT yet implement Cognitive Objects, AI Companion content, scenarios content, journals, visualizations, or methodologies inside any session Canvas. The Workspace MUST present the persistent research-session Sidebar so the owner can move between the eight process stages without leaving the Objeto de Estudio.

#### Scenario: Open newly created Workspace
- **WHEN** the user opens a newly created Study
- **THEN** the Workspace shows the default research session with an empty Canvas as the primary research surface, without those deferred capabilities, and with the research Sidebar visible

#### Scenario: Canvas remains protagonist
- **WHEN** the user is inside a Study Workspace on any research session
- **THEN** the Canvas occupies the primary visual space consistent with the NISSE Workspace grammar while the Sidebar remains secondary structural navigation

#### Scenario: Session change keeps Study context
- **WHEN** the user navigates from one research session to another inside a Study
- **THEN** they remain in the same Objeto de Estudio with the Sidebar still present and a distinct empty Canvas for the newly selected session
