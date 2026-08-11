## Purpose

Defines the official NISSE UI icon catalog: technical contract, Set I + Set II contents, registration for product use, Design Language sync, and the hard separation between UI instruments and the brand mark.

## ADDED Requirements

### Requirement: Official UI icon catalog includes Icon Set II
The product SHALL expose the NISSE Icon Set II glyphs as part of the official UI icon catalog alongside the existing Set I glyphs. Set II MUST include the semantic names: clock, clock-fast, hourglass, timer, calendar-time, history, rewind, fast-forward, timeline-clock, orbit, planet, moon, sun, constellation, comet, eclipse, telescope, compass, north, waypoint, route, node, network, branch, tree-graph, edge, directed-edge, hub, cluster, layers, signal, perspective, forecast, and trajectory.

#### Scenario: Set II names are addressable
- **WHEN** a developer or UI control requests any Set II catalog name (for example `timeline-clock`, `telescope`, or `network`)
- **THEN** the official icon API resolves that name to the corresponding glyph without requiring a third-party icon library

#### Scenario: Existing Set I names remain available
- **WHEN** a UI control requests an existing Set I catalog name (for example `graph`, `document`, or `home`)
- **THEN** that name continues to resolve to its official glyph

### Requirement: UI icons follow the NISSE technical contract
Every official UI icon glyph SHALL use a 24×24 viewBox, 2px stroke, round caps and joins, outline geometry, and `currentColor` for stroke so color inherits from product tokens. Product UI MUST NOT hardcode the prototype kit neon hex as the icon stroke color.

#### Scenario: Icon inherits token color
- **WHEN** an official UI icon is rendered inside an element whose CSS `color` uses a product text or discovery token
- **THEN** the icon stroke matches that inherited color via `currentColor`

### Requirement: Brand mark stays outside the UI icon catalog
The official brand mark (telescope identity assets used by `NisseMark` / favicon / brand lockups) MUST remain a separate identity layer from the UI icon catalog. Adding or using the UI glyph named `telescope` MUST NOT replace, redefine, or mutate brand mark assets.

#### Scenario: UI telescope does not replace brand mark
- **WHEN** the UI icon catalog includes `telescope` and an identity surface shows the brand mark
- **THEN** the brand mark continues to come from the brand asset layer, not from the UI icon registry entry

### Requirement: Design Language catalog stays in sync
When the official UI icon catalog gains or remaps glyphs, the Design Language iconography document MUST list the catalog names, suggested semantic uses, conceptual families, and Cognitive Object mappings that the product relies on.

#### Scenario: New Set II entries appear in the framework catalog
- **WHEN** Icon Set II is merged into the product catalog
- **THEN** `docs/ux-framework/10-iconography.md` documents those names and their research-oriented semantic uses
