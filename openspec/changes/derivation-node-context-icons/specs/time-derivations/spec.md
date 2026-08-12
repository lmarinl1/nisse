## ADDED Requirements

### Requirement: Context icons on derivation node side rail
Beside the circular derivation node (in the existing side rail area, with or near type chips), the Canvas MUST offer up to three context affordances when their backing data is present:

1. **Descripción** — official-set icon meaning description/document; activating it MUST open a floating surface that shows the node’s description rendered as Markdown (not raw source only).
2. **Vínculo temporal** — official-set icon meaning a moment in time; activating it MUST open a floating card that shows the related recall’s timeline name, recall title, and temporal mark (day/month/year as available via existing temporal fields).
3. **Tags** — official-set icon meaning tags/labels; activating it MUST open a floating surface listing the derivation’s tags.

If a field has no usable content (empty/whitespace description, no linked recall available, or zero tags), that icon MUST NOT be rendered. Icons that are shown MUST appear in a muted/off visual state by default and MUST switch to an on/yellow (discovery accent) state while their floating surface is open from that icon’s activation. Closing the surface MUST return the icon to the muted/off state. Context icon interactions MUST NOT initiate graph drag and MUST NOT be required to open the Derivation Drawer.

#### Scenario: Only available icons appear
- **WHEN** a derivation has a non-empty description and two tags but no linked recall
- **THEN** the side rail shows the description and tags icons and MUST NOT show the temporal-link icon

#### Scenario: Description popover renders Markdown
- **WHEN** the owner activates the description icon on a node with Markdown description
- **THEN** a floating surface shows that description rendered as Markdown and the description icon is visually on/yellow

#### Scenario: Temporal card content
- **WHEN** the owner activates the temporal icon on a node linked to a recall with timeline name and temporal year/month/day
- **THEN** the floating card shows the timeline name, recall title, and formatted temporal mark

#### Scenario: Tags popover lists capsules
- **WHEN** the owner activates the tags icon on a node with tags «emergencia» and «frontera»
- **THEN** the floating surface lists those tags and the tags icon is visually on/yellow

#### Scenario: Icon returns to off when closed
- **WHEN** the owner closes the open context popover
- **THEN** that icon returns to the muted/off appearance
