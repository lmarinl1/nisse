## ADDED Requirements

### Requirement: Timelines session precedes time-derivations in the research Sidebar
Within the research-session Sidebar catalog order, **Líneas de tiempo** (`timelines`) MUST appear immediately after **Marco del objeto de estudio** (`case-framework`). **Derivaciones del tiempo** (`time-derivations`) MUST appear after Líneas de tiempo. Session ids, routes, and accordion behavior MUST remain unchanged aside from this ordering.

#### Scenario: Rail order after Marco
- **WHEN** an authenticated owner views the Study Workspace research Sidebar
- **THEN** the primary session list shows Marco, then Líneas de tiempo, then Derivaciones del tiempo, then the remaining sessions in their prior relative order
