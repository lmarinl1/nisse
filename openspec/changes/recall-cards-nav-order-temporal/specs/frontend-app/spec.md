## ADDED Requirements

### Requirement: Optional month and day on Recall create and edit
Creating or editing a Recuerdo MUST allow optional **month** (1–12) and **day** (1–31) fields in addition to the required year. Month and day MUST persist as separate fields (`temporal_month`, `temporal_day`) and MUST participate in ascending temporal ordering of recalls on a Timeline (via the existing sort key that combines year, month, and day). Omitting month and/or day MUST remain valid.

#### Scenario: Create with year month day
- **WHEN** the owner creates a recuerdo with year 1991, month 8, and day 15
- **THEN** the stored recuerdo retains those three fields and appears in ascending order relative to other recalls using the combined temporal sort

#### Scenario: Create with year only
- **WHEN** the owner creates a recuerdo with only a year
- **THEN** month and day remain empty/null and the recuerdo still sorts by year among peers

### Requirement: Linked timeline relations as recall cards in the Recall Drawer
When a Recuerdo participates in connections across Timelines (collapse membership), the Recall Drawer MUST present those related Timeline contexts as a horizontal card carousel comparable to derivation neighbor cards. Each card MUST show enough identity to recognize the link (at least Timeline name; recuerdo title when useful) and MUST support removing the relation and adding new Timeline links through the existing collapse affordances. Activating a card SHOULD navigate or focus that Timeline/recuerdo context so the owner can inspect it without losing Study scope.

#### Scenario: Collapse members shown as cards
- **WHEN** a recuerdo is connected to two additional Timelines via collapse
- **THEN** the Recall Drawer shows cards for those linked Timeline contexts with controls to manage the relation set
