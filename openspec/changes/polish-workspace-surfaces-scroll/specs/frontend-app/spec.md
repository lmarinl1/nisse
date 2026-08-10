## ADDED Requirements

### Requirement: Global discovery capsule scrollbar
Across the frontend application, scrollable surfaces SHALL use a shared scrollbar appearance: a thin line track with a discovery-yellow capsule or circular thumb that slides along that line, not a heavy conventional scrollbar rail. The Design Language under `docs/ux-framework/` MUST document this standard so future UI reuses it.

#### Scenario: Overflowing panel uses capsule scrollbar
- **WHEN** a Workspace or Case Framework panel overflows and a vertical scrollbar is shown
- **THEN** the thumb appears as a soft discovery-yellow capsule or circle on a thin line track

#### Scenario: Design Language documents scrollbar
- **WHEN** a designer or agent consults the UX framework docs for scrolling chrome
- **THEN** the documented standard describes the line + yellow capsule/circle scrollbar for product UI

### Requirement: Balanced rail and Companion widths
On desktop Study Workspace layouts, the Companion column SHALL be sized so its width is approximately equal to the left research rail width (same order of magnitude / matched minmax), not markedly narrower. The Canvas stage remains the protagonist between them.

#### Scenario: Companion matches rail width band
- **WHEN** an authenticated user views a Study Workspace on a desktop viewport
- **THEN** the Companion column width is aligned with the left rail width band rather than remaining clearly thinner
