## ADDED Requirements

### Requirement: Integrated chevron on Case Framework primary item
The Case Framework primary Sidebar item SHALL include an expand/collapse chevron **inside** the selectable primary control (MUST NOT be a separate external button beside the item). The chevron MUST indicate whether children are expanded or collapsed. On pointer hover over the primary item (or its chevron affordance within the item), the chevron MUST use discovery yellow with a circular halo. Expanding and collapsing MUST remain available without leaving the Study.

#### Scenario: Chevron lives inside primary selector
- **WHEN** the owner views Marco del objeto de estudio in the Sidebar
- **THEN** the expand/collapse chevron is visually inside the primary selectable item, not an external adjacent button

#### Scenario: Hover yellow halo on chevron
- **WHEN** the pointer hovers the primary Case Framework item
- **THEN** the chevron appears in discovery yellow with a circular halo

#### Scenario: Chevron reflects expanded state
- **WHEN** the Case Framework children are expanded and then collapsed
- **THEN** the chevron orientation (or equivalent state) updates to match expanded vs collapsed

### Requirement: Capsule scrollbar for research session menu
The research session Sidebar menu scrollbar SHALL be thinner than a default OS scrollbar and SHALL present as a soft discovery-yellow capsule sliding along a thin line, not as a heavy track/rail. Scrolling MUST remain usable with pointer and equivalent input.

#### Scenario: Capsule scrollbar appearance
- **WHEN** the Proceso session list overflows and a scrollbar is shown
- **THEN** the thumb appears as a thin soft-yellow capsule on a line rather than a thick conventional track
