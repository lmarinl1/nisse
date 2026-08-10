## ADDED Requirements

### Requirement: Timelines accordion with active children
Within the research Sidebar, **Líneas de tiempo** (`timelines`) SHALL behave as an expandable accordion item. When expanded, it MUST list active Timelines of the current Study as subitems, with the principal Timeline first. Only one primary Sidebar session item MAY be expanded at a time (consistent with exclusive expansion already used by Case Framework). Archived Timelines MUST NOT appear as default Sidebar subitems.

#### Scenario: Expand shows active timelines
- **WHEN** the owner expands Líneas de tiempo and the Study has a principal Timeline plus one additional active Timeline
- **THEN** both appear as subitems with the principal first

#### Scenario: Archived not in sidebar
- **WHEN** a Timeline is archived
- **THEN** it no longer appears under the Líneas de tiempo accordion subitems

#### Scenario: Exclusive primary expansion with Case Framework
- **WHEN** Líneas de tiempo is expanded and the owner expands or selects Marco del objeto de estudio
- **THEN** Timeline children hide and Case Framework becomes the expanded/active primary session per exclusive-expansion rules

### Requirement: URL-addressable Timeline subroutes
Each Timeline SHALL be addressable as `/studies/:studyId/timelines/:timelineId`. The overview MUST remain at `/studies/:studyId/timelines`. History, reload, and shared links MUST restore the same overview or Timeline while keeping the Study context. While on a timelines overview or Timeline URL, the Sidebar MUST keep Líneas de tiempo expanded and mark the current overview or Timeline subitem as active. Legacy path segment `prior-knowledge` MUST redirect to `timelines` for the same Study.

#### Scenario: Deep link to a timeline
- **WHEN** an authenticated owner opens `/studies/:studyId/timelines/:timelineId`
- **THEN** that Timeline Canvas is shown, Líneas de tiempo stays expanded, and that Timeline subitem is marked active

#### Scenario: Overview URL
- **WHEN** the owner opens `/studies/:studyId/timelines`
- **THEN** the timelines overview Canvas is shown with Líneas de tiempo expanded/active as the primary item

#### Scenario: Legacy prior-knowledge redirect
- **WHEN** an authenticated owner opens `/studies/:studyId/prior-knowledge`
- **THEN** the client resolves to `/studies/:studyId/timelines` within the same Study Workspace

## MODIFIED Requirements

### Requirement: Eight ordered research sessions
The Sidebar SHALL list the research sessions in this order, with Spanish product labels: (1) Marco del objeto de estudio, (2) Líneas de tiempo, (3) Fuerzas de evolución, (4) Ejes críticos, (5) Escenarios, (6) Narrativas, (7) Validación, (8) Evaluación, (9) Monitoreo. Each item MUST show a semantically related icon from the official NISSE icon catalog. The Líneas de tiempo item MUST use a time/trace-related icon (not the previous folder metaphor for Conocimiento previo). Session count MUST remain consistent with the product session catalog (including Narrativas when that session is part of the catalog).

#### Scenario: Ordered session list
- **WHEN** an authenticated user is inside a Study Workspace
- **THEN** the Sidebar shows those sessions in that order, each with an icon, and the second item is labeled Líneas de tiempo

### Requirement: URL-addressable sessions
Each research session SHALL be addressable by a stable semantic session segment under the existing Study route convention `/studies/:studyId/:session`. Session ids MUST include: `case-framework`, `timelines`, `evolution-forces`, `critical-axes`, `scenarios`, `narratives`, `validation`, `evaluation`, `monitoring`. Navigation MUST update the browser URL so history, reload, and shared links restore the same session. Session selection MUST NOT rely only on ephemeral React state.

#### Scenario: Navigate to a session URL
- **WHEN** the user selects "Escenarios" in the Sidebar
- **THEN** the browser location becomes `/studies/:studyId/scenarios` and that session's Workspace surface is shown

#### Scenario: Browser history between sessions
- **WHEN** the user navigates from one session to another and then uses the browser back control
- **THEN** the previous session URL and its Canvas surface are restored while the Sidebar remains visible

#### Scenario: Reload preserves session
- **WHEN** the user reloads a session URL such as `/studies/:studyId/validation`
- **THEN** the Workspace opens that Study on the Validación session with the Sidebar marking Validación as active

#### Scenario: Deep link to a session
- **WHEN** an authenticated owner opens a copied URL `/studies/:studyId/timelines`
- **THEN** they land on Líneas de tiempo for that Study without first visiting another session

#### Scenario: Deep link to timelines session
- **WHEN** an authenticated owner opens a copied URL `/studies/:studyId/timelines`
- **THEN** they land on Líneas de tiempo for that Study without first visiting another session

### Requirement: Independent empty Canvas per session
Each research session other than `case-framework` and `timelines` SHALL render its own Canvas as the primary Workspace surface and MUST start empty in this capability until a future change adds content. The `case-framework` session SHALL render the Case Framework overview or section Canvas. The `timelines` session SHALL render the timelines overview or individual Timeline Canvas defined by the study-timelines capability instead of an empty placeholder. The visual workspace state of one session MUST NOT replace or accidentally share another session's Canvas state. All sessions MUST remain scoped to the same Objeto de Estudio.

#### Scenario: Distinct empty canvases
- **WHEN** the user opens Líneas de tiempo and then Fuerzas de evolución
- **THEN** timelines shows its research instrument Canvas and Fuerzas de evolución shows its own empty Canvas belonging to the same Study, without carrying over the other session's canvas surface identity

#### Scenario: Distinct canvases across sessions
- **WHEN** the user opens Líneas de tiempo and then Fuerzas de evolución
- **THEN** timelines shows its research instrument Canvas and Fuerzas de evolución shows its own empty Canvas belonging to the same Study

#### Scenario: Timelines is not an empty placeholder
- **WHEN** the owner is on `/studies/:studyId/timelines`
- **THEN** the Canvas presents the timelines overview (or loading/empty research states of that instrument), not a generic empty session placeholder

### Requirement: Active session indication
The Sidebar SHALL visually indicate which research session is currently active according to the URL session segment. When the URL is under `case-framework` (overview or a section), the Sidebar MUST indicate Marco del objeto de estudio as the active primary session and, when a section segment is present, MUST also indicate the active subelement. When the URL is under `timelines` (overview or a Timeline id), the Sidebar MUST indicate Líneas de tiempo as the active primary session and, when a Timeline id is present, MUST also indicate the active Timeline subitem.

#### Scenario: Active session marked
- **WHEN** the location is `/studies/:studyId/critical-axes`
- **THEN** the Sidebar marks "Ejes críticos" as the active session

#### Scenario: Active Timeline marked
- **WHEN** the location is `/studies/:studyId/timelines/:timelineId`
- **THEN** the Sidebar marks Líneas de tiempo as the active primary session and that Timeline as the active subitem

### Requirement: Invalid session segment handling
When the first session segment is not one of the defined research session ids, the system SHALL recover without leaving the Study by directing the user to the default session `case-framework`. When the session is `case-framework` but the section segment is not one of the defined Case Framework section ids, the system SHALL recover to the Case Framework overview for the same Study. When the session is `timelines` but the Timeline id does not exist for the Study (or is invalid), the system SHALL recover to the timelines overview for the same Study.

#### Scenario: Unknown session recovers to default
- **WHEN** an authenticated owner opens `/studies/:studyId/not-a-session`
- **THEN** the client resolves to `/studies/:studyId/case-framework` within the same Study Workspace

#### Scenario: Unknown timeline recovers to overview
- **WHEN** an authenticated owner opens `/studies/:studyId/timelines/not-a-timeline`
- **THEN** the client resolves to `/studies/:studyId/timelines` within the same Study Workspace
