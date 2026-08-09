## Purpose

Define the persistent research-session Sidebar inside a Study Workspace: eight URL-addressable stages, each with its own empty Canvas, without leaving the Objeto de Estudio.

## Requirements

### Requirement: Persistent research session Sidebar
Within a Study Workspace the system SHALL present a persistent lateral research navigation (Sidebar) that remains visible while the user moves between research sessions. The Sidebar MUST NOT be implemented as a modal or as a temporary drawer that dismisses on session change.

#### Scenario: Sidebar stays while changing session
- **WHEN** the user selects a different research session in the Sidebar
- **THEN** the Sidebar remains visible and the Workspace stays within the same Objeto de Estudio

### Requirement: Eight ordered research sessions
The Sidebar SHALL list exactly eight research sessions in this order, with Spanish product labels: (1) Marco del caso de estudio, (2) Conocimiento previo, (3) Fuerzas de evolución, (4) Ejes críticos, (5) Escenarios, (6) Validación, (7) Evaluación, (8) Monitoreo. Each item MUST show a semantically related icon from the official NISSE icon catalog.

#### Scenario: Ordered session list
- **WHEN** an authenticated user is inside a Study Workspace
- **THEN** the Sidebar shows those eight items in that order, each with an icon

### Requirement: URL-addressable sessions
Each research session SHALL be addressable by a stable semantic session segment under the existing Study route convention `/studies/:studyId/:session`. Session ids MUST be: `case-framework`, `prior-knowledge`, `evolution-forces`, `critical-axes`, `scenarios`, `validation`, `evaluation`, `monitoring`. Navigation MUST update the browser URL so history, reload, and shared links restore the same session. Session selection MUST NOT rely only on ephemeral React state.

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
- **WHEN** an authenticated owner opens a copied URL `/studies/:studyId/prior-knowledge`
- **THEN** they land on Conocimiento previo for that Study without first visiting another session

### Requirement: Independent empty Canvas per session
Each research session SHALL render its own Canvas as the primary Workspace surface. Canvases MUST start empty in this capability. The visual workspace state of one session MUST NOT replace or accidentally share another session's Canvas state. All sessions MUST remain scoped to the same Objeto de Estudio.

#### Scenario: Distinct empty canvases
- **WHEN** the user opens Marco del caso de estudio and then Fuerzas de evolución
- **THEN** each route shows its own empty Canvas belonging to the same Study, without carrying over the other session's canvas surface identity

### Requirement: Active session indication
The Sidebar SHALL visually indicate which research session is currently active according to the URL session segment.

#### Scenario: Active session marked
- **WHEN** the location is `/studies/:studyId/critical-axes`
- **THEN** the Sidebar marks "Ejes críticos" as the active session

### Requirement: Default session on Study open
Opening a Study without a session segment SHALL resolve into a default research session URL so the Workspace always has an addressable session. The default MUST be `case-framework` (Marco del caso de estudio).

#### Scenario: Study path redirects to default session
- **WHEN** an authenticated owner opens `/studies/:studyId`
- **THEN** the client navigates to `/studies/:studyId/case-framework` (or equivalent replace navigation) and shows that session's empty Canvas with the Sidebar

### Requirement: Invalid session segment handling
When the session segment is not one of the eight defined ids, the system SHALL recover without leaving the Study by directing the user to the default session `case-framework`.

#### Scenario: Unknown session recovers to default
- **WHEN** an authenticated owner opens `/studies/:studyId/not-a-session`
- **THEN** the client resolves to `/studies/:studyId/case-framework` within the same Study Workspace

### Requirement: Responsive session navigation
On desktop viewports the research Sidebar SHALL remain persistently visible. On smaller viewports the system SHALL adapt using the NISSE UX Framework responsive rules while keeping research navigation available and the current session clearly identifiable. The system MUST NOT remove research session navigation on small screens.

#### Scenario: Compact navigation keeps current session visible
- **WHEN** the Workspace is viewed at a mobile-width viewport
- **THEN** research session navigation remains available in a compact form and the active session remains clearly identifiable

### Requirement: Identity panel composed as mark and text columns
The Study Workspace identity panel SHALL present the official brand mark with stars (discovery-tinted) on the left at a size larger than the previous compact favicon lockup, the wordmark “NISSE” in the upper-right of that panel, and the product motto («El futuro no se predice: se anticipa y se diseña.») in the lower-right of the same panel. The motto MUST remain secondary typography and MUST NOT overpower the brand mark or wordmark.

#### Scenario: Identity layout regions
- **WHEN** an authenticated user views the Study Workspace identity panel on desktop
- **THEN** the starred mark sits on the left, “NISSE” appears to its upper right, and the future motto appears to its lower right within the same framed panel

### Requirement: Compact Sidebar remains usable on small viewports
On smaller viewports the Workspace Sidebar panels SHALL remain available in a stacked compact form: identity, sessions, and Objeto de Estudio stay framed surfaces; research session navigation remains reachable (including horizontal compact session list when needed); the active session remains identifiable. The system MUST NOT remove session navigation on mobile.

#### Scenario: Mobile stacked panels
- **WHEN** the Workspace is viewed at a mobile-width viewport
- **THEN** the three rail panels stack vertically as framed surfaces and session navigation remains usable with the active session identifiable
