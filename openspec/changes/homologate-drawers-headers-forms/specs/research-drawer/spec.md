## Purpose

Define the shared Research Drawer chrome for Speculative Research Workspace instruments: a right-edge secondary surface that keeps Canvas context visible while editing, with Discovery Yellow identity and official brand mark.

## ADDED Requirements

### Requirement: Research Drawer width and placement
The Research Drawer SHALL open from the right edge of the viewport and occupy approximately one quarter of the viewport width on desktop (about 25vw, with a sensible min/max so it remains usable). On narrow viewports it MAY grow toward full width while remaining a slide-over from the right. The Canvas MUST remain partially visible behind/beside the drawer. The system MUST NOT present routine edit flows as centered modals that fully obscure the Workspace.

#### Scenario: Desktop drawer is quarter-width from the right
- **WHEN** an authenticated user opens a Research Drawer on a desktop-width viewport
- **THEN** the drawer panel attaches to the right edge and spans roughly one quarter of the viewport width

#### Scenario: Canvas context remains
- **WHEN** a Research Drawer is open over a session Canvas
- **THEN** the primary Canvas surface remains visible enough to preserve research context (not fully replaced by a full-page form)

### Requirement: Drawer header with discovery title and brand mark
Every Research Drawer SHALL show a header that includes the official NISSE brand mark with stars (discovery-tinted / official-clean geometry per brand guidance) and a title rendered in Discovery Yellow (`color.discovery.primary` / `--color-discovery-primary`). The title MUST be the primary textual signal of the drawer; body copy MUST remain secondary. Close control MUST use the official icon catalog (`CloseIcon`).

#### Scenario: Mark and yellow title present
- **WHEN** the user opens any Research Drawer (create Study, edit Timeline, Recuerdo, Case Framework field detail, or collapse connect)
- **THEN** the drawer header shows the starred brand mark and a Discovery Yellow title

### Requirement: Discovery primary actions inside drawers
Primary persist actions inside Research Drawers (labels such as Guardar, Crear, Actualizar, and equivalent confirm actions) SHALL use Discovery Yellow as the primary button treatment. Secondary actions (Cancelar, Archivar as non-primary, ghost links) MUST remain visually subordinate. The system MUST NOT use an undeclared or generic `primary` class that fails to resolve to discovery styling.

#### Scenario: Save button is discovery yellow
- **WHEN** a Research Drawer shows a Guardar / Crear / Actualizar control
- **THEN** that control uses the discovery primary button style

### Requirement: Styled form Select and fields
Form controls inside Research Drawers SHALL follow shared NISSE form styling: inputs, textareas, and selects share border, radius, focus ring using discovery tokens, and dark laboratory surfaces. Selects MUST present a coherent research-instrument appearance (not an unstyled OS-default control as the only treatment). Focus and open states MUST remain keyboard-accessible.

#### Scenario: Select matches drawer form language
- **WHEN** a drawer presents a classification or similar Select
- **THEN** the Select shares the drawer form visual language (border, surface, discovery focus) and remains operable by keyboard

### Requirement: Single shared drawer primitive
Study, Case Framework, and Timelines drawer UIs SHALL consume one shared Research Drawer primitive (or thin wrappers over the same chrome/CSS contract). Feature-specific content MAY vary; chrome (width, header mark, title color, CTA style, form field base) MUST NOT diverge into parallel CSS stacks for the same role.

#### Scenario: Homogenized chrome across features
- **WHEN** the user compares Study create drawer, Timeline drawer, and Case Framework drawer side by side conceptually
- **THEN** width, header mark, yellow title, and primary CTA treatment match the Research Drawer contract
