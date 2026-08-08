## Purpose

Raises the visual presence of the shared research network atmosphere so discovery-yellow nodes and edges read clearly at roughly sixty percent of the viewport while remaining a responsive, non-interactive background behind research UI.

## ADDED Requirements

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

### Requirement: Reduced motion still respected
When `prefers-reduced-motion: reduce` is active, the atmosphere SHALL not run the continuous connect/disconnect loop (static or paused presentation allowed), even with the stronger presence settings.

#### Scenario: Reduced motion with stronger presence
- **WHEN** reduced motion is preferred
- **THEN** the atmosphere does not continuously animate connections
