## Purpose

Define the time-derivations research instrument: a single Study-scoped derivation graph where the Futures Designer explores open associations from the Objeto de Estudio toward inspirations, concepts, signals, and speculative futures — without imposing causality or rigid hierarchy.

## ADDED Requirements

### Requirement: One derivation graph per Study
The system SHALL associate exactly one derivation graph with each Study Aggregate Root. Creating or ensuring the graph MUST be idempotent. The system MUST NOT allow multiple independent derivation graphs for the same Study, nor orphan graph artifacts outside a Study.

#### Scenario: Single graph for a Study
- **WHEN** the owner opens Derivaciones del tiempo for Study A
- **THEN** exactly one graph scoped to Study A is loaded, never content from Study B

#### Scenario: Idempotent ensure
- **WHEN** the system ensures a derivation graph for a Study that already has one
- **THEN** no second graph is created and the existing graph remains the sole graph for that Study

### Requirement: Root node represents the Study
Each derivation graph SHALL include exactly one root node that represents the Objeto de Estudio. The root node's displayed name MUST equal the current Study name and MUST update when the Study name changes. The root MUST be visually distinguished as the Objeto de Estudio. The root node MUST NOT be deletable.

#### Scenario: Root created with Study name
- **WHEN** a Study named "Interacción Humanos-Agentes" has its derivation graph ensured
- **THEN** the root node displays "Interacción Humanos-Agentes" and is marked as Objeto de Estudio

#### Scenario: Root name follows Study rename
- **WHEN** the owner renames the Study
- **THEN** subsequent loads of the derivation graph show the new name on the root node

#### Scenario: Root cannot be deleted
- **WHEN** the owner attempts to delete the root node
- **THEN** the system rejects the deletion and the root remains

### Requirement: Derivation node attributes
Each derivation node SHALL persist at least: name (required, short), description Markdown (optional), derivation type (from a centralized taxonomy), impact (`low` | `medium` | `high` | `transformative`), is_speculative (boolean), optional related recall id within the same Study, canvas position, created_at, and updated_at. On the Canvas a derivation node MUST display only its name (plus connections), not description, impact, or other metadata.

#### Scenario: Create derivation with required name
- **WHEN** the owner creates a derivation with name "Cyberpunk"
- **THEN** the node appears on the Canvas showing only "Cyberpunk" and is persisted with defaultable optional fields

#### Scenario: Speculative is not an error state
- **WHEN** the owner marks a derivation as speculative
- **THEN** the UI treats speculation as a legitimate research state without error or alert styling

### Requirement: Centralized derivation type taxonomy
Derivation types SHALL come from a single centralized taxonomy that includes at least: inspiración artística, corriente de arte, tecnología, concepto, teoría, fenómeno cultural, acontecimiento, señal, objeto, práctica, institución, escenario, especulación, otro. Components MUST NOT hardcode divergent type lists. Subtle non-color-only differentiation by type MAY appear (icon, indicator, border, drawer badge); the system MUST NOT rely on color alone or produce a chromatic explosion. NISSE yellow remains the action/focus accent.

#### Scenario: Type selectable from taxonomy
- **WHEN** the owner edits a derivation in the Drawer
- **THEN** they can choose a type from the centralized taxonomy

### Requirement: Free directed connections
Nodes (root and derivations) SHALL connect freely via directed edges representing open derivation relationships (not assumed causality). The first version MAY use a generic relationship meaning "derives toward". The owner MUST be able to create and delete edges without deleting the connected nodes. Edge creation and deletion MUST persist across reload.

#### Scenario: Connect two nodes
- **WHEN** the owner creates a directed connection from node A to node B
- **THEN** the edge appears immediately, persists after reload, and both nodes remain

#### Scenario: Disconnect without deleting nodes
- **WHEN** the owner deletes an edge between A and B
- **THEN** the edge is removed and persisted as absent while A and B remain

### Requirement: Create derivations from the Canvas
The owner MUST be able to add a derivation from the Canvas primary action (Agregar derivación). Creating a derivation from a selected node MUST auto-connect the new node to that source. Positions MUST persist after drag-end (or equivalent settle) without recalculating layout automatically after user placement. Auto-layout after every change MUST NOT be imposed in this capability.

#### Scenario: Add derivation from selected node
- **WHEN** the owner has node A selected and adds a derivation named "AI Companions"
- **THEN** a new derivation node exists, connected from A, and both persist

#### Scenario: Position survives reload
- **WHEN** the owner moves a node and later reloads the session
- **THEN** the node appears at the last persisted position

### Requirement: Delete derivation cleans related edges
Deleting a derivation node SHALL remove that node and its incident edges consistently. Related recall linkage MUST NOT cascade-delete the Recall. The root MUST remain protected.

#### Scenario: Delete derivation removes edges
- **WHEN** the owner deletes a derivation that has two edges
- **THEN** the node and those edges are gone on subsequent loads while other nodes remain

### Requirement: Derivation Drawer
Selecting a derivation node SHALL open a right-side Drawer while the Canvas remains mounted and visible. The Drawer MUST allow viewing and editing name, description Markdown, derivation type, impact, speculative flag, and related recall; and MUST support save and delete (derivations only). Details MUST NOT navigate to a separate page per derivation.

#### Scenario: Open derivation drawer
- **WHEN** the owner activates a derivation node
- **THEN** a right Drawer opens with editable fields while the graph Canvas stays visible

#### Scenario: Save persists fields
- **WHEN** the owner edits name and impact and saves
- **THEN** subsequent loads reflect the saved values on the node and in the Drawer

### Requirement: Root Drawer is contextual read-only for Study identity
Selecting the root node MAY open a contextual Drawer showing Objeto de Estudio identity (name, description) and lightweight graph counts (derivations, connections), plus a path to view the Study where appropriate. The root Drawer MUST NOT edit Study fields whose editing belongs to another surface.

#### Scenario: Root drawer does not edit Study name
- **WHEN** the owner opens the root Drawer
- **THEN** they can inspect Study context but cannot change the Study name from that Drawer

### Requirement: Optional related Recall
A derivation MAY reference at most one Recall belonging to a Timeline of the same Study, by identifier, without duplicating Recall content. The Drawer MUST offer relating/unrelating a Recall with enough context (title, date, timeline name) and search/filter by name, date, or timeline. If the Recall no longer exists, the linkage MUST degrade safely (cleared or shown as unavailable) without breaking the graph.

#### Scenario: Relate recall from same Study
- **WHEN** the owner relates derivation "Computación ubicua" to Recall "Nacimiento del smartphone" from a Timeline of the same Study
- **THEN** the link persists by recall id and the Drawer shows enough Recall context without copying full Recall body into the graph store

#### Scenario: Foreign Study recall rejected
- **WHEN** a client attempts to relate a Recall from another Study
- **THEN** the system rejects the relation

#### Scenario: Missing recall handled
- **WHEN** a related Recall has been deleted
- **THEN** the derivation remains loadable and the missing relation is handled without a hard failure of the graph

### Requirement: Empty, loading, and error states
When the graph has only the root, the Canvas SHALL orient the owner to add a first derivation (not a blank error-like void). Loading MUST show a coherent research loading state without inventing nodes. Load failure MUST offer retry. Persist failures for move/connect/disconnect MUST give feedback and revert when needed so the Canvas does not stay falsely authoritative.

#### Scenario: Zero derivations orientation
- **WHEN** the owner opens Derivaciones del tiempo on a Study with only the root
- **THEN** discrete guidance invites adding a first derivation

#### Scenario: Load failure retry
- **WHEN** the graph fails to load
- **THEN** the UI communicates the failure and allows retry without fake nodes

### Requirement: Canvas as exploration laboratory
The derivation Canvas SHALL be the primary surface for free exploration (pan, zoom, fit, select, rearrange). The experience MUST NOT present tables, rigid admin grids, permanent forms, or dashboard chrome as the primary metaphor. Desktop is the primary target; on small viewports pan/zoom remain available and the Drawer may overlay the Canvas without destroying exploration affordances.

#### Scenario: Canvas dominates the stage
- **WHEN** the owner is on Derivaciones del tiempo
- **THEN** most of the stage is the interactive graph, not an administrative form or table

### Requirement: Owner-only graph access
All derivation graph operations SHALL require an authenticated owner of the Study. Access by id manipulation for another user's Study MUST be denied.

#### Scenario: Foreign study graph denied
- **WHEN** an authenticated user requests the derivation graph of a Study they do not own
- **THEN** the API denies the request without exposing another owner's graph
