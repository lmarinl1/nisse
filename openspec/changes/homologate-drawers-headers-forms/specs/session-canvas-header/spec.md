## Purpose

Define the official Session Canvas Header for research session subitems and instrument Canvases so every stage reads as the same laboratory surface: brand mark, eyebrow, title, and purpose — never a bare admin h1.

## ADDED Requirements

### Requirement: Official Session Canvas Header anatomy
Each research session Canvas that represents a subitem or instrument overview/detail SHALL present a Session Canvas Header composed of: (1) official brand mark with stars (discovery treatment), (2) eyebrow / tracking label in Spanish, (3) title, (4) short purpose or supporting sentence, and optionally (5) a secondary actions region that does not overpower the title. The header MUST feel like a framed research surface consistent with the Case Framework hero pattern, using design tokens (discovery border/accent, workspace surfaces). The system MUST NOT use a bare unbranded heading block as the default for these Canvases.

#### Scenario: Header includes mark and purpose
- **WHEN** the owner opens a session instrument Canvas that uses Session Canvas Header
- **THEN** the header shows the starred mark, an eyebrow, a title, and a short purpose line

### Requirement: Timelines and Case Framework share the header contract
Case Framework overview/section headers and Timelines overview/detail headers SHALL implement the same Session Canvas Header contract (shared component or shared CSS anatomy). Feature-specific trailing content (progress tracking, timeline actions) MAY differ but MUST sit in the designated secondary region without inventing a second header language.

#### Scenario: Timelines overview uses official header
- **WHEN** the owner opens `/studies/:studyId/timelines`
- **THEN** the Canvas header follows the Session Canvas Header anatomy rather than a lean unbranded hero

#### Scenario: Timeline detail uses official header
- **WHEN** the owner opens an individual Timeline Canvas
- **THEN** the header follows the same anatomy with timeline-specific actions in the secondary region

### Requirement: Future session instruments reuse the header
New research session Canvases added later SHOULD adopt Session Canvas Header as the default. Documentation or shared export MUST make the pattern the official subitem header style for the Workspace.

#### Scenario: Shared module available
- **WHEN** a developer implements a new session Canvas header
- **THEN** they can import the shared Session Canvas Header primitive instead of copying ad-hoc markup
