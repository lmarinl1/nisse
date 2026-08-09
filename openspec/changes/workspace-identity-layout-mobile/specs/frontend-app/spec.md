## ADDED Requirements

### Requirement: Workspace shell is usable on mobile viewports
The Study Workspace shell (rail panels, session Canvas stage, and Companion) SHALL adapt on mobile-width viewports so the research Canvas remains the primary surface, side chrome stacks without solid edge-filled columns, and Companion remains reachable after the stage. Framing (border + radius on background) MUST be preserved. The system MUST NOT require a desktop width to navigate sessions or return to Campo.

#### Scenario: Mobile shell stacking
- **WHEN** an authenticated user opens a Study Workspace at a mobile-width viewport
- **THEN** rail content, Canvas, and Companion stack in a usable order with framed surfaces and working session navigation
