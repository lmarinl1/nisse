## ADDED Requirements

### Requirement: Document head uses official favicon
The frontend SPA SHALL reference the official compact NISSE brand favicon in `index.html` (or equivalent document head) so browser chrome reflects product identity.

#### Scenario: Head link present
- **WHEN** the built or served SPA document is inspected
- **THEN** a favicon link points at the official compact brand SVG under the public brand assets path

### Requirement: Identity headers use brand mark composition
Authentication, Study entry (home/library), diagnostics, and Workspace identity chrome that currently show typography-only “NISSE” SHALL compose the brand mark with the wordmark as a single identity lockup, keeping the Canvas / atmosphere as the exploration protagonist rather than centering the screen on logo decoration.

#### Scenario: Auth lockup
- **WHEN** the user views the authentication screen
- **THEN** the identity lockup includes the official brand mark and the NISSE wordmark

#### Scenario: Study home lockup
- **WHEN** the user views the Study home header
- **THEN** the identity lockup includes the brand mark and wordmark without replacing the research atmosphere or Study actions

#### Scenario: Workspace chrome identity
- **WHEN** the Study Workspace shows product identity in its chrome
- **THEN** it uses the brand mark (official or compact as size requires) rather than typography-only branding

### Requirement: Header and control actions use official UI icons
Where Study entry, drawers, or Workspace chrome expose recognizable actions (cerrar, crear, más, salir, etc.), the frontend SHALL render icons from the official UI icon catalog at system sizes (16 / 20 / 24 / 32) and MUST NOT center those screens on icon clusters.

#### Scenario: Create or close control
- **WHEN** the Study create drawer or a header action that maps to a catalog icon is visible
- **THEN** the control uses the matching official UI icon at a system size
