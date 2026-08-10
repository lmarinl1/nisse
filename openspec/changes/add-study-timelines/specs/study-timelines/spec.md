## Purpose

Define the study timelines research instrument: design of time and emergence contexts through Timelines, Recuerdos (Recalls), Momentos, and collapses between lines — so the Futures Designer can progressively ask why a problem appears here and now.

## ADDED Requirements

### Requirement: Timelines belong to exactly one Study
The system SHALL associate every Timeline, Recuerdo, Momento, and collapse with exactly one Study Aggregate Root. The system MUST NOT allow orphan temporal artifacts outside a Study or shared across Studies.

#### Scenario: Timeline scoped to Study
- **WHEN** the owner opens Líneas de tiempo for Study A
- **THEN** only timelines and recuerdos persisted for Study A are shown, never content from Study B

### Requirement: Default principal Timeline on Study creation
When a Study is created, the system SHALL automatically create exactly one principal Timeline for that Study. The principal Timeline's initial name MUST equal the Study name. The principal Timeline MUST be marked as the default/principal line (`is_default`), MUST appear first among active timeline subitems, and MUST NOT be permanently deletable.

#### Scenario: Principal timeline created with Study
- **WHEN** an authenticated user creates a Study named "Interacción Humanos-Agentes"
- **THEN** a principal Timeline named "Interacción Humanos-Agentes" exists for that Study and is the first active subitem under Líneas de tiempo

#### Scenario: Principal timeline protected from hard delete
- **WHEN** the owner attempts to permanently delete the principal Timeline
- **THEN** the system rejects the deletion and the Timeline remains available

### Requirement: Timeline attributes
Each Timeline SHALL persist at least: name (required), description (optional), classification (`real` | `fictional`, required), retrospective year (required, supporting BCE, CE, present, and future years), status (`active` | `archived`), principal flag, created_at, and updated_at. Timeline classification and Recuerdo classification MUST be independent.

#### Scenario: Create fictional future timeline
- **WHEN** the owner creates a Timeline with classification Ficticia and retrospective year 2030
- **THEN** the Timeline is persisted as active with those values and appears in the active list

#### Scenario: Independent classifications
- **WHEN** the owner creates a Recuerdo classified Hipotético on a Timeline classified Real
- **THEN** both classifications persist without mutual constraint

### Requirement: Timeline overview Canvas
The overview route `/studies/:studyId/timelines` SHALL present an exploration surface for the Study's timelines (not an administrative table as the primary metaphor). The owner MUST be able to create a Timeline (via Drawer), view active and archived timelines, search timelines, open a Timeline, archive an active Timeline, restore an archived Timeline, and permanently delete only an archived non-principal Timeline. Active Timelines MUST NOT be permanently deletable without first being archived. Each timeline unit MUST show at least: name, description, classification, retrospective year, recuerdo count, last updated, status, and principal indicator. Lightweight aggregate metrics MAY appear as secondary context.

#### Scenario: Create timeline from overview
- **WHEN** the owner creates a Timeline from the overview Drawer with required name, classification, and retrospective year
- **THEN** the Timeline is persisted, appears immediately as an active Sidebar subitem, and is openable at its own URL

#### Scenario: Archive then hard delete
- **WHEN** the owner archives a non-principal Timeline and then permanently deletes it after explicit confirmation
- **THEN** the Timeline and its exclusively owned recuerdos, momentos, and collapse memberships that depend only on it are removed

#### Scenario: Active timeline cannot hard delete
- **WHEN** the owner attempts to permanently delete an active Timeline
- **THEN** the system does not permanently remove it

#### Scenario: Restore archived timeline
- **WHEN** the owner restores an archived Timeline
- **THEN** its status becomes active and it reappears as a Sidebar subitem

### Requirement: Archived Timeline constraints
An archived Timeline SHALL remain readable, MUST NOT allow creating new Recuerdos, MUST retain existing Recuerdos and collapse relationships, and MUST be restorable. Archived Timelines MUST NOT appear as default Sidebar subitems; they are consulted from the overview.

#### Scenario: No new recuerdo on archived timeline
- **WHEN** the Timeline is archived and the owner attempts to create a Recuerdo on it
- **THEN** the system rejects the creation

### Requirement: Individual Timeline Canvas
Each Timeline SHALL have a Canvas at `/studies/:studyId/timelines/:timelineId` that presents a **vertical** temporal track. The track MUST begin at the Timeline's retrospective year and extend to a dynamic horizon: max(current date, farthest recuerdo date). A visual marker for Hoy/Presente MUST appear when the horizon includes the present. Recuerdos MUST be ordered chronologically using a normalized temporal representation (not string sort alone), including BCE and future dates. The Canvas MUST feel like a temporal exploration instrument (nodes/traces), not a chronological table or CRUD list as the primary view. Recuerdos are created only from this Canvas, not from the overview.

#### Scenario: Vertical track from retrospective to horizon
- **WHEN** a Timeline has retrospective year 1980 and a recuerdo dated 2045
- **THEN** the track spans from 1980 through a Hoy/Presente marker to at least 2045

#### Scenario: BCE ordering
- **WHEN** Recuerdos exist dated 500 a.C., 44 a.C., and 1492
- **THEN** they appear in that chronological order on the track

#### Scenario: Create recuerdo only on timeline canvas
- **WHEN** the owner is on the timelines overview
- **THEN** they cannot create a Recuerdo without opening an individual Timeline Canvas

### Requirement: Recuerdo attributes and Drawer
A Recuerdo SHALL persist: title (required), date (required; BCE/CE/present/future), location (optional free text, not requiring coordinates), description Markdown (required), classification (`verified` | `approximate` | `hypothetical` | `fiction`, required), created_at, and updated_at. Selecting a Recuerdo MUST open a right-side Drawer that keeps Timeline context visible and allows viewing/editing fields, managing Momentos, saving, and initiating collapses — without navigating to another page. Classification MUST NOT rely on color alone (icons, badges, node style, or labels). The on-track summary MUST show title, date, description, classification, created, and updated; Momentos are detailed in the Drawer only.

#### Scenario: Open recuerdo drawer
- **WHEN** the owner activates a Recuerdo node on the track
- **THEN** a Drawer opens with its detail and edit affordances while the Timeline Canvas context remains visible

#### Scenario: Classification without color-only cue
- **WHEN** the owner views Recuerdos of different classifications
- **THEN** each classification is distinguishable by non-color-only semantics (icon, badge, pattern, or label)

### Requirement: Momentos on a Recuerdo
A Recuerdo SHALL support zero or many Momentos. Each Momento MUST persist at least: title, Markdown content, flexible type, optional reference, created_at, and updated_at. The owner MUST be able to create, edit, and delete Momentos from the Recuerdo Drawer.

#### Scenario: Add momento from drawer
- **WHEN** the owner creates a Momento with title and Markdown content on a Recuerdo
- **THEN** the Momento is persisted and listed in that Recuerdo's Drawer

#### Scenario: Delete momento
- **WHEN** the owner deletes a Momento
- **THEN** subsequent loads omit that Momento while the Recuerdo remains

### Requirement: Timeline collapse between lines
A Recuerdo MAY act as a collapse point connecting two or more Timelines of the same Study. Declaring a collapse MUST: create a Momento representing the collapse, relate the participating Timelines, make the same Recuerdo identity visible on each participating Timeline without unnecessary duplication of primary content, and preserve each Timeline's identity. From the Recuerdo Drawer the owner MUST be able to connect additional Timelines (current Timeline selected by default). The track MUST show an unequivocal non-color-only visual signal that the Recuerdo participates in a collapse, and the detail MUST list the connected Timelines.

#### Scenario: Connect recuerdo to multiple timelines
- **WHEN** the owner connects a Recuerdo on Timeline A to Timelines B and C
- **THEN** a collapse Momento is created, the same Recuerdo identity appears on A, B, and C, and the UI lists those Timelines as connected

#### Scenario: Collapse visual signal
- **WHEN** a Recuerdo participates in a collapse
- **THEN** its node shows a convergence/shared signal distinct from ordinary Recuerdos without relying on color alone

### Requirement: Edit Timeline metadata
From the individual Timeline Canvas the owner SHALL be able to edit name, description, classification, and retrospective year via Drawer. Changing the retrospective year MUST update the visual start of the track without deleting existing Recuerdos.

#### Scenario: Change retrospective year
- **WHEN** the owner changes retrospective year from 1950 to 1900
- **THEN** the track start updates to 1900 and existing Recuerdos remain

### Requirement: Normalized temporal values
The system SHALL store or derive a normalized temporal representation sufficient to sort and compare dates across BCE, CE, present, and future. Product UI MUST present years and dates in a human-comprehensible form (e.g. "500 a.C.", "2026").

#### Scenario: Display BCE year
- **WHEN** a Timeline retrospective year is 500 BCE
- **THEN** the UI shows a comprehensible BCE form and ordering treats it earlier than year 1 CE
