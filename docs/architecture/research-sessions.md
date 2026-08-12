# Mapa de sesiones de investigación

Fuente de ids y labels: `frontend/src/features/workspace/researchSessions.ts` (sidebar del Study Workspace).

## Implementadas (feature propia)

| Session id | Label (UI) | Feature / rutas |
|------------|------------|-----------------|
| `case-framework` | Marco del objeto de estudio | `frontend/src/features/case-framework/` |
| `timelines` | Líneas de tiempo | `frontend/src/features/timelines/` |
| `time-derivations` | Derivaciones del tiempo | `frontend/src/features/time-derivations/` (React Flow + Neo4j) |

## Placeholder (entrada en nav; canvas genérico)

Estas ids existen en `RESEARCH_SESSIONS` y navegan al workspace, pero **aún no** tienen módulo de sesión dedicado. Hoy caen en `ResearchSessionCanvas` → `WorkspaceCanvas` genérico:

| Session id | Label (UI) |
|------------|------------|
| `evolution-forces` | Fuerzas de evolución |
| `critical-axes` | Ejes críticos |
| `scenarios` | Escenarios |
| `narratives` | Narrativas |
| `validation` | Validación |
| `evaluation` | Evaluación |
| `monitoring` | Monitoreo |

## Módulos de soporte (no son “sesiones”)

| Carpeta | Rol |
|---------|-----|
| `features/study/` | Biblioteca / home / creación de Study |
| `features/workspace/` | Shell del Study, nav de sesiones |
| `features/identity/` | Auth, perfil, settings |
| `features/atmosphere/` | Atmósfera visual de red |
| `features/canvas/` | `WorkspaceCanvas` base |

Al añadir una sesión nueva: actualizar `researchSessions.ts`, rutas, este mapa y el README si el onboarding la destaca.
