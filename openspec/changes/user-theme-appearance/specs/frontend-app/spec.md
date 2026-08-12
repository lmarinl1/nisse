## ADDED Requirements

### Requirement: App shell respects resolved theme
The frontend SHALL apply the resolved light or dark atmosphere (from Profile `theme_preference`, including `system` device resolution) across authenticated research surfaces and entry/auth chrome so backgrounds, text, panels, and accents follow semantic tokens for the active theme.

#### Scenario: Workspace uses resolved theme tokens
- **WHEN** an authenticated user with a resolved dark or light appearance opens a Study Workspace
- **THEN** Workspace chrome, Canvas stage framing, and panels render using that theme’s semantic tokens

#### Scenario: System preference tracks device while in app
- **WHEN** preference is `system` and the device color-scheme preference changes
- **THEN** the app updates the resolved appearance without requiring navigation away from the current route

### Requirement: Settings Apariencia editing
The Settings surface SHALL let the user select Claro, Oscuro, or Dependiente del dispositivo, keep the choice editable as part of their preferences, and persist via the Profile API so subsequent sessions restore the same preference.

#### Scenario: Persist Apariencia from Settings
- **WHEN** the user changes Apariencia in Settings and saves successfully
- **THEN** the Profile API stores the new `theme_preference` and identity/theme state elsewhere in the SPA reflects it without re-login
