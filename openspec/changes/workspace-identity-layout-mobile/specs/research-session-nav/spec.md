## ADDED Requirements

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
