## ADDED Requirements

### Requirement: Complete work identity fields
The system SHALL persist for each Profile the work-identity fields: first name (nombre), last name (apellidos), role title (cargo), country calling code, mobile phone number, email address, and username. All of these fields MUST be required when the user saves their Profile. The Profile MUST remain a personal work identity for the Diseñador de Futuros and MUST NOT become a social profile.

#### Scenario: Profile exposes complete identity fields
- **WHEN** an authenticated user retrieves their Profile after it has been completed
- **THEN** the Profile includes nombre, apellidos, cargo, country code, celular, correo electrónico, and username

#### Scenario: Incomplete save rejected
- **WHEN** an authenticated user attempts to save their Profile omitting a required identity field
- **THEN** the system rejects the save and surfaces field-level validation without applying a partial invalid update

### Requirement: Initials avatar from name parts
The system SHALL derive avatar initials as the uppercase first letter of nombre plus the uppercase first letter of apellidos (first Unicode letter in each field after trim). The system MUST NOT use photographs, generated avatars, or per-user accent colors for the avatar.

#### Scenario: Compound last name initials
- **WHEN** nombre is `Miguel` and apellidos is `García López`
- **THEN** the initials are `MG`

#### Scenario: Missing name parts fall back safely
- **WHEN** nombre or apellidos is unexpectedly empty at render time
- **THEN** the system still produces a stable initials string without inventing false personal data beyond available letters or a documented neutral fallback (e.g. single letter or `?`)

### Requirement: Shared UserIdentity presentation
The system SHALL present the authenticated user's identity through a single reusable identity presentation with variants for header, workspace, dropdown, and settings. All variants MUST read the same profile source of truth for nombre, username, initials, and cargo. Username MUST display with an `@` prefix and MUST NOT be substituted by email.

#### Scenario: Header shows first name and username
- **WHEN** the header identity variant renders a completed Profile
- **THEN** it shows circular initials (transparent fill, yellow border, yellow initials), the first name only (not apellidos), and `@username`

#### Scenario: Workspace identity stays secondary to brand
- **WHEN** the workspace/entry identity variant renders beside the NISSE brand mark
- **THEN** it shows avatar, first name, and `@username` more discreetly than the header control and does not visually overpower the brand

#### Scenario: Dropdown identity includes cargo
- **WHEN** the user opens the identity dropdown
- **THEN** the dropdown header shows initials, first name, `@username`, and cargo, with actions for Settings and Cerrar sesión using official iconography (no emojis)

### Requirement: Profile updates propagate immediately
The system SHALL keep a single client-side source of truth for the authenticated Profile. After a successful Profile save, Header, Workspace/entry identity, dropdown, and Settings MUST reflect the new values without requiring logout or login.

#### Scenario: Save refreshes all identity surfaces
- **WHEN** the user successfully saves Profile changes in Settings
- **THEN** every visible identity surface updates to the saved values in the same session
