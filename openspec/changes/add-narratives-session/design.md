## Context

El Proceso del Study Workspace lista ocho sesiones en `RESEARCH_SESSIONS`; el router ya usa `:session` genérico. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**

- Insertar `narratives` / “Narrativas” entre `scenarios` y `validation`.
- Mantener Canvas vacío vía `ResearchSessionCanvas` existente.

**Non-Goals:**

- Contenido de narrativas, plantillas o Companion prompts.
- Nuevos iconos SVG si el catálogo ya cubre el concepto.

## Decisions

1. **Session id `narratives`**  
   Inglés estable en URL, label español “Narrativas”. Alternativa `stories` descartada (menos precisa en research foresight).

2. **Icono `CandidatesIcon`**  
   Semántica de alternativas/hilos narrativos post-escenarios. No `ChatIcon` (evitar metáfora de chat). No nuevo SVG en este change.

3. **Solo registro en `researchSessions.ts`**  
   Tipo union + entrada en el array; `isResearchSessionId` y el nav se actualizan por construcción. Sin cambio de `AppRouter` si `:session` ya valida vía ese helper.

## Risks / Trade-offs

- [Overlap con change `restructure-workspace-rail` en labels del menú] → Mitigation: este change asume “Marco del objeto de estudio” ya aplicado; al archivar, fusionar deltas de `research-session-nav` con cuidado.
- [Rail más largo en móvil] → Mitigation: el scroll horizontal compacto existente absorbe el noveno ítem.

## Migration Plan

Frontend-only. Sin migración de datos. Rollback: quitar la entrada `narratives`.
