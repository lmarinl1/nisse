## Purpose

Guarantees that every authenticated user has a Profile representing a Diseñador de Futuros, as the identity foundation for owning Studies without social or collaboration features.

## ADDED Requirements

### Requirement: Authenticated access foundation
The system SHALL require authentication for Profile and Study operations. Unauthenticated callers MUST NOT read or mutate Profiles or Studies.

#### Scenario: Unauthenticated Study access denied
- **WHEN** a client requests Study resources without a valid authenticated session
- **THEN** the API responds with 401 Unauthorized

#### Scenario: Unauthenticated Profile access denied
- **WHEN** a client requests Profile resources without a valid authenticated session
- **THEN** the API responds with 401 Unauthorized

### Requirement: Profile for every authenticated user
The system SHALL ensure exactly one Profile exists for each authenticated user. The Profile represents the Diseñador de Futuros identity in product language.

#### Scenario: Profile available after authentication
- **WHEN** a user authenticates successfully and no Profile exists yet
- **THEN** the system creates a Profile linked to that user before Study operations proceed

#### Scenario: Existing Profile is reused
- **WHEN** an authenticated user who already has a Profile requests their Profile
- **THEN** the system returns the existing Profile without creating a duplicate

### Requirement: Profile is personal, not social
The system SHALL expose only the current user's own Profile. The system MUST NOT provide social discovery, following, sharing, or collaborative Profile features in this capability.

#### Scenario: User retrieves own Profile
- **WHEN** an authenticated user requests their Profile
- **THEN** the response includes their Profile identity fields needed for the research workspace shell

#### Scenario: No social Profile directory
- **WHEN** a client attempts to list or browse other users' Profiles as a social directory
- **THEN** the system does not provide that capability
