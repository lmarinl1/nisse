## Purpose

Defines how NISSE presents its official brand mark, favicon, UI icon set, and brand color roles across product identity surfaces without turning the research workspace into decorative marketing chrome.

## ADDED Requirements

### Requirement: Official favicon in the document head
The application SHALL expose the official compact brand mark as the browser favicon (SVG) so the tab and bookmark identity match the NISSE telescope mark without decorative stars.

#### Scenario: Favicon loads
- **WHEN** a user opens any frontend route in a browser
- **THEN** the document head references the official favicon brand asset and the tab displays the compact telescope mark

### Requirement: Brand mark on identity entry surfaces
Identity and entry surfaces (authentication, Study home / library entry, and diagnostic identity chrome) SHALL present the official brand mark together with the NISSE wordmark, with clear space around the mark, and MUST NOT use the mark as decorative filler elsewhere on the canvas.

#### Scenario: Auth entry shows mark
- **WHEN** an unauthenticated user opens the authentication screen
- **THEN** they see the official brand mark and the NISSE wordmark as the primary product identity signal

#### Scenario: Study entry shows mark
- **WHEN** an authenticated user lands on the Study home / library entry
- **THEN** the header identity area shows the official brand mark with the NISSE wordmark

#### Scenario: Diagnostics identity chrome
- **WHEN** a user opens the diagnostics identity surface
- **THEN** the brand mark appears with the wordmark instead of typography-only branding

### Requirement: Compact mark for dense chrome
When a header or navigation slot is too small for the official mark with stars, the product SHALL use the favicon (compact) brand variant rather than scaling the official mark until stars become noise.

#### Scenario: Compact chrome uses favicon variant
- **WHEN** a dense header or compact identity slot needs a mark at roughly 16–32 px
- **THEN** the UI uses the compact favicon brand variant

### Requirement: UI icons from the official set
Interactive instruments and actions that need an icon SHALL use the official UI icon set. The product MUST NOT introduce third-party icon libraries or ad-hoc emoji as product iconography for concepts already covered by the set.

#### Scenario: Action uses catalog icon
- **WHEN** a header or study control exposes an action that has a matching catalog icon (for example close, plus, more, home)
- **THEN** that control renders the corresponding official UI icon

#### Scenario: No external icon pack
- **WHEN** developers add new iconography for an existing concept
- **THEN** they reuse or extend the official UI icon set instead of importing an external icon library

### Requirement: Brand neon vs discovery accent roles
The product SHALL keep brand-mark neon as the identity color of the telescope mark and SHALL keep discovery yellow as the research/UI accent. Neon MUST NOT wholesale replace discovery accents across panels, atmosphere, or research chrome.

#### Scenario: Mark keeps neon identity
- **WHEN** the official brand mark is shown on an identity surface
- **THEN** its neon yellow identity remains that of the brand mark asset (or tokenized brand neon for currentColor variants when used)

#### Scenario: Research UI keeps discovery accent
- **WHEN** research atmosphere or discovery emphasis is shown in the Study entry
- **THEN** discovery/research accent tokens remain the UI research accent and are not swapped for brand neon across the whole surface
