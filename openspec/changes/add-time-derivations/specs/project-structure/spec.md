## ADDED Requirements

### Requirement: Neo4j service in local Compose stack
The repository `docker-compose.yml` SHALL include an official Neo4j service suitable for local development, with a named volume for data persistence, published ports needed by the driver/browser workflow, configurable credentials via environment variables, and network reachability from the Django development host. Developers MUST be able to run Neo4j without installing it on the host OS. Credentials MUST NOT be committed as production secrets.

#### Scenario: Developer starts Neo4j via Compose
- **WHEN** a developer runs the project's documented Compose up flow from WSL
- **THEN** a Neo4j container starts with persisted volume data and is reachable using the documented local URI and credentials from `.env.example`
