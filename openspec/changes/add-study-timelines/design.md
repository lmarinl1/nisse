## Context

Hoy `prior-knowledge` es label + Canvas vacío; el rail ya soporta acordeón exclusivo en `case-framework`. Ver proposal.md — Why. Specs: `study-timelines` + deltas en `research-session-nav`, `frontend-app`, `backend-api`, `study-objects`.

Constraints: Django+DRF+Mongo; Drawers existentes (`StudyCreateDrawer`, patrón case-framework); Markdown ya usado en Case Framework; iconos solo `shared/icons`; Canvas protagonista; sin IA. Rutas actuales: `/studies/:studyId/:session` (plural `studies`).

## Goals / Non-Goals

**Goals:**
- Persistencia Study-scoped de Timeline / Recall / Moment / Collapse con identidad compartida de Recuerdos.
- Instrumento UX: overview + track vertical + Drawers; acordeón dinámico de líneas activas.
- Temporalidad normalizada (BCE ↔ futuro) separada de la presentación.
- Backfill de línea principal en Studies existentes + create-on-Study.

**Non-Goals:**
- Zoom temporal complejo, IA, fuentes externas, colaboración.
- Rediseñar el rail completo u otras sesiones (salvo rename `prior-knowledge` → `timelines` e icono).
- Second navigation architecture.

## Decisions

### 1. Domain models (English ids; Spanish product copy)

```text
Timeline
  study FK, name, description, classification (real|fictional),
  retrospective_year (signed int: -500 = 500 BCE),
  status (active|archived), is_default (bool),
  created_at, updated_at
  unique: at most one is_default=True per Study

Recall
  study FK, home_timeline FK (creation line),
  title, location (optional), description_markdown,
  classification (verified|approximate|hypothetical|fiction),
  temporal_year (signed int), temporal_month?, temporal_day?,
  sort_key (int, derived for ordering),
  created_at, updated_at

Moment
  recall FK, title, content_markdown, type (flexible string),
  reference (optional), created_at, updated_at

TimelineCollapse
  study FK, recall FK, created_at

TimelineCollapseMember
  collapse FK, timeline FK
  unique (collapse, timeline)
```

Shared identity: one `Recall` row; visibility on additional lines via collapse members (≥2 timelines including home). Listing recalls for timeline T = `home_timeline=T` OR member of a collapse that includes T. Avoid duplicating primary recuerdo content.

**Alternatives:** copy Recall per timeline → rechazado (rompe identidad). Solo M2M sin Collapse entity → pierde el Momento de colapso explícito y la acción de producto.

### 2. Principal Timeline lifecycle

- On `Study` create (same transaction): insert default Timeline (`is_default=True`, name=Study.name, classification=`real`, `retrospective_year`=current calendar year as sensible default, status=`active`).
- Migration/data backfill: for each existing Study without default Timeline, create one.
- Rename Study does **not** auto-rename the principal Timeline (owner edits independently).
- Hard delete forbidden when `is_default=True` (even if archived). Spec recommends never permanently deleting principal — enforce in API.

**Alternatives:** lazy create on first timelines GET → rechazado (Sidebar subitem debe existir al entrar al Study).

### 3. API shape (owner-only, under Study)

```text
GET    /api/studies/:studyId/timelines/?status=active|archived|all
POST   /api/studies/:studyId/timelines/
GET    /api/studies/:studyId/timelines/:timelineId/
PATCH  /api/studies/:studyId/timelines/:timelineId/
POST   /api/studies/:studyId/timelines/:timelineId/archive/
POST   /api/studies/:studyId/timelines/:timelineId/restore/
DELETE /api/studies/:studyId/timelines/:timelineId/   # archived + !is_default only

GET/POST /api/studies/:studyId/timelines/:timelineId/recalls/
GET/PATCH/DELETE /api/studies/:studyId/recalls/:recallId/
POST/PATCH/DELETE moments nested under recall
POST /api/studies/:studyId/recalls/:recallId/collapses/  # body: timeline_ids[]
```

Overview list payload includes `recall_count`, `is_default`, timestamps. Collapse POST validates all timeline ids belong to same Study, includes current timeline, creates collapse Moment (`type=collapse` or similar).

### 4. Temporal normalization

- Storage: signed `temporal_year` (+ optional month/day); `sort_key` computed server-side for stable order.
- UI: formatters `formatYear(-500) → "500 a.C."`, CE years as decimal strings; year picker accepts BCE toggle or suffix, not string-only sort.
- Horizon: `max(today, max(recall dates on that timeline view))`; track start = `retrospective_year`.

**Alternatives:** ISO-8601 only → rechazado (no BCE). Store display strings → rechazado (orden incorrecto).

### 5. Frontend routing & nav

```text
/studies/:studyId/timelines              → TimelinesOverviewCanvas
/studies/:studyId/timelines/:timelineId  → TimelineCanvas
/studies/:studyId/prior-knowledge        → Navigate replace → timelines
```

Declare explicit branches **before** generic `:session` (same pattern as case-framework). Invalid timelineId → overview.

Session catalog: replace `prior-knowledge` with `timelines`; label «Líneas de tiempo». Icon: prefer `CalendarIcon` (tiempo) for session; keep `TimelineIcon` on evolution-forces **or** swap if review prefers track metaphor on timelines — document final mapping in tasks. Accordion children = active timelines from API (principal first); exclusive expand shared with case-framework (one primary accordion open).

Path helpers: `timelinesPath(studyId)`, `timelinePath(studyId, timelineId)`.

### 6. UX composition (instruments, not CRUD tables)

| Concept | Component (suggested) |
|---------|------------------------|
| Overview | `TimelinesOverviewCanvas`, `TimelineSummaryBlock` |
| Track | `TimelineTrack`, `TimelineRecallNode`, `TemporalScale` |
| Drawers | `TimelineDrawer`, `RecallDrawer`, `TimelineCollapseDialog` |
| Badges | `TimelineStatusBadge`, `RecallClassificationBadge` |

Reuse Drawer chrome patterns from Study/Case Framework. Classification semantics: icon + label (+ optional node pattern); yellow NISSE for focus/action only. Guiding questions (spec §41) as optional discrete copy on overview/canvas — never blocking. Mild motion: node appear, track scroll affordance — not noise.

### 7. Feature module layout

```text
frontend/src/features/timelines/
  api types + hooks
  TimelinesOverviewCanvas
  TimelineCanvas
  drawers / badges / track
  temporalFormat.ts
  classifications.ts  # centralized enums ↔ ES labels
```

Client: extend `shared/api` (or feature client) mirroring Case Framework style.

### 8. Delete cascade semantics

Hard delete archived non-default Timeline:
1. Remove Moments/Recalls whose **only** membership is that timeline (home and no collapse, or collapse members reduced below 2 → dissolve collapse).
2. Recuerdos still required by other timelines via collapse: drop this timeline from members; if <2 members remain, dissolve collapse + collapse Moment; keep Recall on remaining home/lines.
3. Confirm copy warns irreversible loss for exclusively owned content.

## Risks / Trade-offs

- [Risk] Nested `:timelineId` captured by `:session` → Mitigation: explicit routes first + redirect tests for `prior-knowledge`.
- [Risk] Shared recall queries miss collapse members → Mitigation: single service function `recalls_for_timeline`; cover with API tests.
- [Risk] BCE/UI input errors → Mitigation: validated signed year + clear formatter; reject year 0 if policy is astronomical year (document: no year 0; 1 BCE = -1).
- [Risk] Existing Studies without principal line → Mitigation: data migration + get-or-ensure on list.
- [Risk] Two accordion sessions (case-framework + timelines) fight exclusive expand → Mitigation: shared expanded-primary state keyed by URL session family.
- [Trade-off] Dense track vs grouping nearby recalls → v1: hierarchy by node emphasis; clustering only if legibility fails in review.
- [Trade-off] Session count vs open `add-narratives-session` → this change renames prior-knowledge only; preserve `narratives` if already in catalog.

## Migration Plan

1. Django models + indexes (`study`, `sort_key`, `status`, `is_default`).
2. Backfill principal Timeline per Study.
3. API + tests (CRUD, archive/restore/delete rules, collapse, ownership).
4. Frontend: session rename, routes, accordion, overview, track, drawers.
5. Redirect `prior-knowledge` → `timelines`.
6. Rollback: revert frontend routes/label; leave DB collections (orphans harmless) or reverse migration if needed.

## Open Questions

- None blocking: final icon between `CalendarIcon` / `TimelineIcon` for the session item can be chosen at UI review without changing specs.
