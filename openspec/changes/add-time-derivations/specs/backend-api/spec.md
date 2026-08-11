## ADDED Requirements

### Requirement: Neo4j configuration for derivation graphs
The backend SHALL connect to Neo4j using environment variables for URI, user, and password (names MAY follow project convention such as `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`). Secrets MUST NOT be hardcoded in source. Defaults MAY target a local Neo4j instance suitable for development.

#### Scenario: Local development Neo4j env
- **WHEN** Neo4j env vars are configured for local development
- **THEN** Django can open a driver session against that Neo4j instance for derivation graph operations

### Requirement: Derivation graph API is Study-scoped and owner-only
The API SHALL expose authenticated endpoints under `/api/studies/:studyId/…` to retrieve the full derivation graph, create/update/delete derivation nodes, create/delete edges, and persist node positions for the caller's owned Study. React clients MUST NOT connect directly to Neo4j; all graph mutations go through this API. Foreign Study ids MUST be denied.

#### Scenario: Get full graph
- **WHEN** an authenticated owner GETs the derivation graph for their Study
- **THEN** the response includes the root, derivation nodes (with positions and editable fields), and edges needed to render the Canvas

#### Scenario: Create derivation node
- **WHEN** an authenticated owner POSTs a derivation node with a required name
- **THEN** the response status indicates success and the node is available on subsequent graph reads

#### Scenario: Persist position
- **WHEN** an authenticated owner updates a node's position after dragging
- **THEN** subsequent graph reads return the updated position

#### Scenario: Create and delete edge
- **WHEN** an authenticated owner creates an edge between two nodes of the same Study graph and later deletes that edge
- **THEN** both operations persist and foreign Study nodes cannot be linked

#### Scenario: Foreign Study denied
- **WHEN** an authenticated user calls derivation graph endpoints for a Study they do not own
- **THEN** the API denies the request
