## Purpose

Refine the Case Framework research instrument UX: integrated chevron navigation cues, mosaic editing with Write/Preview, prominent progress headers, terminado toggle, and fixed-tile overview with read-only overflow Drawer.

## ADDED Requirements

### Requirement: Section Canvas mosaic layout
Each Case Framework section Canvas SHALL arrange its Markdown fields in a two-column mosaic on viewports that can sustain it, collapsing to a single column on narrow viewports. The Canvas MUST feel like a writing instrument mosaic, not a single-column administrative form stack.

#### Scenario: Two-column field mosaic on desktop
- **WHEN** the owner opens a section Canvas on a desktop-width viewport with more than one field
- **THEN** fields are presented in a two-column mosaic layout

### Requirement: Protagonist section header
Each section Canvas SHALL present a prominent header that includes: the Case Framework mark/identity for the current Marco context, the section title, a short subtitle/purpose, the section progress status (Sin comenzar, En construcción, Con contenido, or Terminado), and discrete autosave feedback (e.g. Guardado / Guardando…). Status and save feedback MUST be visually protagonistic within that header, not buried as captions alone.

#### Scenario: Header shows status and save feedback
- **WHEN** the owner is editing a section and content is saved
- **THEN** the header shows the current progress status and save feedback alongside title and subtitle

### Requirement: Terminado color-line toggle
The explicit completion control SHALL be labeled **Marcar como terminado** (MUST NOT use “Marcar como revisado”). The control MUST be a color-line toggle (or equivalent segmented color track), not a bare boolean checkbox. Marking terminado MUST remain non-blocking for navigation and further editing. Product status **Terminado** replaces the former **Revisado** label for the completed state.

#### Scenario: Toggle marks section terminado
- **WHEN** the owner activates Marcar como terminado on a section
- **THEN** the section status becomes Terminado and the toggle reflects the on state without a checkbox-only control

#### Scenario: Terminado remains editable
- **WHEN** a section is Terminado
- **THEN** the owner can still edit its fields and navigate to other sections

### Requirement: Field editor with Write and Preview tabs
Each field editor SHALL show the field title and subtitle. The guiding question MUST appear as a hint (footer and/or tooltip), not as the primary heading. Each field MUST provide two tabs: **Escribir** (Markdown source) and **Previsualizar** (rendered Markdown preview of that field). Preview MUST be read-only for that tab.

#### Scenario: Switch to preview tab
- **WHEN** the owner selects Previsualizar on a field with Markdown content
- **THEN** the field shows rendered Markdown for that content without leaving the section Canvas

#### Scenario: Guiding question as hint
- **WHEN** the owner views a field block
- **THEN** the guiding question is available as a hint (footer or tooltip), while title and subtitle lead the block

### Requirement: Overview progress header with yellow tracking
The Case Framework overview Canvas SHALL use a header composition that surfaces the progress status of all five subelements, preserving the yellow circular tracking language already used for progress indication. The overview MUST remain a derived read-only view.

#### Scenario: Overview header lists subitem statuses
- **WHEN** the owner opens the Case Framework overview
- **THEN** the header (or header band) shows each subelement’s status using the yellow-circle tracking treatment

### Requirement: Fixed-size overview field tiles with overflow Drawer
On the overview, each field SHALL render inside a fixed-size tile. Empty fields MUST appear as empty tiles of that fixed size. If rendered Markdown fits within the tile, it SHALL display inside the tile. If content overflows the fixed size, the system SHALL offer opening a right-side Drawer that shows the full field Markdown rendered as read-only (MUST NOT be editable in the Drawer). The overview MUST NOT become a second writable data source.

#### Scenario: Empty field tile
- **WHEN** a field has no content on the overview
- **THEN** it appears as an empty fixed-size tile

#### Scenario: Fitting content stays in tile
- **WHEN** a field’s rendered Markdown fits the fixed tile
- **THEN** it is shown inside the tile without requiring a Drawer

#### Scenario: Overflow opens read-only Drawer
- **WHEN** a field’s content exceeds the fixed tile
- **THEN** the owner can open a right-side Drawer with the full read-only Markdown rendering of that field
