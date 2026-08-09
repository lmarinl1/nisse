## ADDED Requirements

### Requirement: Session list without Proceso section label
The research-session Sidebar SHALL present the ordered session list without a visible section eyebrow or heading labeled “Proceso” (or equivalent administrative process label). Session items and their icons remain the primary navigation affordance. Accessibility naming for the nav MAY still describe the list as research sessions without showing “Proceso” as visible chrome.

#### Scenario: No Proceso eyebrow in Workspace
- **WHEN** an authenticated user views the Study Workspace research Sidebar
- **THEN** the session list is visible and no visible “Proceso” label appears above the list
