## 1. Copy and session label

- [x] 1.1 Rename `case-framework` product label to “Marco del objeto de estudio” in `frontend/src/features/workspace/researchSessions.ts`
- [x] 1.2 Replace user-facing “Biblioteca” / “biblioteca” with Campo / Campo de investigación in `StudyWorkspace`, `StudyLibrary`, `StudyHome`, and related error/helper copy (keep code identifiers like `StudyLibrary` unless a string is user-visible)

## 2. Workspace rail structure

- [x] 2.1 Restructure `StudyWorkspace` rail DOM: brand → `ResearchSessionNav` → foot wrapper with Objeto de Estudio identity + return-to-Campo link last
- [x] 2.2 Update `workspace.css` so the foot anchors to the bottom of the rail (`margin-top: auto` / flex column) and remove obsolete top spacing that assumed Proceso below Study context
- [x] 2.3 Adjust mobile rules so Proceso stays primary and Campo return remains at the end of the rail

## 3. Verify

- [x] 3.1 Manually check in WSL (`npm run dev` in `frontend/`): desktop rail order, renamed session, Campo copy on entry + back link; spot-check one session route still works
