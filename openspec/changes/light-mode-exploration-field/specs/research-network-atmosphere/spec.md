## ADDED Requirements

### Requirement: Theme-aware atmosphere variants
The research network atmosphere SHALL select its visual metaphor from the resolved document theme (`data-theme`): **orbital observatory** when dark, **exploration field** when light. The same mount points (Auth entry and Study entry) MUST use the shared component; the variant MUST switch when the resolved theme changes without remounting the route.

#### Scenario: Light theme uses exploration field
- **WHEN** the resolved appearance is light and Auth or Study entry mounts the atmosphere
- **THEN** the background renders the exploration-field metaphor (no orbital rings, no dense yellow nucleus/cloud)

#### Scenario: Dark theme keeps orbital atmosphere
- **WHEN** the resolved appearance is dark and Auth or Study entry mounts the atmosphere
- **THEN** the background continues to render the existing orbital network metaphor

#### Scenario: Theme switch updates atmosphere metaphor
- **WHEN** the user changes resolved appearance between light and dark while remaining on Auth or Study entry
- **THEN** the atmosphere switches to the matching metaphor without requiring a full page reload

### Requirement: Light-mode exploration field
In light mode the atmosphere SHALL depict a clear-field exploration surface: sparse yellow particles that fade in and out, with edges that form incomplete small networks/graphs—appearing, branching briefly, and dissolving—without converging into a stable fully connected graph. The sole accent color for particles and edges MUST be brand neon `#D7FF2F` (or the semantic brand-neon token mapping to that value). Motion MUST feel like relational discovery, not outer space; density MUST stay low; glow MUST stay soft/minimal (no cyberpunk bloom).

#### Scenario: Incomplete networks emerge and fade
- **WHEN** the light exploration field is animating with motion enabled
- **THEN** small incomplete clusters of connections form and dissolve over time rather than locking into a complete graph

#### Scenario: No orbital or nucleus motifs in light
- **WHEN** the light exploration field is visible
- **THEN** there are no orbital ellipses/rings and no dense central yellow cloud/nucleus comparable to the dark orbital core

#### Scenario: Brand neon as sole accent
- **WHEN** the light exploration field draws particles and edges
- **THEN** their accent color is brand neon `#D7FF2F` (via token), not arbitrary multi-hue accents

### Requirement: Subtle cursor affinity in light exploration field
The light exploration field SHALL respond subtly to pointer movement within its layer: nearby nodes react (e.g. slight attraction or emphasis) and MAY reveal additional short-lived connections near the cursor. The atmosphere MUST remain `aria-hidden` and MUST NOT steal clicks or block foreground UI interaction (pointer events pass through to content except as needed for passive tracking that does not capture).

#### Scenario: Nearby nodes react to cursor
- **WHEN** the pointer moves over the Auth or Study entry while the light exploration field is active
- **THEN** nodes near the cursor show a subtle reaction and may briefly reveal extra incomplete connections

#### Scenario: Foreground controls stay usable
- **WHEN** the user clicks or focuses primary Auth/Study controls over the atmosphere
- **THEN** those controls receive the interaction and the atmosphere does not intercept the activation

### Requirement: UX framework documents dual atmospheres
The Design Language docs SHALL describe the dual metaphors: dark = orbital observatory network; light = exploration field of incomplete relational graphs; accent rules; reduced-motion behavior; and the product metaphor that NISSE explores unseen relations rather than predicting the future.

#### Scenario: Visual and motion docs cover both modes
- **WHEN** a designer or agent reads the UX framework visual/motion guidance for entry atmospheres
- **THEN** both dark orbital and light exploration-field behaviors are documented with identity constraints

## MODIFIED Requirements

### Requirement: Reusable research network atmosphere
The system SHALL provide a reusable visual atmosphere component that renders a theme-aware discovery network motif—orbital dark-field or light exploration field—where connections appear and fade over time. The component MUST be usable as a non-interactive background layer behind research and auth entry surfaces.

#### Scenario: Atmosphere renders as background layer
- **WHEN** a research or auth entry surface mounts the research network atmosphere
- **THEN** nodes and connecting lines animate behind the primary content without capturing pointer events meant for that content

#### Scenario: Connections evolve over time
- **WHEN** the atmosphere is animating with motion enabled
- **THEN** edges between nodes appear and disappear gradually rather than remaining a static fully-connected graph

### Requirement: Contemplative, not decorative noise
The atmosphere SHALL remain low-contrast enough that primary copy and research panels stay readable on both dark and light surfaces. It MUST evoke relational exploration (observatory in dark; exploration field in light) and MUST NOT resemble a dashboard chart, KPI widget, cyberpunk particle storm, or attention-grabbing marketing loop.

#### Scenario: Content remains readable
- **WHEN** the Study library or Empty State is shown with the atmosphere behind it
- **THEN** headings, body copy, and primary actions remain clearly legible

### Requirement: Stronger discovery presence
In dark mode, the research network atmosphere SHALL render nodes, edges, and orbital structure with sufficient discovery-yellow intensity to be clearly perceptible on the dark workspace background, without becoming a marketing glow or obscuring foreground content. In light mode, presence SHALL come from sparse brand-neon particles and incomplete graphs at low opacity—perceptible but quieter than dark—never a dense yellow wash.

#### Scenario: Atmosphere is clearly visible
- **WHEN** an authenticated user views the Objeto de Estudio library or Empty State with the atmosphere mounted in dark mode
- **THEN** the yellow network is visibly appreciable behind the content (not nearly invisible due to excessive opacity suppression)

#### Scenario: Light presence stays subtle
- **WHEN** the same surfaces mount the atmosphere in light mode
- **THEN** the exploration field is perceptible without dominating the warm paper background or washing out text
