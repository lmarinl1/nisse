## Context

See proposal.md — Why. Today: `RESEARCH_SESSIONS` lists `time-derivations` before `timelines`. Recall create UI exposes year (+ BCE) but API/model already have `temporal_month` / `temporal_day` and `compute_temporal_sort_key`. Collapse links appear as prose in RecallDrawer hint; derivation uses `ResearchSelect` for `recall_id`. Neighbor carousel pattern lives in time-derivations CSS (`.td-carousel-card`).

## Goals / Non-Goals

**Goals:**
- Nav order: timelines before derivations.
- Month/day optional fields on recall create + edit; sort already backend-backed.
- Relation cards (collapse timelines + derivation recall) with add/remove/open.
- Shared visual language with neighbor cards.

**Non-Goals:**
- New free-form recuerdo↔recuerdo edge type; Neo4j redesign.

## Decisions

1. **Session order** — swap entries in `RESEARCH_SESSIONS` only (ids/routes unchanged). Specs that mention “immediately under case-framework” for derivations MUST be treated as superseded by this order (timelines under marco; derivations after timelines).

2. **Temporal fields** — Add month/day inputs on create drawer and RecallDrawer edit; send null when empty; keep year required. Rely on existing `recompute_sort_key` / list ordering. Validate day against month lightly on client (soft) or trust serializer.

3. **`RecallRelationCard` / carousel** — Small shared UI in timelines or `shared/ui`: title, meta (timeline name + formatted date), actions (open, remove). Used in:
   - RecallDrawer: one card per connected timeline (or per collapse peer context); “Agregar línea” opens existing `TimelineCollapseDialog` / refined add flow; remove drops timeline from collapse (API existing or extend if remove-member missing — design must check; if only full reconnect, “Editar conexiones” + cards as display).
   - DerivationDrawer step 2: replace sole select with cards area + “Agregar recuerdo” picker; remove clears `recall_id`.

4. **Open on click** — Prefer `navigate(timelinePath(studyId, timelineId))` and pass state / query to select recall when possible; if same timeline already open, `onSelectRecall`. From derivations, navigate to timelines session.

5. **Collapse remove** — If API lacks remove-single-timeline from collapse, cards show members + primary CTA “Gestionar conexiones” (dialog) for add/remove batch; still satisfy “possibility to delete relation” via that flow. Prefer dedicated remove if endpoint exists or can PATCH membership.

## Risks / Trade-offs

- [Risk] Remove-from-collapse API gap → Mitigation: inventory endpoints in apply; fall back to manage-dialog.
- [Risk] Cross-session navigation loses drawer context → Mitigation: deep-link + select recall on TimelineCanvas mount from location state.
- [Risk] Crowded drawers → Mitigation: single carousel section; compact cards.

## Migration Plan

Frontend-first; no DB migration if month/day already exist. Rollback = revert UI/order.

## Open Questions

- Exact collapse membership remove API — resolve during apply by reading current collapse endpoints.
