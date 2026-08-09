## ADDED Requirements

### Requirement: Sidebar panels match Canvas surface framing
Within the Study Workspace, the three Sidebar panels (identity, research sessions, Objeto de Estudio) SHALL render as framed surfaces on the shared workspace background—using the same visual language as the session Canvas (subtle border, system large radius, canvas/panel surface fill)—and MUST NOT appear as a solid filled sidebar column that merges with the page edge.

#### Scenario: Rail panels read as frames on background
- **WHEN** an authenticated user views the Study Workspace on desktop
- **THEN** each Sidebar panel shows a bordered rounded surface over the workspace background, visually analogous to the Canvas frame

### Requirement: Sessions panel expands vertically
The research-sessions panel SHALL grow to fill the vertical space between the identity panel and the Objeto de Estudio panel so the three panels stack one above the other without a large empty gap outside the sessions frame.

#### Scenario: Sessions panel stretches between identity and study
- **WHEN** the Workspace Sidebar has spare vertical height on desktop
- **THEN** the sessions panel expands downward to occupy that space while identity stays at the top and Objeto de Estudio remains at the foot
