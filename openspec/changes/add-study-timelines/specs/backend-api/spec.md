## ADDED Requirements

### Requirement: Timelines API under Study
The API SHALL expose authenticated endpoints under `/api/` for the Study owner to list, create, retrieve, update, archive, restore, and permanently delete Timelines scoped to a Study; to create, retrieve, update, and delete Recuerdos and Momentos; and to create and inspect Timeline collapses. Permanent delete of a Timeline MUST succeed only when the Timeline is archived and is not the principal Timeline. Creating a Recuerdo on an archived Timeline MUST be rejected. Non-owners MUST be denied. Soft-archived Timelines remain readable. Hard delete MUST cascade or otherwise remove exclusively owned Recuerdos, Momentos, and collapse relations that depend only on that Timeline while preserving referential integrity for shared collapse identities still needed by other Timelines.

#### Scenario: List timelines for owned Study
- **WHEN** an authenticated owner GETs Timelines for their Study
- **THEN** the response status is 200 and includes active and/or archived Timelines according to the requested filter with fields needed by the overview

#### Scenario: Create timeline
- **WHEN** an authenticated owner POSTs a Timeline with required name, classification, and retrospective year
- **THEN** the response status is 201 and the body includes the new Timeline id and fields

#### Scenario: Reject hard delete of active timeline
- **WHEN** an authenticated owner attempts to permanently delete an active Timeline
- **THEN** the API rejects the operation without removing the Timeline

#### Scenario: Reject hard delete of principal timeline
- **WHEN** an authenticated owner attempts to permanently delete the principal Timeline even if archived
- **THEN** the API rejects the operation

#### Scenario: Collapse create
- **WHEN** an authenticated owner creates a collapse linking a Recuerdo to two or more Timelines of the same Study
- **THEN** the API persists the shared Recuerdo identity across those Timelines and a collapse Momento

#### Scenario: Foreign Study timelines denied
- **WHEN** an authenticated user requests Timelines for a Study they do not own
- **THEN** the API responds with 404 Not Found or 403 Forbidden without returning timeline content
