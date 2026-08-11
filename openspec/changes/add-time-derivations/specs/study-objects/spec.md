## ADDED Requirements

### Requirement: Derivation graph materializes with Study
When a Study is created, the system SHALL ensure exactly one derivation graph for that Study with a root node named after the Study. The ensure operation MUST be idempotent for existing Studies that already have a graph. Derivation graph artifacts MUST belong to the Study Aggregate Root.

#### Scenario: Graph ensured on Study create
- **WHEN** an authenticated user creates a Study named "Interacción Humanos-Agentes"
- **THEN** a derivation graph exists for that Study with a single root node displaying that name and no additional derivations

#### Scenario: Existing Studies can ensure graph
- **WHEN** an owner opens Derivaciones del tiempo for a Study created before this capability
- **THEN** the system ensures a single graph with root without creating duplicates
