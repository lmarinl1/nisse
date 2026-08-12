## Purpose

Defines how NISSE resolves and applies light versus dark laboratory atmospheres from a user preference (light, dark, or device), using dual semantic tokens so the Workspace stays a research space—not a theming dashboard.

## ADDED Requirements

### Requirement: Dual theme token atmospheres
The system SHALL provide two complete semantic color atmospheres—**dark** (current observatory depth: layered graphite/slate, discovery yellow accent) and **light** (warm technical paper: cream/warm neutrals, high typographic contrast, same discovery accent)—applied via the shared design-token surface so components never hardcode theme-specific hex values.

#### Scenario: Dark atmosphere matches current tokens
- **WHEN** the resolved appearance is dark
- **THEN** workspace backgrounds, surfaces, text, borders, and discovery accents match the previously shipped dark token set (depth, not pure black)

#### Scenario: Light atmosphere is warm technical paper
- **WHEN** the resolved appearance is light
- **THEN** backgrounds are warm off-white/cream (not pure white), surfaces elevate with subtle warmth, text contrast is high, and discovery yellow remains the research accent without copying third-party brand marks

### Requirement: Theme preference values
The system SHALL support exactly three stored preferences: `light`, `dark`, and `system`. `system` MUST resolve to light or dark from the device color-scheme preference and MUST update when that preference changes while the preference remains `system`.

#### Scenario: Explicit light preference
- **WHEN** the user preference is `light`
- **THEN** the resolved appearance is light regardless of device setting

#### Scenario: Explicit dark preference
- **WHEN** the user preference is `dark`
- **THEN** the resolved appearance is dark regardless of device setting

#### Scenario: System follows device
- **WHEN** the user preference is `system` and the device reports a preferred color scheme
- **THEN** the resolved appearance matches that device preference and changes if the device preference changes

### Requirement: Appearance control in Settings
Authenticated Settings SHALL expose an Apariencia control where the user can select Light, Dark, or Dependiente del dispositivo (`system`), edit it as a personal preference, and persist it with the same save lifecycle expectations as other Profile fields (validation, success/error feedback, dirty-state protection when co-edited with Profile).

#### Scenario: Change preference from Settings
- **WHEN** an authenticated user selects a different Apariencia option and saves
- **THEN** the preference is persisted and the resolved theme applies across the application shell without requiring re-login

#### Scenario: Labels in Spanish product copy
- **WHEN** the user views the Apariencia control
- **THEN** options are presented in Spanish product copy (Claro, Oscuro, Dependiente del dispositivo) while stored values remain English identifiers (`light`, `dark`, `system`)

### Requirement: Global application without theme flash
On load, the client SHALL apply the best-known preference (persisted Profile when available; otherwise a safe local default of `dark` preserving the current laboratory default) to the document theme before interactive research chrome paints, and SHALL set `color-scheme` consistently with the resolved appearance.

#### Scenario: Authenticated user sees saved preference
- **WHEN** an authenticated user whose Profile has `theme_preference` opens the app
- **THEN** the UI resolves and applies that preference without a prolonged wrong-theme flash of the opposite atmosphere

#### Scenario: Default before Profile preference exists
- **WHEN** no Profile preference is available yet
- **THEN** the client defaults preference to `dark` so existing laboratory depth is preserved until the user opts into light or system
