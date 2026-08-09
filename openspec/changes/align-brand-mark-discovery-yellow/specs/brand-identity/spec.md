## Purpose

Defines how NISSE presents its brand mark and color roles on product identity surfaces so the telescope lockup reads as the same discovery accent as active UI icons, without turning the research workspace into marketing chrome.

## ADDED Requirements

### Requirement: In-app brand mark uses discovery accent
On product identity lockups (authentication, Campo / Study entry, Workspace rail, diagnostics identity chrome), the telescope brand mark SHALL render in discovery yellow (`--color-discovery-primary` or equivalent token), matching the accent used for active UI icons. The mark MUST NOT appear in brand-neon lime on those in-app lockups.

#### Scenario: Workspace lockup matches active icon accent
- **WHEN** an authenticated user views the Study Workspace rail with the brand lockup and an active research-session icon
- **THEN** the brand mark and the active session icon share the discovery accent color family (not brand neon for the mark)

#### Scenario: Entry lockups use discovery mark
- **WHEN** a user views authentication or Campo entry identity chrome
- **THEN** the brand mark in the lockup uses the discovery accent token rather than brand-neon fill

### Requirement: Brand neon reserved outside research chrome
Brand-neon (`--color-brand-neon` / official fixed-color SVG assets) MAY remain the canonical marketing and export kit color for the telescope. Neon MUST NOT wholesale replace discovery accents across panels, atmosphere, or research chrome. In-app lockups MUST prefer discovery over neon.

#### Scenario: Research UI keeps discovery accent
- **WHEN** research atmosphere or discovery emphasis is shown in the Study entry
- **THEN** discovery/research accent tokens remain the UI research accent and are not swapped for brand neon across the whole surface

#### Scenario: Official assets may retain neon
- **WHEN** a designer exports or references the official brand kit outside the in-app lockup
- **THEN** neon may still appear on those kit assets without forcing neon into Workspace/Campo/auth lockups
