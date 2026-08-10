## Purpose

Refine the shared Research Drawer so long edit sessions remain usable: compact primary actions, reliable body scroll, and a uniform discovery focus ring on form controls.

## ADDED Requirements

### Requirement: Compact primary CTA in drawer footer
Primary actions placed in the Research Drawer footer (including «Crear recuerdo», Guardar, Actualizar) SHALL use a compact button treatment that fits the footer density. The control MUST NOT stretch as an oversized full-bleed block that dominates the drawer. Width MAY be content-sized or constrained; height/padding MUST remain proportionate to form controls.

#### Scenario: Create recuerdo CTA is compact
- **WHEN** the owner opens the create-recuerdo Research Drawer
- **THEN** the «Crear recuerdo» primary button appears compact in the footer without excessive height or disproportionate full-width dominance

### Requirement: Scrollable drawer body while editing
When a Research Drawer shows long content (especially editing a Recuerdo with Markdown description and Momentos), the drawer body SHALL scroll vertically while the header (and footer when present) remain reachable. The user MUST be able to reach content below the fold without the body being clipped with no scroll affordance.

#### Scenario: Edit recuerdo scrolls
- **WHEN** the owner opens the Recuerdo edit drawer with enough content to exceed the viewport height
- **THEN** the drawer body scrolls vertically so lower fields and Momentos remain accessible

### Requirement: Uniform focus ring on drawer inputs
Focused text inputs, textareas, and selects inside Research Drawers SHALL show a Discovery Yellow focus indication that illuminates all four sides uniformly. The system MUST NOT rely on an outline/offset treatment that appears uneven or clipped on some edges. Prefer a uniform box-shadow (or equivalent) ring that respects `border-radius`.

#### Scenario: Input focus is even on all sides
- **WHEN** the owner focuses a text field inside a Research Drawer
- **THEN** the discovery focus ring is visible evenly around the control on all sides
