## ADDED Requirements

### Requirement: Fivefold density on the first two orbits
The research network atmosphere SHALL place approximately five times as many star/nodes on orbital rings 1 and 2 as those rings held before this change, so the inner two orbits read as clearly denser than outer rings.

#### Scenario: Inner two orbits visibly denser
- **WHEN** the atmosphere is visible on Study entry or authentication
- **THEN** the first two concentric orbits show markedly more star points than they did previously (about ×5 on those rings)

### Requirement: Connection length capped at inter-orbit spacing
Emerging connections between stars MUST NOT exceed the radial distance between two consecutive orbital rings. Edges longer than one orbit step MUST NOT be created or kept as live connections.

#### Scenario: No edge longer than one orbit step
- **WHEN** the atmosphere is animating with motion enabled
- **THEN** every live connection’s length is at most the spacing between adjacent orbits (never spanning further than one ring step)

### Requirement: Slightly denser nucleus
The atmosphere SHALL densify the center a little further (core / innermost field) beyond the prior micro-node baseline, reinforcing the fade and particle presence at the nucleus without turning the whole field uniformly dense.

#### Scenario: Center denser than mid/outer field
- **WHEN** the atmosphere is visible
- **THEN** the nucleus and innermost orbits feel denser than mid and outer rings
