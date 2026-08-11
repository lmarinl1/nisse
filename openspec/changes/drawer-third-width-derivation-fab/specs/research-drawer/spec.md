## Purpose

Define the shared Research Drawer as the secondary right-edge instrument for editing while the Canvas stays visible: one-third desktop width and a clean, laboratory-grade form layout for every drawer in the product.

## ADDED Requirements

### Requirement: Research Drawer is one-third viewport on desktop
The Research Drawer SHALL open from the right edge and occupy approximately one third of the viewport width on desktop (about 33vw, with a sensible min/max so it remains usable on very small or very large displays). On narrow viewports it MAY approach full width while remaining a right slide-over. Every product drawer that edits research content MUST use this shared width contract. The Canvas MUST remain partially visible. Routine edit flows MUST NOT be centered modals that fully obscure the Workspace.

#### Scenario: Desktop drawer is one-third width
- **WHEN** an authenticated user opens any Research Drawer on a desktop-width viewport
- **THEN** the drawer panel attaches to the right edge and spans roughly one third of the viewport width

#### Scenario: All feature drawers share the width
- **WHEN** the user opens Study create, Timeline, Recuerdo, Derivación, Study root, or collapse drawers
- **THEN** each uses the same shared one-third width contract (not a feature-specific narrower or wider panel)

#### Scenario: Canvas context remains
- **WHEN** a Research Drawer is open over a session Canvas
- **THEN** the primary Canvas remains visible enough to preserve research context

### Requirement: Clean internal form and content layout
Inside every Research Drawer, form fields and informational blocks SHALL be arranged for a clean laboratory interface: clear vertical rhythm, consistent field spacing, readable label hierarchy, and grouped related controls without dense administrative stacking. Hints and secondary copy MUST remain subordinate to the title and primary fields. Primary persist actions remain in the drawer footer. The layout MUST NOT feel like a spreadsheet, settings dump, or multi-column admin form.

#### Scenario: Form fields read as a clean stack
- **WHEN** the user opens a drawer with multiple editable fields (for example Recuerdo or Derivación)
- **THEN** fields appear in a single coherent vertical stack with consistent spacing and clear labels

#### Scenario: Footer holds primary actions
- **WHEN** a drawer supports Guardar / Crear / Eliminar
- **THEN** those actions sit in the shared drawer footer region, not scattered among mid-body fields as the only persist affordance

### Requirement: Single shared drawer primitive
All product drawers listed in this capability SHALL consume the shared Research Drawer primitive (or thin wrappers over the same chrome/CSS contract). Feature-specific fields MAY vary; width and base content layout rhythm MUST NOT diverge into parallel CSS stacks for the same role.

#### Scenario: Homogenized chrome across features
- **WHEN** the user compares drawers across Study, Timelines, and Derivaciones
- **THEN** width and base internal spacing rhythm match the Research Drawer contract

### Requirement: Design Language documents one-third Research Drawer
The NISSE UX Design Language under `docs/ux-framework/` SHALL state that the official product Research Drawer occupies approximately one third of the viewport on desktop (not one quarter), remains right-anchored with Canvas context visible, and prefers a clean single-column form layout with primary actions in the drawer footer. Documentation MUST NOT contradict the implemented `--drawer-width` contract by describing drawers as ~¼ / 25vw as the product standard.

#### Scenario: Components doc matches one-third contract
- **WHEN** a reader consults the Drawer / ResearchDrawer contract in the Design Language components guidance
- **THEN** the documented desktop width is approximately one third of the viewport and names the shared `ResearchDrawer` instrument
