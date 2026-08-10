## ADDED Requirements

### Requirement: Case Framework API under Study
The API SHALL expose authenticated endpoints under `/api/` for the Study owner to retrieve the Case Framework for a Study (creating the empty aggregate on first access if missing) and to update individual section Markdown fields and reviewed state. Hard delete of the Case Framework MUST NOT be required as a product operation in this capability. Non-owners MUST be denied.

#### Scenario: Get Case Framework for owned Study
- **WHEN** an authenticated owner GETs the Case Framework for their Study
- **THEN** the response status is 200 and the body includes the five sections with field Markdown maps and progress-related data

#### Scenario: Update a section
- **WHEN** an authenticated owner updates Markdown fields for `tensions` on their Study's Case Framework
- **THEN** the response indicates success and a subsequent GET returns those field values

#### Scenario: Foreign Study Case Framework denied
- **WHEN** an authenticated user requests Case Framework for a Study they do not own
- **THEN** the API responds with 404 Not Found or 403 Forbidden without returning section content
