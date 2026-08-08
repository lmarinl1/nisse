## Purpose

The frontend is a React + TypeScript SPA that consumes the Django API.

## Requirements

### Requirement: Health status display
The home view SHALL fetch `GET /api/health/` and display the returned status fields, or a clear error if the backend is unreachable.

#### Scenario: Backend available
- **WHEN** the API health endpoint responds successfully
- **THEN** the UI shows status, service, and api_version

#### Scenario: Backend unavailable
- **WHEN** the health request fails
- **THEN** the UI shows an error message guiding the developer to start MongoDB and the Django server

### Requirement: Configurable API base URL
The frontend SHALL read the API base URL from `VITE_API_BASE_URL`.

#### Scenario: Default local URL
- **WHEN** `VITE_API_BASE_URL` is `http://127.0.0.1:8000/api`
- **THEN** health requests go to `http://127.0.0.1:8000/api/health/`
