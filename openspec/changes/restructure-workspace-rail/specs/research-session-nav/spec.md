## MODIFIED Requirements

### Requirement: Persistent research session Sidebar
Within a Study Workspace the system SHALL present a persistent lateral research navigation (Sidebar) that remains visible while the user moves between research sessions. The Sidebar MUST NOT be implemented as a modal or as a temporary drawer that dismisses on session change. On desktop viewports the Sidebar vertical order SHALL be: brand lockup; the **Proceso** research-session list as the first primary navigation block; then a bottom-anchored region containing the Objeto de Estudio identity (eyebrow, name, and description/context when present) followed by a permanent control to return to the Campo de investigación. The system MUST NOT place the Objeto de Estudio identity or the return control above the Proceso list.

#### Scenario: Sidebar stays while changing session
- **WHEN** the user selects a different research session in the Sidebar
- **THEN** the Sidebar remains visible and the Workspace stays within the same Objeto de Estudio

#### Scenario: Proceso leads the Sidebar
- **WHEN** an authenticated user views the Study Workspace Sidebar on a desktop viewport
- **THEN** the Proceso session list appears above the Objeto de Estudio identity block and above the return-to-Campo control

#### Scenario: Study context and return sit at the foot
- **WHEN** an authenticated user views the Study Workspace Sidebar on a desktop viewport
- **THEN** the Objeto de Estudio name and context appear in the lower region of the Sidebar and the return-to-Campo control is the last item in that region

### Requirement: Eight ordered research sessions
The Sidebar SHALL list exactly eight research sessions in this order, with Spanish product labels: (1) Marco del objeto de estudio, (2) Conocimiento previo, (3) Fuerzas de evolución, (4) Ejes críticos, (5) Escenarios, (6) Validación, (7) Evaluación, (8) Monitoreo. Each item MUST show a semantically related icon from the official NISSE icon catalog.

#### Scenario: Ordered session list
- **WHEN** an authenticated user is inside a Study Workspace
- **THEN** the Sidebar shows those eight items in that order, each with an icon

### Requirement: Independent empty Canvas per session
Each research session SHALL render its own Canvas as the primary Workspace surface. Canvases MUST start empty in this capability. The visual workspace state of one session MUST NOT replace or accidentally share another session's Canvas state. All sessions MUST remain scoped to the same Objeto de Estudio.

#### Scenario: Distinct empty canvases
- **WHEN** the user opens Marco del objeto de estudio and then Fuerzas de evolución
- **THEN** each route shows its own empty Canvas belonging to the same Study, without carrying over the other session's canvas surface identity

### Requirement: Default session on Study open
Opening a Study without a session segment SHALL resolve into a default research session URL so the Workspace always has an addressable session. The default MUST be `case-framework` (Marco del objeto de estudio).

#### Scenario: Study path redirects to default session
- **WHEN** an authenticated owner opens `/studies/:studyId`
- **THEN** the client navigates to `/studies/:studyId/case-framework` (or equivalent replace navigation) and shows that session's empty Canvas with the Sidebar
