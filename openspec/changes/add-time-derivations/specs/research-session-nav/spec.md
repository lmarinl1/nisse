## ADDED Requirements

### Requirement: Derivaciones del tiempo session without accordion children
Within the research Sidebar, **Derivaciones del tiempo** (`time-derivations`) SHALL appear as a primary session item with no accordion subitems. Selecting it MUST open its Canvas directly. The item MUST use a semantically related official catalog icon for branching, network, or derivation (for example `branch` or `network`), and MUST NOT use a calendar or clock glyph.

#### Scenario: Direct open without subitems
- **WHEN** the owner selects Derivaciones del tiempo
- **THEN** the browser location becomes `/studies/:studyId/time-derivations`, the session Canvas opens, and no Sidebar children are listed under that item

#### Scenario: Non-temporal clock icon avoided
- **WHEN** an authenticated user views the Sidebar entry for Derivaciones del tiempo
- **THEN** the icon is a branching/network-style catalog glyph rather than a calendar or clock

## MODIFIED Requirements

### Requirement: Eight ordered research sessions
The Sidebar SHALL list the research sessions in this order, with Spanish product labels: (1) Marco del objeto de estudio, (2) Derivaciones del tiempo, (3) Líneas de tiempo, (4) Fuerzas de evolución, (5) Ejes críticos, (6) Escenarios, (7) Narrativas, (8) Validación, (9) Evaluación, (10) Monitoreo. Each item MUST show a semantically related icon from the official NISSE icon catalog. Session count MUST remain consistent with the product session catalog.

#### Scenario: Ordered session list
- **WHEN** an authenticated user is inside a Study Workspace
- **THEN** the Sidebar shows those sessions in that order, each with an icon, and Derivaciones del tiempo appears immediately below Marco del objeto de estudio and above Líneas de tiempo

### Requirement: URL-addressable sessions
Each research session SHALL be addressable by a stable semantic session segment under the existing Study route convention `/studies/:studyId/:session`. Session ids MUST include: `case-framework`, `time-derivations`, `timelines`, `evolution-forces`, `critical-axes`, `scenarios`, `narratives`, `validation`, `evaluation`, `monitoring`. Navigation MUST update the browser URL so history, reload, and shared links restore the same session. Session selection MUST NOT rely only on ephemeral React state.

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

#### Scenario: Deep link to time-derivations
- **WHEN** an authenticated owner opens a copied URL `/studies/:studyId/time-derivations`
- **THEN** they land on Derivaciones del tiempo for that Study without first visiting another session

### Requirement: Independent empty Canvas per session
Each research session other than `case-framework`, `time-derivations`, and `timelines` SHALL render its own Canvas as the primary Workspace surface and MUST start empty in this capability until a future change adds content. The `case-framework` session SHALL render the Case Framework overview or section Canvas. The `time-derivations` session SHALL render the derivation graph Canvas defined by the time-derivations capability. The `timelines` session SHALL render the timelines overview or individual Timeline Canvas. The visual workspace state of one session MUST NOT replace or accidentally share another session's Canvas state. All sessions MUST remain scoped to the same Objeto de Estudio.

#### Scenario: Distinct empty canvases
- **WHEN** the user opens Derivaciones del tiempo and then Fuerzas de evolución
- **THEN** Derivaciones del tiempo shows its research instrument Canvas and Fuerzas de evolución shows its own empty Canvas belonging to the same Study, without carrying over the other session's canvas surface identity

#### Scenario: Distinct canvases across sessions
- **WHEN** the user opens Derivaciones del tiempo and then Líneas de tiempo
- **THEN** each route shows its own research instrument Canvas belonging to the same Study, without carrying over the other session's canvas surface identity

#### Scenario: Time-derivations is not an empty placeholder
- **WHEN** the owner is on `/studies/:studyId/time-derivations`
- **THEN** the Canvas presents the derivation graph instrument (or its loading/empty research states), not a generic empty session placeholder

### Requirement: Invalid session segment handling
When the session segment is not one of the defined research session ids (including `time-derivations`), the system SHALL recover without leaving the Study by directing the user to the default session `case-framework`.

#### Scenario: Unknown session recovers to default
- **WHEN** an authenticated owner opens `/studies/:studyId/not-a-session`
- **THEN** the client resolves to `/studies/:studyId/case-framework` within the same Study Workspace
