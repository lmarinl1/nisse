## ADDED Requirements

### Requirement: Profile API
The API SHALL expose authenticated endpoints under `/api/` for the current user's Profile (retrieve; create-on-demand if missing as part of identity guarantee).

#### Scenario: Get current Profile
- **WHEN** an authenticated client calls the current-Profile endpoint
- **THEN** the response status is 200 and the body includes the Profile identity needed by the client

### Requirement: Study collection and detail API
The API SHALL expose authenticated endpoints under `/api/` to list the caller's non-archived Studies by default, create a Study, retrieve a Study by id (owner only), update basic fields, and archive a Study. Hard delete MUST NOT be exposed.

#### Scenario: Create Study
- **WHEN** an authenticated client POSTs a Study with a required name and optional description
- **THEN** the response status is 201 and the body includes the new Study id and fields

#### Scenario: List own active Studies
- **WHEN** an authenticated client GETs the Studies collection
- **THEN** the response status is 200 and includes only the caller's non-archived Studies by default

#### Scenario: Archive Study
- **WHEN** an authenticated owner archives a Study via the archive operation
- **THEN** the response indicates success and subsequent default lists omit that Study

#### Scenario: Hard delete not available
- **WHEN** an authenticated client attempts a hard DELETE of a Study resource
- **THEN** the API does not permanently remove the Study as a supported product operation
