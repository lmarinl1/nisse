## Purpose

Extend the study timelines instrument visuals so the vertical track and Canvas headers align with the shared research Drawer and Session Canvas Header system.

## ADDED Requirements

### Requirement: Timeline track nodes centered on the spine
On the individual Timeline Canvas vertical track, each node/marker circle (recall nodes, present marker, start/horizon markers) SHALL be horizontally centered on the vertical spine so the spine passes through the geometric center (radius midpoint) of every circle. Alignment MUST NOT rely on approximate left offsets that leave circles beside the line.

#### Scenario: Recall node circle sits on the spine center
- **WHEN** the owner views a Timeline with one or more Recuerdos
- **THEN** each recall node’s circular marker is centered on the vertical track line

#### Scenario: Present marker centered
- **WHEN** the Hoy/Presente marker is shown
- **THEN** its circle is centered on the same spine axis as recall nodes

### Requirement: Timelines Canvases use Session Canvas Header
Timelines overview and individual Timeline Canvases SHALL use the official Session Canvas Header (starred brand mark, eyebrow, title, purpose, optional actions aside) so they match other research session instruments.

#### Scenario: Overview header branded
- **WHEN** the owner opens `/studies/:studyId/timelines`
- **THEN** the Canvas header shows mark, eyebrow, title, and purpose

#### Scenario: Detail header branded
- **WHEN** the owner opens an individual Timeline Canvas
- **THEN** the header follows the same anatomy with timeline actions in the secondary region
