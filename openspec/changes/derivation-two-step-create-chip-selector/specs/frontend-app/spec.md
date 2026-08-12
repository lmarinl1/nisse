## ADDED Requirements

### Requirement: Shared multi-value Chip Selector
The frontend SHALL provide a reusable multi-value Chip Selector instrument for choosing zero or more options from a list, styled with NISSE tokens (Discovery Yellow for selected/focus affordances, transparent/subtle surfaces, no CRM card chrome). Each chip MUST show the option label and an official `shared/icons` glyph at approximately text size. The control MUST support keyboard focus, clear selected/unselected states, and work inside ResearchDrawer forms. Multi-answer methodological type picking in Derivaciones del tiempo MUST use this instrument (not a dense checkbox list as the primary selector).

#### Scenario: Chip toggle updates selection
- **WHEN** the user activates an unselected chip in a Chip Selector bound to a multi-value field
- **THEN** that option becomes selected and visually distinct; activating it again deselects it

#### Scenario: Icon and label co-sized
- **WHEN** a chip is rendered
- **THEN** its icon is sized consistently with the chip label typography and comes from the official icon catalog
