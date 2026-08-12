## ADDED Requirements

### Requirement: Related Recall shown as cards in Derivation Drawer
When editing a derivation, the related Recuerdo link MUST be presented as a card surface (title, Timeline name, temporal cue) consistent with neighbor-card visual language—not only as a bare select. The owner MUST be able to add a related recuerdo, remove the relation, and activate the card to open/focus that recuerdo in the timelines instrument (or an equivalent in-Workspace focus). Creating a new relation MUST update persistence via the existing `recall_id` contract.

#### Scenario: Linked recall card with remove
- **WHEN** a derivation has a related recuerdo from a Study Timeline
- **THEN** the Derivation Drawer shows a card with the recuerdo title and its Timeline name, and the owner can remove the link

#### Scenario: Add related recall
- **WHEN** the owner chooses a Study recuerdo to relate while editing a derivation and saves
- **THEN** the card appears for that recuerdo and the association persists on reload
