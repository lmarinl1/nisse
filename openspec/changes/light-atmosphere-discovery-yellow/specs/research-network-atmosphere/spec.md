## MODIFIED Requirements

### Requirement: Light-mode exploration field
In light mode the atmosphere SHALL depict a clear-field exploration surface: sparse yellow particles that fade in and out, with edges that form incomplete small networks/graphs—appearing, branching briefly, and dissolving—without converging into a stable fully connected graph. The sole accent color for particles and edges MUST be the same discovery yellow used by primary CTAs (`--color-discovery-primary` / `color.discovery.primary`, e.g. the **Nueva pregunta** button)—not brand neon `#D7FF2F`. Motion MUST feel like relational discovery, not outer space; density MUST stay low; glow MUST stay soft/minimal (no cyberpunk bloom).

#### Scenario: Incomplete networks emerge and fade
- **WHEN** the light exploration field is animating with motion enabled
- **THEN** small incomplete clusters of connections form and dissolve over time rather than locking into a complete graph

#### Scenario: No orbital or nucleus motifs in light
- **WHEN** the light exploration field is visible
- **THEN** there are no orbital ellipses/rings and no dense central yellow cloud/nucleus comparable to the dark orbital core

#### Scenario: Discovery yellow matches primary CTAs
- **WHEN** the light exploration field draws particles and edges
- **THEN** their accent color matches `--color-discovery-primary` used by primary discovery buttons (such as Nueva pregunta), not `--color-brand-neon`

## ADDED Requirements

### Requirement: Light atmosphere accent tracks discovery token
When the resolved theme is light, the exploration-field renderer SHALL resolve stroke/fill from `--color-discovery-primary` (updating if tokens change on theme switch) so the atmosphere stays chromatically aligned with discovery UI chrome.

#### Scenario: Accent follows discovery primary on light theme
- **WHEN** Auth or Study entry shows the exploration field under light appearance
- **THEN** particle and edge color is computed from `--color-discovery-primary`
