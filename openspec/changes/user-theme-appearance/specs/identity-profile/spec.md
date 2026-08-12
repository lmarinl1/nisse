## ADDED Requirements

### Requirement: Profile stores theme preference
The Profile SHALL include a `theme_preference` field with allowed values `light`, `dark`, and `system`. The default for new Profiles MUST be `dark`. The field represents a work-atmosphere preference for the Diseñador de Futuros, not a social or public identity attribute.

#### Scenario: New Profile default theme
- **WHEN** the system creates a Profile for an authenticated user
- **THEN** `theme_preference` is `dark`

#### Scenario: Profile response includes theme preference
- **WHEN** an authenticated user retrieves their Profile
- **THEN** the response includes `theme_preference` with one of `light`, `dark`, or `system`
