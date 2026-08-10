## 1. Backend domain and API

- [x] 1.1 Add `CaseFramework` and `CaseFrameworkSection` models (1:1 Study, unique section_type, JSON `fields`, `reviewed`) and migration in `backend/core`
- [x] 1.2 Implement get-or-create Case Framework with five empty sections for a Study
- [x] 1.3 Add serializers with partial field merge, domain key validation, and derived `status` (`not_started` | `in_progress` | `with_content` | `reviewed`)
- [x] 1.4 Expose `GET /api/studies/<pk>/case-framework/` and `PATCH /api/studies/<pk>/case-framework/sections/<section_type>/` with owner-only access matching Study patterns
- [x] 1.5 Add focused API tests: owner GET/PATCH, foreign denied, isolation between Studies, status derivation (WSL: `source .venv/bin/activate && cd backend && python manage.py test`)

## 2. Frontend domain config and API client

- [x] 2.1 Create Case Framework domain config (section ids, ES labels, purposes, field keys/titles/descriptions/guiding questions, icon mapping from `shared/icons`)
- [x] 2.2 Extend `shared/api/client.ts` with Case Framework types and `getCaseFramework` / `patchCaseFrameworkSection` helpers
- [x] 2.3 Add path helpers for overview and section URLs under `/studies/:studyId/case-framework/...`

## 3. Routing

- [x] 3.1 Update `AppRouter` so `case-framework` overview and `case-framework/:section` render dedicated canvases inside `StudyWorkspace`; keep other `:session` on empty `ResearchSessionCanvas`
- [x] 3.2 Validate section ids; redirect unknown section to overview; preserve Study shell and auth

## 4. Sidebar accordion

- [x] 4.1 Extend `ResearchSessionNav` so Marco del objeto de estudio expands to five grouped children with icons
- [x] 4.2 Implement exclusive primary expansion (collapse children when another primary session is active/selected)
- [x] 4.3 Mark active primary + active subelement from URL; auto-expand when under `case-framework`; show discrete non-blocking progress indicators

## 5. Research instruments UI

- [x] 5.1 Build reusable `MarkdownResearchEditor` (Markdown source, toolbar for headings/bold/italic/lists/quotes/links) and safe Markdown render helper for overview
- [x] 5.2 Build `CaseFrameworkSectionCanvas`: load section, render field blocks (title, description, guiding question, editor), autosave debounce + flush on unmount/navigate, discrete save feedback, optional reviewed toggle
- [x] 5.3 Build `CaseFrameworkOverviewCanvas`: read-only progressive reading of five sections (number, name, purpose, rendered content, status, edit action); no second writable store
- [x] 5.4 Style as Workspace instruments (generous writing space, tokens, no CRUD tables/wizards); respect mobile stacking / Canvas-first space

## 6. Dependencies and QA

- [x] 6.1 Add any chosen Markdown render/edit dependency only if needed; keep scope minimal
- [x] 6.2 Manual smoke (WSL `npm run dev` + backend): accordion, five URLs + overview, back/forward/reload/deep-link, autosave persist, Study isolation, non-linear edit, overview derived read-only
- [x] 6.3 Typecheck/build frontend in WSL: `cd frontend && npx tsc -b && npm run build`
