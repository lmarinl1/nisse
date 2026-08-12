## ADDED Requirements

### Requirement: Profile API exposes theme preference
`GET` and `PATCH` of the current Profile (`/api/profile/me/`) SHALL include `theme_preference`. `PATCH` MUST accept `light`, `dark`, or `system` and MUST reject other values with a field validation error without mutating the Profile.

#### Scenario: Get Profile includes theme_preference
- **WHEN** an authenticated client calls `GET /api/profile/me/`
- **THEN** the 200 body includes `theme_preference` as `light`, `dark`, or `system`

#### Scenario: Patch valid theme preference
- **WHEN** an authenticated client PATCHes `/api/profile/me/` with `theme_preference` set to `light`, `dark`, or `system`
- **THEN** the response status is 200 and the body reflects the updated value

#### Scenario: Patch invalid theme preference rejected
- **WHEN** an authenticated client PATCHes `/api/profile/me/` with an unsupported `theme_preference` value
- **THEN** the API responds with a validation error for that field and does not change the stored preference
