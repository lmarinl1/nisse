## Purpose

Define Case Framework overview header progress tracking so the five subelements remain fully visible inside the framed Canvas header without horizontal overflow.

## ADDED Requirements

### Requirement: Overview tracking stays inside the header frame
The Case Framework overview Canvas header SHALL present progress for all five subelements inside the header frame. Every tracking item (number, title, and status label) MUST remain within the header’s content box at typical desktop Workspace widths, including when the Companion panel is open. The system MUST NOT allow any of the five items to clip past the header border or require horizontal scrolling of the header to read them.

#### Scenario: Fifth subitem remains inside the frame
- **WHEN** the owner opens the Case Framework overview with all five subelement titles visible
- **THEN** the fifth tracking item (Objeto de estudio) is fully inside the header border with the other four

#### Scenario: Companion open does not overflow tracking
- **WHEN** the Companion panel is open and the Canvas stage is narrower
- **THEN** all five tracking items remain inside the header frame without horizontal overflow

### Requirement: Tracking titles wrap with line breaks
Each overview tracking item title SHALL wrap onto multiple lines when the available column width is insufficient for a single line. Titles MUST remain fully readable (no aggressive single-line truncation that hides meaning). Status labels MAY wrap as needed but MUST stay within the item’s column.

#### Scenario: Long title wraps inside its column
- **WHEN** a subelement title such as “Tema de partida y evolución conceptual” exceeds the tracking column width
- **THEN** the title wraps to additional lines within that column and stays readable

#### Scenario: Wrapped titles do not push siblings out
- **WHEN** one or more tracking titles wrap to multiple lines
- **THEN** the five-item tracking band still fits within the header frame without pushing an item outside the border
