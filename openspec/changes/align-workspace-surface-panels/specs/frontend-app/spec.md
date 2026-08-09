## ADDED Requirements

### Requirement: Workspace chrome surfaces align with Canvas framing
The Study Workspace shell SHALL present rail panels, the session Canvas, and the Companion as framed surfaces on a shared workspace background, with consistent outer padding so their top edges align in one horizontal band on desktop. The Companion column MUST use the same framed-surface treatment as the Canvas (border, radius, surface fill on background), not a solid edge-to-edge filled column.

#### Scenario: Companion framed like Canvas
- **WHEN** an authenticated user views the Study Workspace Companion on desktop
- **THEN** Companion content appears inside a bordered rounded surface over the workspace background, matching the Canvas framing language

#### Scenario: Desktop band alignment
- **WHEN** the Workspace is viewed at a desktop width
- **THEN** the top of the left rail panels, the Canvas frame, and the Companion frame share a consistent inset from the viewport edge
