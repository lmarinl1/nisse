## 1. Backend — Identity & models

- [x] 1.1 Add DRF Token auth app/settings (`rest_framework.authtoken`), default auth classes, and document any new env vars in `backend/.env.example`
- [x] 1.2 Implement `Profile` model (1:1 User, display_name, timestamps) and ensure-on-auth helper (`get_or_create`)
- [x] 1.3 Implement `Study` model (owner, name, description, status active|archived, timestamps); no hard-delete API
- [x] 1.4 Create and apply Mongo migrations in WSL (`source .venv/bin/activate && cd backend && python manage.py migrate`)

## 2. Backend — API

- [x] 2.1 Implement auth endpoints: register, login, logout (token issue/invalidate) under `/api/auth/`
- [x] 2.2 Implement `GET /api/profile/me/` returning current Profile (create if missing)
- [x] 2.3 Implement Studies API: list (non-archived default), create, retrieve, patch basics, archive action; owner-scoped querysets; foreign ids → 404
- [x] 2.4 Wire URLs under `/api/`; keep `GET /api/health/` unchanged
- [x] 2.5 Add backend tests for 401, ownership isolation, create→retrieve, archive hidden from default list, profile ensure

## 3. Frontend — Foundation

- [x] 3.1 Add `react-router-dom` (and Query only if used); scaffold `app/`, `features/{identity,study,workspace,canvas}/`, `routes/`
- [x] 3.2 Extend typed API client: token storage (localStorage per design), auth header, profile + studies methods
- [x] 3.3 Build minimal auth screens (register/login) and protect Study routes when unauthenticated

## 4. Frontend — Study & Workspace UX

- [x] 4.1 Build `StudyLibrary` entry (research library metaphor, Spanish copy, never "Project")
- [x] 4.2 Build `StudyEmptyState` inviting to formulate a question and create the first Objeto de Estudio
- [x] 4.3 Build `StudyCreateDrawer` (name required, description optional) → on success navigate into Workspace
- [x] 4.4 Build edit basics + archive actions for owned Studies (archive removes from default library)
- [x] 4.5 Build `StudyWorkspace` + empty `WorkspaceCanvas` shell (Canvas protagonista; Companion/panels as empty reserved slots only)
- [x] 4.6 Replace health-as-home with authenticated Study entry; keep health usable for diagnostics

## 5. Verification

- [x] 5.1 Manual WSL smoke: register → empty state → create Study → land in Workspace → edit → archive → library updates
- [x] 5.2 UX checklist: feels like Speculative Research Workspace (not CRUD/dashboard); Empty State invites exploration; tokens/spacing sane; Canvas is primary; no "Project" copy; Companion slot not a fake chatbot
