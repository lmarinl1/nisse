## ADDED Requirements

### Requirement: Sidebar organized as three research panels
The Study Workspace Sidebar SHALL visually group its chrome into exactly three secondary **panels** (not dashboard cards): (1) product identity, (2) research-session navigation, (3) Objeto de Estudio context with return-to-Campo. Each panel MUST use a subtle border from the design tokens (`--color-border-subtle` or equivalent) and a rounded corner from the radius scale (`--radius-md` or `--radius-lg`). Panels MUST remain secondary to the Canvas and MUST NOT introduce shadows, KPI strips, or marketing card stacks.

#### Scenario: Three bordered panels visible
- **WHEN** an authenticated user views the Study Workspace Sidebar on a desktop viewport
- **THEN** identity, session navigation, and Objeto de Estudio context each appear in their own rounded bordered panel

#### Scenario: Panel order preserved
- **WHEN** the three panels are shown
- **THEN** identity is above session navigation, and Objeto de Estudio context (with Campo return) remains at the foot of the rail

### Requirement: Identity panel includes product motto
The identity panel SHALL present the NISSE brand lockup and the Spanish product motto: «El futuro no se predice: se anticipa y se diseña.» The motto MUST be secondary typography (caption/lede scale, secondary text color) so it does not overpower the brand lockup.

#### Scenario: Motto under lockup
- **WHEN** an authenticated user views the Study Workspace identity panel
- **THEN** they see the brand lockup and the motto text below it within the same panel
