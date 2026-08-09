## ADDED Requirements

### Requirement: Auth screens use research network atmosphere
Login and registration SHALL present the shared research network atmosphere as a full-bleed background layer behind identity content, keeping brand lockup, copy, form fields, errors, and navigation links clearly legible and usable in the foreground.

#### Scenario: Login background atmosphere
- **WHEN** an unauthenticated user opens the login screen
- **THEN** the research network atmosphere appears behind the login UI and form controls remain usable

#### Scenario: Registration background atmosphere
- **WHEN** an unauthenticated user opens the registration screen
- **THEN** the research network atmosphere appears behind the registration UI and form controls remain usable

#### Scenario: Auth content stays legible
- **WHEN** the atmosphere is shown behind login or registration
- **THEN** brand lockup, headings, lede, inputs, primary action, and switch link remain clearly readable (scrim allowed only as a light reading aid, not a washout)
