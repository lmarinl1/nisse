## ADDED Requirements

### Requirement: Authenticated Settings route
The frontend SHALL expose an authenticated Settings route (conceptually `/settings`, adapted to the existing router) as a dedicated screen—not a modal—with a single initial section: Perfil. The architecture MUST allow later sections (Preferencias, Notificaciones, Seguridad, Integraciones) without implementing them in this change.

#### Scenario: Navigate to Settings from identity menu
- **WHEN** an authenticated user chooses Settings from the identity dropdown
- **THEN** the UI opens the Settings screen on the Perfil section

#### Scenario: Unauthenticated Settings denied
- **WHEN** an unauthenticated user requests the Settings route
- **THEN** they are redirected to authentication before Settings content is shown

### Requirement: Header identity control and dropdown
On authenticated surfaces that own the primary identity chrome (including the Campo/Study entry header), the frontend SHALL render an interactive user identity control using the shared identity presentation. Activating the control MUST open an accessible dropdown that closes on action selection, outside click, or Escape, and supports keyboard use. The dropdown MUST offer Settings and Cerrar sesión; Cerrar sesión MUST invoke the existing logout flow, clear client auth state, and redirect to authentication while protected routes remain gated.

#### Scenario: Open identity dropdown
- **WHEN** the user activates the header identity control
- **THEN** the dropdown shows identity context plus Settings and Cerrar sesión

#### Scenario: Logout from dropdown
- **WHEN** the user chooses Cerrar sesión
- **THEN** the existing logout flow runs, sensitive client auth state is cleared, and the user lands on authentication

### Requirement: Brand and user coexistence on Study entry
On the authenticated Objeto de Estudio entry (library or Empty State) where the NISSE brand already appears, the frontend SHALL show a discreet user identity reference (avatar, first name, `@username`) that coexists with the brand without competing with it, using the shared identity presentation rather than duplicated ad-hoc markup.

#### Scenario: Entry shows brand plus user
- **WHEN** an authenticated user lands on the Study entry route
- **THEN** the NISSE brand remains primary and a secondary user identity reference is visible nearby

### Requirement: Settings is not a dashboard
The Settings screen SHALL remain a focused laboratory utility: sobria editorial layout using existing tokens, surfaces, borders, Discovery Yellow accent, and official icons—without decorative cards, new color systems, strong shadows, or SaaS account-dashboard chrome.

#### Scenario: Settings first viewport stays focused
- **WHEN** an authenticated user opens Settings
- **THEN** the screen presents the Perfil editing task without KPI strips, account widgets, or unrelated configuration fiction
