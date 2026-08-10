## MODIFIED Requirements

### Requirement: Profile API
The API SHALL expose authenticated endpoints under `/api/` for the current user's Profile: retrieve (create-on-demand if missing as part of the identity guarantee) and partial update of the caller's own Profile. The API MUST derive the target Profile exclusively from the authenticated session or token. The API MUST NOT accept a client-supplied user id to select whose Profile to read or update. The Profile payload MUST include the work-identity fields needed by the client: nombre, apellidos, cargo, country code, celular, correo electrónico, username, plus identifiers/timestamps needed by the client. Username uniqueness and email format/uniqueness rules that apply in the product MUST be enforced on update.

#### Scenario: Get current Profile
- **WHEN** an authenticated client calls the current-Profile endpoint
- **THEN** the response status is 200 and the body includes the Profile identity needed by the client

#### Scenario: Patch own Profile
- **WHEN** an authenticated client PATCHes the current-Profile endpoint with valid identity fields
- **THEN** the response status is 200 and the body returns the updated Profile

#### Scenario: Reject invalid Profile update
- **WHEN** an authenticated client PATCHes the current-Profile endpoint with missing required fields, invalid country code/phone pairing, invalid email, or a username/email that violates uniqueness
- **THEN** the response status is 400 and field errors identify the failing fields without applying invalid changes

#### Scenario: Foreign Profile mutation not possible via client id
- **WHEN** an authenticated client attempts to update another user's Profile by sending a different user id in the request
- **THEN** the API still updates only the authenticated caller's Profile (or ignores the foreign id) and does not expose or mutate another user's Profile

## ADDED Requirements

### Requirement: Logout remains session-scoped
The API SHALL continue to expose the existing authenticated logout operation that invalidates the caller's client session/token according to the current auth architecture. Profile Settings MUST reuse this logout path rather than introducing a parallel authentication mechanism.

#### Scenario: Logout clears authenticated access
- **WHEN** an authenticated client calls the existing logout endpoint
- **THEN** subsequent Profile requests without a valid session are rejected with 401 Unauthorized
