## Purpose

Clarify Case Framework section Canvas headers with a three-state progress triad, right-aligned terminado toggle, discreet saved flag, and neutral editor surfaces.

## ADDED Requirements

### Requirement: Section header progress triad
On each Case Framework section Canvas header, the system SHALL present exactly three progress options on the right side: Sin comenzar, En construcción, and Terminado. Inactive options MUST appear muted gray. Only the active option SHALL be lit: Sin comenzar in white (primary text), En construcción in discovery yellow, Terminado in green. For this triad, API status `with_content` and `in_progress` SHALL both map to En construcción; `not_started` to Sin comenzar; `reviewed` to Terminado.

#### Scenario: Active construction lights yellow
- **WHEN** the section status is En construcción (including when API status is `in_progress` or `with_content`)
- **THEN** En construcción is shown in discovery yellow while Sin comenzar and Terminado remain gray

#### Scenario: Active terminado lights green
- **WHEN** the section is Terminado (`reviewed`)
- **THEN** Terminado is shown in green while the other two triad labels remain gray

### Requirement: Terminado toggle on header right
The Marcar como terminado control SHALL sit on the right side of the section Canvas header together with the progress triad (MUST NOT be left as a lone control below the header block without that right-side grouping).

#### Scenario: Toggle grouped on the right
- **WHEN** the owner views a section Canvas header
- **THEN** the terminado toggle appears on the right side with the progress triad

### Requirement: Discreet Guardado flag when saved
When section content is in a saved state (autosave idle after a successful save), the section Canvas SHALL show a discreet “Guardado” flag at the upper-right of the header frame, with discovery-yellow background and restrained styling. The flag MUST NOT dominate the header hierarchy.

#### Scenario: Saved shows yellow Guardado flag
- **WHEN** the section has successfully saved and is not mid-save
- **THEN** a small yellow “Guardado” flag appears at the upper-right of the header box

#### Scenario: Saving does not show Guardado flag
- **WHEN** the section is saving or has unsaved dirty changes
- **THEN** the Guardado flag is not shown as the saved confirmation flag

### Requirement: Neutral editor field backgrounds
Markdown write surfaces (textareas and equivalent editor fields) inside the section Canvas SHALL use the system workspace/canvas background and MUST NOT use a discovery-yellow tinted fill.

#### Scenario: Textarea matches system surface
- **WHEN** the owner views the Escribir tab of a section field
- **THEN** the textarea background matches the neutral workspace/canvas surface, not a yellow wash
