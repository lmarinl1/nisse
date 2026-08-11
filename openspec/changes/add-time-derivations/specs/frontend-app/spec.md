## ADDED Requirements

### Requirement: Time-derivations Workspace route
The frontend SHALL expose `/studies/:studyId/time-derivations` nested under authentication inside the Study Workspace shell. Selecting Derivaciones del tiempo MUST render the derivation graph Canvas (not a generic empty placeholder) while the research Sidebar remains visible.

#### Scenario: Authenticated owner opens time-derivations
- **WHEN** an authenticated owner navigates to `/studies/:studyId/time-derivations`
- **THEN** the UI shows the Study Workspace shell with the research Sidebar and the Derivaciones del tiempo graph Canvas

#### Scenario: Unauthenticated time-derivations URL denied
- **WHEN** an unauthenticated user requests `/studies/:studyId/time-derivations`
- **THEN** they are denied the Workspace content (redirect or auth gate) consistent with other Study session routes
