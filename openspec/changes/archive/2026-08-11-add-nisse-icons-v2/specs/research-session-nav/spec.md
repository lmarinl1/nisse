## ADDED Requirements

### Requirement: Research session icons prefer precise catalog glyphs
Within the Study Workspace research Sidebar, each research session MUST use an official catalog icon whose metaphor matches that session’s research purpose. When Icon Set II (or a later official extension) provides a more precise glyph than a generic proxy previously used for that session, the Sidebar MUST use the more precise glyph. Session icons MUST remain instruments of orientation, not decorative chrome, and MUST NOT use the brand mark assets as session glyphs.

#### Scenario: Temporal session uses a temporal glyph
- **WHEN** an authenticated user views the research Sidebar entry for Líneas de tiempo
- **THEN** that entry shows a temporal catalog icon (for example `timeline-clock` or `history`) rather than a generic calendar proxy if a more precise temporal glyph exists in the catalog

#### Scenario: Observation session uses an observation glyph
- **WHEN** an authenticated user views the research Sidebar entry for Monitoreo
- **THEN** that entry shows an observation-oriented catalog icon (for example `telescope` or `signal`) rather than a weaker proxy if a more precise glyph exists

#### Scenario: Futures-oriented sessions use futures or orientation glyphs
- **WHEN** an authenticated user views Sidebar entries for sessions whose purpose is scenarios, trajectories, or critical orientation
- **THEN** those entries use catalog icons from the futures, navigation, or systems families that better communicate the session metaphor than a generic graph or filter proxy when such glyphs exist
