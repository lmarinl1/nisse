## Purpose

Provides the authenticated Settings surface where the Diseñador de Futuros consults and edits their work identity (Perfil) with clear validation, save feedback, and protection against accidental data loss—without becoming an account dashboard.

## ADDED Requirements

### Requirement: Profile form sections
Settings SHALL present a Perfil form grouped as Información personal (nombre, apellidos, cargo), Contacto (country code, celular, correo electrónico), and Identidad (username), with visible labels, field-adjacent validation messages, a prominent initials avatar following the shared initials rules (no photo upload), and a primary action labeled `Guardar cambios`.

#### Scenario: Load existing Profile into form
- **WHEN** an authenticated user opens Settings with a loadable Profile
- **THEN** the form fields are populated from the shared Profile source of truth and the avatar initials match nombre and apellidos

#### Scenario: Field validation on submit
- **WHEN** the user submits invalid or empty required fields
- **THEN** validation messages appear next to the offending fields and the Profile is not saved

### Requirement: Save lifecycle feedback
The save action SHALL support normal, saving, saved, and error states. While saving, the system MUST prevent double submission, keep the form visible, and retain entered values. On success, the system MUST persist via the Profile API, update the shared Profile state, and show discreet non-modal feedback such as `Cambios guardados`. On failure, the system MUST keep entered values, show the error, and allow retry.

#### Scenario: Successful save
- **WHEN** the user saves valid Profile changes
- **THEN** the client persists the update, shows `Cambios guardados` without a blocking modal, and identity surfaces elsewhere reflect the new data

#### Scenario: Failed save retains input
- **WHEN** a Profile update request fails
- **THEN** the form retains the user's input, shows an error, and remains editable for retry

### Requirement: Unsaved changes protection
If the user modifies Profile fields and attempts to leave Settings without saving, the system SHALL warn about unsaved changes and offer to keep editing or leave without saving, using the routing affordances available in the app. Navigation MUST NOT be blocked when there are no dirty changes.

#### Scenario: Dirty navigation warned
- **WHEN** the user has unsaved Profile edits and attempts to navigate away from Settings
- **THEN** the UI prompts to keep editing or leave without saving

#### Scenario: Clean navigation unrestricted
- **WHEN** the user has no unsaved Profile edits and navigates away from Settings
- **THEN** navigation proceeds without an unsaved-changes prompt

### Requirement: Loading and error resilience
While the Profile is loading, Settings and identity chrome SHALL use coherent placeholders/skeletons without inventing false personal data and without breaking layout. If Profile load fails, the UI MUST show a comprehensible error with retry and MUST NOT crash the whole application.

#### Scenario: Profile load failure in Settings
- **WHEN** Settings cannot load the Profile
- **THEN** the user sees an understandable error with a retry path and can continue using other authenticated areas that do not depend on that failed load

### Requirement: Responsive Settings layout
On desktop viewports, Settings content SHALL use a controlled centered width. On small viewports, the form SHALL stack in a single column while remaining usable. The identity header control MUST remain usable across these sizes.

#### Scenario: Narrow viewport form
- **WHEN** an authenticated user opens Settings on a small viewport
- **THEN** the Perfil form renders in a single usable column without horizontal clipping of primary controls
