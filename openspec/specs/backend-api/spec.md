## Purpose

The backend exposes a versioned HTTP JSON API backed by MongoDB through Django's official MongoDB database backend.

## Requirements

### Requirement: Health endpoint
The API SHALL expose `GET /api/health/` that returns JSON indicating service readiness.

#### Scenario: Successful health check
- **WHEN** a client calls `GET /api/health/`
- **THEN** the response status is 200 and the body includes `status`, `service`, and `api_version`

### Requirement: MongoDB configuration
The backend SHALL connect to MongoDB using environment variables `MONGODB_URI` and `MONGODB_NAME`, defaulting to a local instance on port 27017 and database name `nisse`.

#### Scenario: Local development defaults
- **WHEN** no MongoDB env vars are set
- **THEN** the app targets `mongodb://localhost:27017` and database `nisse`

### Requirement: CORS for local frontend
The backend SHALL allow CORS origins configured via `CORS_ALLOWED_ORIGINS`, including the Vite default origins in development.

#### Scenario: Frontend on Vite
- **WHEN** the React app at `http://localhost:5173` calls the API
- **THEN** the browser CORS policy permits the request for configured origins

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
