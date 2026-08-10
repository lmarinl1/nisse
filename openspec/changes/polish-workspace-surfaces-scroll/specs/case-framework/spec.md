## Purpose

Polish Case Framework surfaces so headers match other tiles, status chips are outline-colored, and research content spans the Canvas stage width without dead horizontal space.

## ADDED Requirements

### Requirement: Neutral framework headers with discovery border
Case Framework overview and section headers SHALL use the same background treatment as other research tiles/panels in the Workspace (MUST NOT use a discovery-yellow fill). A discovery-colored border MAY be used to mark the header frame.

#### Scenario: Header background matches tiles
- **WHEN** the owner views a Case Framework section or overview header
- **THEN** the header background matches other canvas tiles/panels and is not filled with discovery yellow

#### Scenario: Header may use yellow border
- **WHEN** the owner views that header
- **THEN** a discovery border may outline the header while the fill remains neutral

### Requirement: Outline status and save chips
Progress and save labels shown in Case Framework headers and related subitem chrome (including Sin comenzar, En construcción, Con contenido, Terminado, and Guardado / Guardando…) SHALL render as outline chips: transparent or neutral fill, with border and text sharing the same semantic color (gray, discovery yellow, or green as appropriate). They MUST NOT use opaque colored background fills as the primary chip treatment.

#### Scenario: Construction chip is outline
- **WHEN** a section status is En construcción
- **THEN** the chip shows discovery-colored text and border without a solid yellow fill

#### Scenario: Terminado chip uses green outline
- **WHEN** a section status is Terminado
- **THEN** the chip uses green border and text without a solid green fill

### Requirement: Case Framework content spans Canvas width
Within the Study Workspace stage, Case Framework overview and section content SHALL occupy the usable width of the Canvas stage so a large empty horizontal band does not remain unused on the right of the content column.

#### Scenario: Content uses stage width
- **WHEN** the owner views a Case Framework Canvas on desktop
- **THEN** the main content column extends across the stage’s usable width rather than leaving a wide unused gutter beside a narrow column
