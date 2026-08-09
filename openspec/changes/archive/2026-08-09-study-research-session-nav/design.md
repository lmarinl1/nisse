## Context

Hoy el Workspace vive en `/studies/:studyId` con un rail de contexto + un `WorkspaceCanvas` vacío + Companion secundario (`StudyWorkspace`, `AppRouter`). La identidad reciente (`NisseBrandLockup`, `shared/icons`, tokens discovery) ya está en el rail. Ver `proposal.md` — Why. Este diseño añade sesiones de investigación URL-direccionables sin romper esa gramática.

## Goals / Non-Goals

**Goals:**

- Shell de Workspace con Sidebar de sesiones persistente + Canvas por sesión vía React Router.
- Catálogo único de sesiones (ids, labels, iconos) como fuente de verdad en frontend.
- Remount/aislamiento de Canvas por `session` sin persistencia backend.
- Responsive: desktop Sidebar visible; mobile compacto con sesión activa legible.

**Non-Goals:**

- Contenido metodológico por sesión, Objetos Cognitivos, o sync de canvas al API.
- Rediseñar Companion o eliminar el rail de identidad (se integra, no se sustituye por un dashboard).
- Nuevos iconos o librerías externas.

## Decisions

### 1. URL bajo `/studies/:studyId/:session` (no `/study/...`)

**Choice:** Extender la convención plural existente (`/studies/:studyId`) con un segmento `:session`.

**Why:** Evita **BREAKING** de deep-links y alineación con `AppRouter` / creación de Studies. El ejemplo del brief se adapta, no se duplica.

**Alternative considered:** Introducir `/study/:id/:session` y redirigir — más ruido y dos vocabularios de ruta.

### 2. Nested routes + shell layout

**Choice:**

```text
/studies/:studyId          → Navigate replace → case-framework
/studies/:studyId/:session → StudyWorkspace shell (Sidebar + Outlet + Companion)
```

`StudyWorkspace` carga el Study una vez (`studyId`), renderiza `ResearchSessionNav` y un `<Outlet />` para el Canvas de la sesión. Invalid `:session` → `Navigate` a `case-framework`.

**Why:** El menú no depende de estado React efímero; back/forward/reload/deep-link son nativos. El Study no se refetch-ea al cambiar solo la sesión.

**Alternative considered:** Un solo route + `useState` para la sesión — falla criterios de URL/historial.

### 3. Canvas isolation via keyed remount

**Choice:** La ruta de sesión renderiza `WorkspaceCanvas` (o `SessionCanvas` thin wrapper) con `key={session}`.

**Why:** Garantiza superficies independientes vacías sin introducir store de canvas todavía. Cumple “no compartir estado visual accidentalmente”.

**Alternative considered:** Un canvas persistente con capas por sesión — prematuro sin modelo de objetos.

### 4. Catalog module for the eight sessions

**Choice:** Módulo tipado (p.ej. `features/workspace/researchSessions.ts`) con orden fijo:

| id | Label (ES) | Icon (catalog) |
|----|------------|----------------|
| `case-framework` | Marco del caso de estudio | `DocumentIcon` |
| `prior-knowledge` | Conocimiento previo | `FolderIcon` |
| `evolution-forces` | Fuerzas de evolución | `TimelineIcon` |
| `critical-axes` | Ejes críticos | `DecisionIcon` |
| `scenarios` | Escenarios | `GraphIcon` |
| `validation` | Validación | `CheckIcon` |
| `evaluation` | Evaluación | `FilterIcon` |
| `monitoring` | Monitoreo | `EyeIcon` |

Icons: `size="nav"` (20px). Active state con tokens discovery (`--color-discovery-primary` / text tokens), **no** `--color-brand-neon` en el Sidebar.

**Why:** Una sola familia iconográfica; semántica del catálogo oficial (`10-iconography.md`) sin glifos custom. `FilterIcon` es el mejor proxy disponible para “evaluación/criterios” sin inventar un icono de métrica.

**Alternative considered:** Añadir iconos nuevos al set — fuera de scope mientras el catálogo cubre significados.

### 5. Sidebar vs rail de contexto

**Choice:** Ampliar el rail izquierdo existente (`workspace__rail`) para incluir: brand lockup → volver a Biblioteca → identidad del Study → lista `ResearchSessionNav`. No modal/drawer.

**Why:** Un solo Sidebar estructural; mantiene contexto del Objeto de Estudio y la identidad NISSE ya integrada. Companion derecho se conserva como chrome secundaria (fuera del diagrama mínimo del brief, no bloqueante).

**Alternative considered:** Segundo sidebar solo de sesiones — fragmenta chrome y reduce Canvas.

### 6. Motion / percepción de un solo Workspace

**Choice:** Transición corta de perspectiva en el stage (fade/opacity con `--motion-canvas` / tokens existentes); el Sidebar no se desmonta.

**Why:** UX Framework: el Canvas no debe “recargar” como otra app; el cambio es de sesión dentro del laboratorio.

### 7. Responsive

**Choice:** Desktop: columnas actuales (rail | stage | companion). Tablet/mobile: rail compacto (iconos + label de sesión activa visible; lista expandible o scroll vertical sin eliminar navegación). Seguir gramática responsive del framework (Canvas protagonista; paneles adaptados).

**Why:** Criterio de aceptación: no eliminar navegación; sesión actual siempre identificable.

## Risks / Trade-offs

- [Risk] `FilterIcon` / `GraphIcon` son aproximaciones semánticas → Mitigation: documentar mapeo; extender catálogo en un change futuro si producto exige glifos más específicos.
- [Risk] Remount pierde cualquier estado local futuro no persistido → Mitigation: aceptable en este change (canvas vacíos); persistencia será por Objetos Cognitivos + API después.
- [Risk] Companion + Sidebar estrechan el Canvas en desktop → Mitigation: mantener anchos actuales del rail; no ensanchar el menú; Canvas sigue siendo 1fr.
- [Risk] Links de creación aún apuntan a `/studies/:id` → Mitigation: redirect index → `case-framework` (replace) cubre el flujo.

## Migration Plan

1. Añadir rutas anidadas y redirect; actualizar navegación post-create si se desea deep-link directo a `case-framework` (opcional; redirect basta).
2. Introducir catálogo + `ResearchSessionNav` en el rail.
3. Keyed Canvas por sesión; estilos active/responsive.
4. Verificar typecheck/build en WSL; smoke manual de las ocho URLs + back/reload.
5. Rollback: revertir rutas al path único anterior (sin datos migrados; sin backend).

## Open Questions

Ninguna que bloquee specs o tasks: Companion se conserva; default session = `case-framework`; ids semánticos fijos como arriba.
