## 1. Session catalog and types

- [x] 1.1 Add `researchSessions` catalog module (ordered ids, Spanish labels, icon components from `shared/icons`) matching design mapping
- [x] 1.2 Export helpers: type for session id, `isResearchSessionId`, default `case-framework`, path builder `/studies/:studyId/:session`

## 2. Routing shell

- [x] 2.1 Update `AppRouter` for nested Study routes: `/studies/:studyId` → redirect to `case-framework`; `/studies/:studyId/:session` → `StudyWorkspace` under `RequireAuth`
- [x] 2.2 Refactor `StudyWorkspace` into shell: load Study by `studyId`, keep brand lockup + Biblioteca + Study context, render `ResearchSessionNav` + `<Outlet />` (+ Companion chrome)
- [x] 2.3 Add session route element that validates `:session`, redirects invalid ids to `case-framework`, and renders keyed empty `WorkspaceCanvas` (`key={session}`)

## 3. ResearchSessionNav UI

- [x] 3.1 Implement `ResearchSessionNav` as persistent Sidebar list (NavLink/Link to each session URL); exactly eight items in catalog order with `size="nav"` icons
- [x] 3.2 Style active session with discovery/text tokens (not brand neon); ensure Sidebar does not unmount on session change; no modal/drawer
- [x] 3.3 Wire nav into `workspace__rail` without overlaying the Canvas; preserve Workspace grammar (Canvas protagonist)

## 4. Responsive and motion

- [x] 4.1 Add responsive styles: desktop Sidebar visible; compact/mobile form keeps navigation available and active session clearly identifiable
- [x] 4.2 Apply short stage perspective transition using existing motion tokens so session changes feel like one Workspace

## 5. QA

- [x] 5.1 Manual smoke: eight URLs, active state, back/forward, reload, deep-link, create-Study → default session, invalid session → default
- [x] 5.2 Verify tokens + Canvas/Companion patterns (rail secondary, Canvas primary, icons from catalog only, brand lockup intact)
- [x] 5.3 Typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
