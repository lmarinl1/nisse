## Purpose

Ensure Session Canvas Headers used across research session Canvases remain contained and readable as the Workspace stage width changes.

## ADDED Requirements

### Requirement: Session Canvas Header is width-contained
Every Session Canvas Header SHALL stay within the width of its Canvas container. Brand mark, title, purpose, and secondary (`aside`) region MUST NOT overflow horizontally outside the header frame. The header MUST use a layout that can shrink with the stage (including when Workspace side panels such as Companion are open).

#### Scenario: Header fits stage with Companion open
- **WHEN** the owner views a Canvas that uses Session Canvas Header while the Companion is open
- **THEN** the full header (including aside content) remains inside the header border without horizontal overflow

#### Scenario: Narrow viewport reflows header
- **WHEN** the viewport is narrow enough that brand and aside cannot sit side by side comfortably
- **THEN** the header reflows (wrap or stack) so title, purpose, and aside remain fully visible within the frame

### Requirement: Aside region respects container bounds
Feature-specific aside content placed in the Session Canvas Header secondary region (progress tracking, status triad, timeline actions, or similar) SHALL respect the header’s available width. Aside content MUST be allowed to shrink or wrap; it MUST NOT force the header wider than the Canvas stage via non-shrinking layout.

#### Scenario: Dense aside does not force overflow
- **WHEN** the aside contains dense secondary content such as multi-item progress tracking
- **THEN** that content wraps or reflows within the header instead of overflowing the frame
