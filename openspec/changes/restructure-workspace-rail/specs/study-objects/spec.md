## MODIFIED Requirements

### Requirement: Product naming is Objeto de Estudio
User-facing copy SHALL refer to a Study as **Objeto de Estudio**. The system MUST NOT use the term "Project" in product UI copy for this concept. The authenticated entry surface that lists Objetos de Estudio SHALL be named **Campo de investigación** (short label **Campo**); the system MUST NOT use "Biblioteca" in product UI copy for that surface.

#### Scenario: Library labels
- **WHEN** the authenticated user views the Campo de investigación or Empty State
- **THEN** visible labels use "Objeto de Estudio" (or plural equivalent), present the entry as Campo / Campo de investigación, and do not say "Project" or "Biblioteca"

### Requirement: List active Objetos de Estudio
The system SHALL allow an authenticated user to visualize their non-archived Studies as the entry point to research (a Campo de investigación — the field of inquiries in the speculative laboratory — not a document library or administrative table as the primary metaphor).

#### Scenario: User with Studies sees library
- **WHEN** an authenticated user who owns one or more non-archived Studies opens the Campo
- **THEN** those Objetos de Estudio are listed with enough identity (at least name) to open one

### Requirement: Empty State invites the first question
When an authenticated user has no non-archived Studies, the system SHALL show an Empty State that invites beginning research by formulating a question and creating the first Objeto de Estudio. The Empty State MUST NOT feel like an empty administrative form or communicate mere absence.

#### Scenario: First access Empty State
- **WHEN** an authenticated user with zero non-archived Studies opens the Campo
- **THEN** the UI presents an Empty State inviting them to start by formulating a question and creating their first Objeto de Estudio

### Requirement: Archive instead of hard delete
The system SHALL support archiving a Study. The system MUST NOT offer physical deletion of Studies in this capability. Archived Studies MUST NOT appear in the default active Campo.

#### Scenario: Archive a Study
- **WHEN** the owner archives a Study
- **THEN** the Study is marked archived and no longer appears in the default active Campo

#### Scenario: No hard delete endpoint in scope
- **WHEN** a client attempts to permanently delete a Study via the product API defined in this change
- **THEN** the system does not provide a successful hard-delete operation for Studies
