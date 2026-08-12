## ADDED Requirements

### Requirement: Derivation node shows primary type eyebrow
Each derivation node on the Canvas MUST display a gray secondary label (eyebrow), visually analogous to the Study root’s identity eyebrow, showing the Spanish name of the first associated methodological type. When the derivation has more than one type, the eyebrow MUST show the first type’s name followed by an ellipsis (`…`) and MUST NOT list every type name on the node face. The derivation display name remains the primary text in the circle.

#### Scenario: Single type on node
- **WHEN** a derivation has exactly one type named «Proceso»
- **THEN** the circular node shows a gray eyebrow «Proceso» and the derivation name

#### Scenario: Multiple types collapse to first plus ellipsis
- **WHEN** a derivation has types Proceso, Futuro, and Desenfoque (in that order)
- **THEN** the node eyebrow shows «Proceso…» (or equivalent first-name + ellipsis) and MUST NOT enumerate all three type names on the node

### Requirement: Two-step derivation create wizard
Creating a derivation MUST use a two-step Drawer flow. Step 1 MUST include: derivation name; a multi-select Chip Selector of methodological types (chip label + official-set icon sized with the text); a dynamic mosaic of cards for each currently selected type showing reference (gray, above), type name, and pista (readable below); and a primary **Siguiente** control. Advancing to step 2 MUST require a non-empty name and at least one type. Step 2 MUST present the remaining derivation fields (description, tags chip-input, recall, neighbors as already defined) plus a read-only summary of name and selected types with an **Editar** control that returns to step 1 without discarding unsaved step-2 field edits when feasible. Persisting the new derivation via the API MUST occur on explicit save in step 2 (not merely on Siguiente), unless an already-persisted node is being edited.

#### Scenario: Step 1 to step 2 via Siguiente
- **WHEN** the owner enters a name, selects one or more types, and activates Siguiente
- **THEN** the Drawer shows step 2 with the remaining form and a summary of name and types

#### Scenario: Mosaic follows chip selection
- **WHEN** the owner selects type «Futuro» in the Chip Selector
- **THEN** a mosaic card for Futuro appears with reference above in gray, the type name, and its pista; deselecting Futuro removes that card

#### Scenario: Edit returns to step 1
- **WHEN** the owner is on step 2 and activates Editar
- **THEN** the Drawer returns to step 1 with the current name and type selections preserved

#### Scenario: Create does not persist on Siguiente alone
- **WHEN** the owner advances from step 1 to step 2 without saving
- **THEN** no new derivation node is required to exist on the Canvas until they confirm save on step 2

### Requirement: Existing derivation opens on detail step
Opening an existing derivation for edit MUST land on step 2 (detail/rest of form) with name and types visible and Editar available to revise step-1 fields. Saving MUST continue to require at least one type.

#### Scenario: Edit existing opens step 2
- **WHEN** the owner selects an existing derivation node
- **THEN** the Drawer opens on step 2 with summary and the existing detail fields
