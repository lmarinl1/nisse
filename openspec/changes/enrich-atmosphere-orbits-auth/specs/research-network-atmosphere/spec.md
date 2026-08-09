## ADDED Requirements

### Requirement: Denser thinner orbital structure
The research network atmosphere SHALL render more concentric orbital rings than the previous five-ring field, with thinner stroke weight so the structure reads as delicate observatory geometry rather than chart chrome.

#### Scenario: More thin orbits visible
- **WHEN** the atmosphere is shown with motion enabled or as a static reduced-motion frame
- **THEN** the viewer perceives a denser set of faint concentric orbits with thinner lines than before

### Requirement: Shorter abundant connections
The atmosphere SHALL form more near-neighbor edges over time, preferring shorter connection lengths so the field reads as a local plexus rather than long spokes across the viewport.

#### Scenario: Short edges dominate
- **WHEN** the atmosphere is animating with motion enabled
- **THEN** newly appearing connections are predominantly short (near-neighbor) and more numerous than the prior sparse long-edge behavior

### Requirement: Nodes beyond the outer orbits
The atmosphere SHALL include some nodes (and their short connections) that sit outside the outermost drawn orbital ring, extending the relational field slightly beyond the ring structure without becoming a full-screen particle scatter.

#### Scenario: Extra-orbital nodes
- **WHEN** the atmosphere is visible behind Study entry or authentication
- **THEN** at least some glowing nodes and short edges appear outside the outermost orbit

### Requirement: Dense center emergence and fade
The atmosphere SHALL keep a soft radial fade from the center and SHALL present denser particle presence near the nucleus, with points that emerge and fade more densely toward the core than toward the outer rings.

#### Scenario: Center denser than rim
- **WHEN** the atmosphere is visible
- **THEN** the core region shows denser emerge/fade particle activity and a preserved soft radial fade, while outer rings remain comparatively sparser

### Requirement: Bidirectional orbital motion
When motion is enabled, nodes SHALL continue to orbit in mixed clockwise and counter-clockwise directions across rings (or node cohorts), preserving the contemplative counter-motion already preferred in the motif.

#### Scenario: Mixed orbital directions
- **WHEN** the atmosphere is animating with motion enabled
- **THEN** some nodes move clockwise and others counter-clockwise rather than all sharing a single direction

### Requirement: Atmosphere on authentication surfaces
Login and registration surfaces SHALL mount the same shared research network atmosphere as a non-interactive full-bleed background behind identity content (brand lockup, headings, form, and switch links).

#### Scenario: Login shows shared atmosphere
- **WHEN** an unauthenticated user opens the login route
- **THEN** the research network atmosphere is visible behind the login content without capturing pointer events meant for the form

#### Scenario: Registration shows shared atmosphere
- **WHEN** an unauthenticated user opens the registration route
- **THEN** the research network atmosphere is visible behind the registration content without capturing pointer events meant for the form

## MODIFIED Requirements

### Requirement: First placement on Objeto de Estudio entry
The Study library / Empty State entry surface SHALL include the research network atmosphere as its background motif. Authentication (login and registration) SHALL also use the same shared component as background. Other surfaces MAY adopt it later via the same shared component.

#### Scenario: Library shows atmosphere
- **WHEN** an authenticated user views the Objeto de Estudio library or Empty State
- **THEN** the research network atmosphere is visible behind that surface

#### Scenario: Auth surfaces share the motif
- **WHEN** a user views login or registration
- **THEN** the same shared atmosphere motif is used (not a one-off decorative background unique to auth)
