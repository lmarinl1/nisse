## Purpose

Make Case Framework section completion automatic from filled fields, improve right-header spacing, remove the manual terminado toggle, and fix overview tracking proportion without horizontal scroll.

## ADDED Requirements

### Requirement: Comfortable right-header spacing
On each Case Framework section Canvas header, spacing between the right-side elements (Guardado flag when present, progress triad items, and any secondary save hints) SHALL be increased so labels and the flag are not cramped. Vertical and/or gap spacing MUST remain readable at desktop density.

#### Scenario: Right cluster is not cramped
- **WHEN** the owner views a section header with triad and Guardado flag
- **THEN** those elements are separated by clear gaps rather than stacked tightly

### Requirement: No manual Terminado action
The system MUST NOT present a “Marcar como terminado” (or equivalent) user control on the section Canvas. Completion MUST NOT depend on an explicit toggle.

#### Scenario: Toggle absent
- **WHEN** the owner opens any Case Framework section Canvas
- **THEN** no Marcar como terminado switch or equivalent completion action is shown

### Requirement: Automatic Terminado from complete fields
A section SHALL be considered Terminado if and only if every configured field of that section has non-empty content (after trim). Partial content SHALL map to En construcción; all empty SHALL map to Sin comenzar. When fields change such that completeness is lost, Terminado MUST clear automatically. This progress MUST remain non-blocking for navigation and editing.

#### Scenario: All fields filled becomes Terminado
- **WHEN** the owner fills every field of a section with non-empty Markdown
- **THEN** the section progress triad shows Terminado as the active state without a manual completion action

#### Scenario: Emptying a field leaves Terminado
- **WHEN** a Terminado section has one field cleared to empty
- **THEN** the active triad state is no longer Terminado (En construcción if other fields remain, or Sin comenzar if all are empty)

### Requirement: Overview tracking proportional without horizontal scroll
The Case Framework overview header tracking of the five subelements SHALL lay out proportionally across the overview header width and MUST NOT introduce horizontal scrolling of the overview or tracking band.

#### Scenario: Tracking spans header width without overflow-x
- **WHEN** the owner views the Case Framework overview on a desktop viewport
- **THEN** the five-stage tracking distributes across the header width without a horizontal scrollbar on that band or overview frame
