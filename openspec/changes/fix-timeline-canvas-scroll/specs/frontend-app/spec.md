## ADDED Requirements

### Requirement: Timeline Canvas scrolls within the Workspace stage
On a Timeline subitem route (`/studies/:studyId/timelines/:timelineId`), when the Timeline instrument content exceeds the available vertical space of the central Workspace stage, the system MUST confine vertical scrolling to that central Canvas/stage surface. The Study Workspace chrome outside the stage (research-session Sidebar/rail and Companion panel) MUST remain visually fixed and MUST NOT scroll as part of the same document scroll as the Timeline track. Horizontal page scroll caused solely by Timeline track growth MUST NOT appear on the document/body for this route under normal desktop Workspace layout.

#### Scenario: Long trajectory scrolls only the central Canvas
- **WHEN** an authenticated owner opens `/studies/:studyId/timelines/:timelineId` with enough Recuerdos/Momentos that the track exceeds the stage height
- **THEN** wheel/trackpad vertical scroll moves the Timeline Canvas content inside the central stage while the research Sidebar and Companion stay in place

#### Scenario: Short trajectory needs no page scroll
- **WHEN** an authenticated owner opens a Timeline whose content fits within the stage height
- **THEN** neither the document/body nor the Workspace shell introduces an unnecessary vertical scrollbar for that content
