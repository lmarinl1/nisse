## Purpose

Evolve the time-derivations Canvas and Drawer so nodes read as transparent circular instruments showing name and type, edges can be removed reliably, neighborhood (parents/children) is explicit in the Drawer as a carousel, and free-form tags persist per derivation.

## ADDED Requirements

### Requirement: Circular Discovery-styled nodes
Derivation graph nodes (root and derivations) SHALL render as circles with a Discovery Yellow border and a transparent (or near-transparent) fill so the Canvas atmosphere remains visible through the node. The root MUST remain visually distinguishable (for example eyebrow or size) without abandoning the circular contract. Node chrome MUST NOT rely on opaque administrative card fills as the primary treatment.

#### Scenario: Circular yellow-border nodes on canvas
- **WHEN** the owner views Derivaciones del tiempo with at least the root and one derivation
- **THEN** both appear as circular nodes with Discovery Yellow borders and transparent/near-transparent backgrounds

### Requirement: Name and derivation type on the node
Each derivation node on the Canvas SHALL display the derivation **name** and the **derivation type** (Spanish label from the centralized taxonomy). Metadata such as impact, description, and tags MUST NOT clutter the node face beyond name and type (plus any minimal root-only identity cue).

#### Scenario: Type visible on derivation node
- **WHEN** a derivation has type `technology` (label «Tecnología») and name «Interfaces hápticas»
- **THEN** the node shows both the name and «Tecnología» (or the taxonomy label) on the Canvas

### Requirement: Edge deletion with persistence
The owner MUST be able to delete an existing edge without deleting its endpoints. Deletion SHALL update the Canvas immediately (optimistic when safe) and persist via the API so reload omits the edge. The system MUST provide a discoverable affordance consistent with React Flow (at least select edge + Delete/Backspace) and clear failure feedback if persistence fails.

#### Scenario: Delete edge with keyboard
- **WHEN** the owner selects an edge and presses Delete or Backspace
- **THEN** the edge disappears from the Canvas and remains absent after reload

#### Scenario: Endpoints survive edge delete
- **WHEN** an edge between A and B is deleted
- **THEN** nodes A and B remain on the graph

### Requirement: Parent and child neighborhood carousel in Drawer
When a derivation Drawer is open, the system SHALL show references to **parent** node(s) (incoming `DERIVES_TO`) and **child** node(s) (outgoing `DERIVES_TO`) as horizontal **carousel-style cards** (compact cards the user can scroll/browse). Cards MUST show enough identity (at least name; type when available). Empty parent or child sets MUST show a discreet empty hint, not an error. Activating a card MAY select/focus that node on the Canvas when practical.

#### Scenario: Parents and children listed as carousel cards
- **WHEN** derivation B has parent A and children C and D
- **THEN** the Drawer for B shows a parent carousel including A and a children carousel including C and D as cards

#### Scenario: No parents empty hint
- **WHEN** a derivation has no incoming edges
- **THEN** the parent carousel region communicates that there is no parent without failing the Drawer

### Requirement: Persistable tags on derivation nodes
Each derivation node SHALL support zero or more free-form **tags** (short strings). The owner MUST be able to add and remove tags from the Derivation Drawer. Tags MUST persist in the graph store via the Django API and round-trip on graph load. Tags MUST appear in the Drawer; they MUST NOT be required to appear on the Canvas node face in this change. The root node MAY omit editable tags.

#### Scenario: Add and persist a tag
- **WHEN** the owner adds the tag «señal débil» on a derivation and saves (or commits the tag action)
- **THEN** subsequent loads of the graph include that tag on the node and the Drawer shows it

#### Scenario: Remove a tag
- **WHEN** the owner removes a tag from a derivation
- **THEN** the tag is absent after reload
