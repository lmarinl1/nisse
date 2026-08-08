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
