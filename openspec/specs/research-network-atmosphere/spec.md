## Purpose

Defines a reusable discovery-yellow network atmosphere of nodes that gently connect and disconnect, expressing relational knowledge emergence as a common NISSE visual motif without becoming interactive chrome or decorative noise.

## Requirements

### Requirement: Reusable research network atmosphere
The system SHALL provide a reusable visual atmosphere component that renders a dark-field network of nodes and edges in discovery yellow (or the current discovery token), where connections appear and fade over time. The component MUST be usable as a non-interactive background layer behind research surfaces.

#### Scenario: Atmosphere renders as background layer
- **WHEN** a research surface mounts the research network atmosphere
- **THEN** nodes and connecting lines animate behind the primary content without capturing pointer events meant for that content

#### Scenario: Connections evolve over time
- **WHEN** the atmosphere is animating with motion enabled
- **THEN** edges between nodes appear and disappear gradually rather than remaining a static fully-connected graph

### Requirement: Contemplative, not decorative noise
The atmosphere SHALL remain low-contrast enough that primary copy and research panels stay readable. It MUST evoke relational exploration (laboratory / observatory) and MUST NOT resemble a dashboard chart, KPI widget, or attention-grabbing marketing loop.

#### Scenario: Content remains readable
- **WHEN** the Study library or Empty State is shown with the atmosphere behind it
- **THEN** headings, body copy, and primary actions remain clearly legible

### Requirement: Respect reduced motion
When the user prefers reduced motion, the system SHALL not run the connecting/disconnecting animation loop. A static or paused network presentation (or no motion) MUST be used instead.

#### Scenario: Reduced motion preference
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** the atmosphere does not continuously animate connections

#### Scenario: Reduced motion with stronger presence
- **WHEN** reduced motion is preferred
- **THEN** the atmosphere does not continuously animate connections even with stronger presence settings

### Requirement: First placement on Objeto de Estudio entry
The Study library / Empty State entry surface SHALL include the research network atmosphere as its background motif. Other surfaces MAY adopt it later via the same shared component.

#### Scenario: Library shows atmosphere
- **WHEN** an authenticated user views the Objeto de Estudio library or Empty State
- **THEN** the research network atmosphere is visible behind that surface

### Requirement: Stronger discovery presence
The research network atmosphere SHALL render nodes, edges, and orbital structure with sufficient discovery-yellow intensity to be clearly perceptible on the dark workspace background, without becoming a marketing glow or obscuring foreground content.

#### Scenario: Atmosphere is clearly visible
- **WHEN** an authenticated user views the Objeto de Estudio library or Empty State with the atmosphere mounted
- **THEN** the yellow network is visibly appreciable behind the content (not nearly invisible due to excessive opacity suppression)

### Requirement: Approximately sixty percent viewport scale
The animated orbital field SHALL occupy roughly sixty percent of the visible viewport area behind the Study entry content (dominant background motif on the content side opposite primary text), scaling responsively with viewport size.

#### Scenario: Field scales with viewport
- **WHEN** the Study entry viewport is resized
- **THEN** the network field remains proportionally large (~60% presence) and continues to fit the surface without clipping awkwardly or requiring horizontal scroll

### Requirement: Foreground stays readable
Despite increased intensity and scale, headings, body copy, and primary actions on the Study entry SHALL remain clearly legible. Any scrim/vignette MUST not crush the atmosphere into invisibility nor wash out text.

#### Scenario: Copy remains legible with stronger atmosphere
- **WHEN** the stronger atmosphere is shown behind the Study library or Empty State
- **THEN** primary text and CTAs remain readable
