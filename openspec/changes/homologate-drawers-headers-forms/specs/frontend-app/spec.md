## ADDED Requirements

### Requirement: Workspace drawers use Research Drawer contract
Authenticated Workspace and Study entry drawers used for create/edit research content SHALL use the Research Drawer contract (right edge ~¼ width, starred brand mark, Discovery Yellow title, discovery primary CTAs, styled form Select/fields). This includes at least Study create/edit, Case Framework drawer surfaces, and Timelines drawers (Timeline, Recuerdo, collapse, create recuerdo).

#### Scenario: Study create drawer conforms
- **WHEN** the user opens the create Objeto de Estudio drawer
- **THEN** it shows quarter-width right chrome, starred mark, yellow title, and discovery primary submit

### Requirement: Session instrument Canvases use Session Canvas Header
Study Workspace session instrument routes that render dedicated Canvases (Case Framework overview/sections; Timelines overview/detail) SHALL render the Session Canvas Header pattern so subitem surfaces share one visual language.

#### Scenario: Case Framework and Timelines headers align
- **WHEN** the user navigates from Case Framework overview to Timelines overview
- **THEN** both Canvas headers share mark + eyebrow + title + purpose anatomy
