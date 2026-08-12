## ADDED Requirements

### Requirement: Type chips sit beside a circular derivation node
A derivation node on the Canvas MUST render as a circle with equal width and height (perfect circle chrome). Methodological type chips (icon + name) MUST be placed **outside** that circle, in a side rail adjacent to the node—not stacked inside the circular face. When the rail is on the **right** of the circle, chips MUST be **left-aligned** within that rail (flush toward the circle). The derivation display name MUST remain inside the circle. Activating a chip MUST still open the floating methodological detail card (name, reference, inspiration, pista). Chip interaction MUST NOT deform the circle and MUST NOT initiate graph drag (`nodrag`/`nopan` as before).

#### Scenario: Circle stays round with multiple types
- **WHEN** a derivation has three or more methodological types
- **THEN** the node circle keeps equal width and height and the type chips appear beside it, not inside the circle

#### Scenario: Right-side rail left-aligns chips
- **WHEN** type chips are shown on the right side of a derivation node
- **THEN** each chip (and the chip column) is left-aligned toward the circle

#### Scenario: Chip detail still works outside the circle
- **WHEN** the owner clicks a type chip in the side rail
- **THEN** the floating detail card for that type opens as before

## MODIFIED Requirements

### Requirement: Derivation node type chip toolbar with detail card
Each derivation node on the Canvas MUST show a compact toolbar of chips for every associated methodological type. Each chip MUST show the type’s official-set icon and Spanish name. The toolbar MUST be rendered **beside** the circular node (outside the circle), not as content that expands or elongates the circle. Activating a chip MUST open a floating detail card (click-driven) that includes: type name, reference, inspiration, and full pista. Clicking a type chip MUST NOT by itself be required to open the Derivation Drawer for edit, and MUST NOT initiate a graph drag. The derivation display name remains the primary identity text **inside** the circle.

#### Scenario: Multiple type chips beside node
- **WHEN** a derivation has types Proceso, Futuro, and Desenfoque
- **THEN** three chips (icon + name) appear in a side rail outside the circle and the circle face shows the derivation name without an in-circle type eyebrow or in-circle chip stack

#### Scenario: Chip opens methodological detail card
- **WHEN** the owner clicks the Futuro chip on a derivation node’s side rail
- **THEN** a floating card shows Futuro’s name, reference, inspiration, and pista

#### Scenario: Node still selectable for edit
- **WHEN** the owner clicks the derivation name (or circular face of the node)
- **THEN** existing Canvas selection / Drawer open behavior for that derivation remains available
