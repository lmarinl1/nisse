## 1. Backend domain and API

- [x] 1.1 Add `Timeline`, `Recall`, `Moment`, `TimelineCollapse`, and `TimelineCollapseMember` models in `backend/core` (Study-scoped; signed temporal years; `sort_key`; classifications; `is_default`) plus migration
- [x] 1.2 On Study create (same transaction) materialize principal Timeline; data migration/backfill for existing Studies without a default Timeline
- [x] 1.3 Implement serializers and services: list/filter by status, CRUD timelines, archive/restore, hard-delete rules (`archived` + `!is_default`), recalls-for-timeline (home ∪ collapse members), moments CRUD, collapse create with collapse Moment
- [x] 1.4 Wire owner-only API routes under `/api/studies/<pk>/timelines/…` and recall/collapse endpoints per design.md
- [x] 1.5 Add focused API tests: principal on create, archive/restore/delete guards, BCE ordering, collapse shared identity, foreign Study denied (WSL: `source .venv/bin/activate && cd backend && python manage.py test`)

## 2. Frontend domain, client, and session rename

- [x] 2.1 Replace session `prior-knowledge` → `timelines` in `researchSessions.ts` (label «Líneas de tiempo», time-related icon from `shared/icons`); keep `narratives` if present; add path helpers `timelinesPath` / `timelinePath`
- [x] 2.2 Add centralized classifications + temporal formatters (`temporalFormat.ts`, ES labels for Real/Ficticia and Recuerdo classes)
- [x] 2.3 Extend API client with Timeline/Recall/Moment/Collapse types and helpers

## 3. Routing and Sidebar accordion

- [x] 3.1 Update `AppRouter`: explicit `/timelines` overview and `/timelines/:timelineId` inside `StudyWorkspace`; redirect `prior-knowledge` → `timelines`; invalid timelineId → overview
- [x] 3.2 Extend `ResearchSessionNav` so Líneas de tiempo is an accordion of **active** timelines (principal first); exclusive expand shared with case-framework; mark active overview/subitem from URL

## 4. Overview Canvas and Timeline Drawer

- [x] 4.1 Build `TimelinesOverviewCanvas`: exploration surface (not admin table) with active/archived, search, summary blocks (name, description, classification, retrospective year, recuerdo count, updated, status, principal), light secondary metrics
- [x] 4.2 Build `TimelineDrawer` for create/edit (required name, classification, retrospective year; optional description) and wire archive/restore/hard-delete with confirmation copy
- [x] 4.3 Verify tokens + Canvas-first composition (no KPI dashboard; Drawer before Modal)

## 5. Individual Timeline track and Recuerdo Drawer

- [x] 5.1 Build `TimelineTrack` / `TimelineRecallNode` / `TemporalScale`: vertical track from retrospective year through Hoy/Presente to dynamic horizon; chronological order via `sort_key`
- [x] 5.2 Build `RecallDrawer`: view/edit recuerdo fields, Markdown description, classification badges (not color-only), moments CRUD via Markdown editor reuse, save without leaving Canvas
- [x] 5.3 Create recuerdo only from Timeline Canvas; block create when timeline archived; show created/updated on nodes

## 6. Collapses and polish

- [x] 6.1 Build `TimelineCollapseDialog` + convergence visual on shared nodes; list connected timelines in Drawer detail
- [x] 6.2 Optional discrete guiding questions on overview/canvas (non-blocking); subtle motion for track/nodes
- [x] 6.3 Manual smoke (WSL backend + `cd frontend && npm run dev`): accordion, URLs, back/forward/reload, principal protected, BCE/future dates, collapse, archive flow
- [x] 6.4 Typecheck/build frontend in WSL: `cd frontend && npx tsc -b && npm run build`
