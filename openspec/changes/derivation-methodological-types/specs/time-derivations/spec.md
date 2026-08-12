## ADDED Requirements

### Requirement: Methodological derivation types replace impact and speculative flags
A derivation MUST be associated with one or more methodological Derivation Types from a centralized catalog. Each catalog type MUST expose name, inspiration, reference, and methodological prompt (pista) written as an exhortative exploration instruction. The system MUST NOT accept, persist for new writes, or present in the Drawer the former fields impact and is_speculative. Removing a type association from a derivation MUST NOT delete the type from the catalog.

#### Scenario: Multi-type association persists
- **WHEN** the owner saves a derivation with types Proceso and Futuro selected
- **THEN** reload of the Study derivation graph returns those types with their inspiration, reference, and prompt payloads

#### Scenario: Save rejected without types
- **WHEN** the owner attempts to create or update a derivation with zero types selected
- **THEN** the system rejects the save and communicates that at least one derivation type is required

#### Scenario: Impact and speculative absent
- **WHEN** the owner opens create or edit for a derivation
- **THEN** Impact and Especulativa controls are not shown and new API payloads do not require those fields

### Requirement: Derivation Drawer leads with methodological lenses
The Derivation Drawer (create and edit) MUST place the multi-select Tipos de deriva control above the name field. Selected types MUST make inspiration, reference, and each pista individually consultable inside the Drawer without leaving the derivation. Multiple pistas MUST remain separate (not auto-merged). After name and description, the Drawer MUST still allow optional linking to a Study Recall from timelines. Free-form tags MUST be editable via a single chip-style input where committing with Enter creates a capsule in that same control and further tags can be added the same way.

#### Scenario: Type selector above name
- **WHEN** the owner opens create or edit of a derivation
- **THEN** the Tipos de deriva multi-select appears before the Nombre field

#### Scenario: Distinct pistas for multiple types
- **WHEN** a derivation has three types selected
- **THEN** the Drawer shows three separate pista sections labeled by type name

#### Scenario: Enter commits tag capsule
- **WHEN** the owner types a tag and presses Enter in the tags control
- **THEN** a capsule for that tag appears in the same input surface and the text field clears for another tag

#### Scenario: Recall remains linkable
- **WHEN** the owner selects a Recuerdo from the Study timelines while editing a derivation and saves
- **THEN** the derivation retains that recall association on reload

### Requirement: Unified neighbor carousel after description
After the description textarea in the Derivation Drawer, the system MUST present parent and child neighbor derivations in one horizontal-scroll carousel. Parent cards and child cards MUST be visually distinguishable by nature (for example labeled or styled as padre vs hijo) while remaining in the same scroll track. Selecting a neighbor card MUST focus that derivation on the Canvas / open its Drawer context as already provided by neighborhood navigation.

#### Scenario: Parents and children share one carousel
- **WHEN** the selected derivation has both parent and child neighbors
- **THEN** both appear after the description in a single horizontal carousel with clear parent-vs-child differentiation

### Requirement: Canvas nodes show name only for methodological derivations
On the time-derivations Canvas, a derivation node MUST display only its name (plus connections and existing root identity cues). Methodological type names, inspiration, reference, prompt, description, tags, and impact MUST NOT appear as primary node face content. A minimal multi-type indicator (for example dots) MAY appear without naming the types.

#### Scenario: Clean node face
- **WHEN** a derivation with multiple methodological types is rendered on the Canvas
- **THEN** the node shows the derivation name and MUST NOT list type names or methodological metadata as body text
