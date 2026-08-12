## ADDED Requirements

### Requirement: Entry atmospheres follow resolved theme metaphor
Auth entry and the authenticated Study entry (library / Empty State) SHALL mount the shared research network atmosphere such that light resolved theme shows the exploration-field metaphor and dark shows the orbital metaphor, keeping Canvas/panels readable and the atmosphere non-interactive chrome.

#### Scenario: Auth light exploration field
- **WHEN** an unauthenticated user views login/register with resolved light appearance
- **THEN** the auth atmosphere uses the light exploration field (no orbital rings / nucleus cloud)

#### Scenario: Study entry light exploration field
- **WHEN** an authenticated user views the Study library or Empty State with resolved light appearance
- **THEN** the study atmosphere uses the light exploration field behind content
