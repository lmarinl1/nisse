## ADDED Requirements

### Requirement: Truncated pista with Ver más in type mosaic
When the Derivation Drawer shows methodological type mosaic cards (create step 1 or equivalent lenses preview), each visible pista MUST be truncated in the card body. The card MUST expose a «Ver más» control at the end of the truncated pista. Activating «Ver más» MUST open a floating tooltip/popover (click-driven) that presents the complete pista text for that type. Closing the floating surface MUST return to the truncated card without changing type selection. Types MUST still remain separately consultable (pistas MUST NOT be merged into one blob).

#### Scenario: Ver más reveals full pista
- **WHEN** the owner has selected a type whose pista is longer than the truncated preview and activates «Ver más» on that mosaic card
- **THEN** a floating surface shows the complete pista for that type

#### Scenario: Truncation without Ver más when short
- **WHEN** a selected type’s pista fits entirely in the mosaic card without truncation
- **THEN** the system MAY omit «Ver más» or show it disabled; the full pista remains readable on the card itself

### Requirement: Derivation node type chip toolbar with detail card
Each derivation node on the Canvas MUST replace the primary-type eyebrow text with a compact toolbar of chips for **every** associated methodological type. Each chip MUST show the type’s official-set icon (logo) and Spanish name. Activating a chip MUST open a floating detail card (click-driven tooltip/popover) that includes: type name, reference, inspiration, and full pista. Clicking a type chip MUST NOT by itself be required to open the Derivation Drawer for edit, and MUST NOT initiate a graph drag. The derivation display name remains the primary identity text of the node.

#### Scenario: Multiple type chips on node
- **WHEN** a derivation has types Proceso, Futuro, and Desenfoque
- **THEN** the node shows three chips (icon + name) and MUST NOT show a single «Proceso…» eyebrow as the type summary

#### Scenario: Chip opens methodological detail card
- **WHEN** the owner clicks the Futuro chip on a derivation node
- **THEN** a floating card shows Futuro’s name, reference, inspiration, and pista

#### Scenario: Node still selectable for edit
- **WHEN** the owner clicks the derivation name (or non-chip area of the node)
- **THEN** existing Canvas selection / Drawer open behavior for that derivation remains available

## REMOVED Requirements

### Requirement: Derivation node shows primary type eyebrow
**Reason**: Replaced by a per-type chip toolbar with clickable methodological detail cards so all lenses are visible and consultable on the Canvas.
**Migration**: Render icon+name chips for each `type_id` on the node; remove the first-type + ellipsis eyebrow.
