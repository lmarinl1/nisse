## Context

See proposal.md — Why. Nodes already have a right-side rail for type chips (`.td-node-wrap__types`). Graph nodes expose `description_markdown`, `tags`, `recall` / `recall_missing` on `DerivationNode`. Popovers exist for type detail. No `tag` glyph in `shared/icons` today; `document` and `timeline-clock` / `calendar-time` exist. Markdown HTML helper: `renderMarkdownToHtml` in case-framework.

## Goals / Non-Goals

**Goals:**
- Conditional context icons on the side rail; mute → yellow when open.
- Popovers: MD description; recall card; tag list.
- Keep circle undeformed; `nodrag` on controls.

**Non-Goals:**
- Inline editing; navigating to timeline from temporal card (optional later — assume display-only unless trivial).
- Showing icons dimmed when empty (empty = hidden).

## Decisions

1. **Placement** — Context icon row sits in the side rail with type chips (e.g. icons above chips, or a compact vertical strip). Do not put icons inside the circle. Prefer a small icon stack at the top of the right rail, left-aligned like chips.

2. **Availability rules**
   - Description: `description_markdown.trim().length > 0`
   - Temporal: `recall` present and not `recall_missing` (usable title/timeline)
   - Tags: `(tags ?? []).length > 0`

3. **Visual states** — Off: muted text/icon color (`--color-text-muted`). On: discovery yellow (`--color-discovery-primary`) when Popover `data-state=open` / pressed. No “always on” without open surface.

4. **Icons (official set)** — Description → `document`. Temporal → `timeline-clock` (or `calendar-time`). Tags → add `tag` to `shared/icons` following iconography rules if absent; do not invent off-set SVGs outside the pipeline. Interim forbidden: emoji.

5. **Data plumbing** — Extend `DerivationFlowNodeData` with `descriptionMarkdown`, `tags`, `recall` (or null). `toFlowNodes` / save merge must pass these from graph nodes so popovers don’t need a second fetch.

6. **Markdown** — Reuse `renderMarkdownToHtml` in a read-only popover body (`dangerouslySetInnerHTML` in a constrained class, same as overview). Sanitize behavior matches existing helper.

7. **Exclusive open** — Radix Popover per icon; natural one-open-at-a-time if only one trigger open, or close others on open — prefer independent popovers (simple).

## Risks / Trade-offs

- [Risk] Missing `tag` icon → Mitigation: add official glyph in same change.
- [Risk] Long Markdown in popover → Mitigation: max-height + scroll on `.td-popover`.
- [Risk] Stale node data after drawer edit → Mitigation: existing graph merge already updates nodes; ensure new fields are included in merge/`toFlowNodes`.
- [Risk] Crowded rail with many types + 3 icons → Mitigation: compact icon size (`sm`); icons first then chips.

## Migration Plan

Frontend-only. Rollback = remove context icon strip.

## Open Questions

- None material; display-only temporal card (no navigate) assumed.
