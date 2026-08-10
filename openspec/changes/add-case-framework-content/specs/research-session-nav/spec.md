## ADDED Requirements

### Requirement: Case Framework accordion with five children
Within the research Sidebar, **Marco del objeto de estudio** (`case-framework`) SHALL behave as an expandable accordion item. When expanded, it MUST list its five subelements grouped underneath, with Spanish labels: Tema de partida y evolución conceptual, Marco teórico-conceptual, Conceptos fundamentales para el abordaje, Problemáticas o tensiones establecidas, Objeto de estudio consolidado. Each subelement MUST show a distinct icon from the official NISSE icon catalog. Only one primary Sidebar session item MAY be expanded at a time; opening or selecting another primary session MUST collapse the Case Framework children.

#### Scenario: Expand shows five children
- **WHEN** the owner expands Marco del objeto de estudio
- **THEN** its five subelements appear grouped beneath it with icons

#### Scenario: Exclusive primary expansion
- **WHEN** Marco del objeto de estudio is expanded and the owner selects Fuerzas de evolución
- **THEN** the Case Framework children hide and Fuerzas de evolución becomes the active primary session

### Requirement: URL-addressable Case Framework subroutes
Each Case Framework subelement SHALL be addressable under the Study route family as `/studies/:studyId/case-framework/:section` with section ids `conceptual-evolution`, `theoretical-framework`, `fundamental-concepts`, `tensions`, `consolidated-object`. The overview MUST remain at `/studies/:studyId/case-framework`. History, reload, and shared links MUST restore the same overview or section while keeping the Study context. While on a Case Framework overview or section URL, the Sidebar MUST keep Marco del objeto de estudio expanded and mark the current overview or subelement as active.

#### Scenario: Deep link to a section
- **WHEN** an authenticated owner opens `/studies/:studyId/case-framework/tensions`
- **THEN** the Tensiones Canvas is shown, Marco del objeto de estudio stays expanded, and Tensiones is marked active

#### Scenario: Overview URL
- **WHEN** the owner opens `/studies/:studyId/case-framework`
- **THEN** the integrated Case Framework overview Canvas is shown with Marco del objeto de estudio expanded/active as the primary item

#### Scenario: Browser history between sections
- **WHEN** the owner navigates from conceptual-evolution to consolidated-object and then uses browser back
- **THEN** conceptual-evolution is restored with the Sidebar still showing Case Framework expanded

### Requirement: Discrete progress on Case Framework nav items
The Sidebar MAY show discrete progress indicators for Case Framework subelements. Progress MUST remain non-blocking and MUST NOT prevent selecting any subelement.

#### Scenario: Progress visible without lock
- **WHEN** one subelement is Sin comenzar and another is Con contenido
- **THEN** both remain selectable and any discrete indicators do not disable navigation

## MODIFIED Requirements

### Requirement: Independent empty Canvas per session
Each research session other than `case-framework` SHALL render its own Canvas as the primary Workspace surface and MUST start empty in this capability until a future change adds content. The `case-framework` session SHALL render the Case Framework overview or section Canvas defined by the case-framework capability instead of an empty placeholder. The visual workspace state of one session MUST NOT replace or accidentally share another session's Canvas state. All sessions MUST remain scoped to the same Objeto de Estudio.

#### Scenario: Distinct empty canvases
- **WHEN** the user opens Marco del objeto de estudio and then Fuerzas de evolución
- **THEN** Case Framework shows its research instrument Canvas and Fuerzas de evolución shows its own empty Canvas belonging to the same Study, without carrying over the other session's canvas surface identity

#### Scenario: Case Framework is not an empty placeholder
- **WHEN** the owner is on `/studies/:studyId/case-framework`
- **THEN** the Canvas presents the Case Framework overview (or loading/empty research states of that instrument), not a generic empty session placeholder

### Requirement: Active session indication
The Sidebar SHALL visually indicate which research session is currently active according to the URL session segment. When the URL is under `case-framework` (overview or a section), the Sidebar MUST indicate Marco del objeto de estudio as the active primary session and, when a section segment is present, MUST also indicate the active subelement.

#### Scenario: Active session marked
- **WHEN** the location is `/studies/:studyId/critical-axes`
- **THEN** the Sidebar marks "Ejes críticos" as the active session

#### Scenario: Active Case Framework section marked
- **WHEN** the location is `/studies/:studyId/case-framework/fundamental-concepts`
- **THEN** the Sidebar marks Marco del objeto de estudio as the active primary session and Conceptos fundamentales as the active subelement

### Requirement: Invalid session segment handling
When the first session segment is not one of the defined research session ids, the system SHALL recover without leaving the Study by directing the user to the default session `case-framework`. When the session is `case-framework` but the section segment is not one of the five defined section ids, the system SHALL recover to the Case Framework overview for the same Study.

#### Scenario: Unknown session recovers to default
- **WHEN** an authenticated owner opens `/studies/:studyId/not-a-session`
- **THEN** the client resolves to `/studies/:studyId/case-framework` within the same Study Workspace

#### Scenario: Unknown Case Framework section recovers to overview
- **WHEN** an authenticated owner opens `/studies/:studyId/case-framework/not-a-section`
- **THEN** the client resolves to `/studies/:studyId/case-framework` within the same Study Workspace
