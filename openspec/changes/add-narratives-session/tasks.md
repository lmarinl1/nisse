## 1. Session registry

- [x] 1.1 Add `narratives` to `ResearchSessionId` and insert `{ id: 'narratives', label: 'Narrativas', Icon: CandidatesIcon }` in `RESEARCH_SESSIONS` immediately after `scenarios` and before `validation` in `frontend/src/features/workspace/researchSessions.ts`

## 2. Verify

- [x] 2.1 Confirm Sidebar order shows Narrativas between Escenarios and Validación, and `/studies/:studyId/narratives` renders the empty session Canvas (WSL: `npm run dev` in `frontend/`)
