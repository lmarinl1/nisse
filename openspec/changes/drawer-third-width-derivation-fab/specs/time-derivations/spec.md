## Purpose

Define how the Futures Designer creates new derivations on the time-derivations Canvas: a floating create control that keeps the session header focused on purpose, not chrome actions.

## ADDED Requirements

### Requirement: Create derivation via floating action
On the Derivaciones del tiempo Canvas, the primary control to add a derivation SHALL be a floating action button (FAB) fixed to the bottom-right of the Canvas stage (above safe margins so it does not collide with React Flow controls). Activating it MUST create a derivation (from the selected node when one is selected, otherwise as an unconnected or root-linked creation consistent with existing create rules). The SessionCanvasHeader for this session MUST NOT show an «Agregar derivación» / «Agregar primera derivación» button.

#### Scenario: FAB visible on canvas
- **WHEN** the owner is on Derivaciones del tiempo with the graph loaded
- **THEN** a floating add control is visible at the bottom-right of the stage and the session header has no add-derivation button

#### Scenario: FAB creates derivation
- **WHEN** the owner activates the floating add control
- **THEN** a new derivation is created according to the existing create rules and appears on the Canvas

#### Scenario: Empty graph still uses FAB
- **WHEN** the graph has only the root node
- **THEN** orientation copy MAY invite the first derivation, but creation still goes through the FAB (not a header CTA)
