## Context

Hoy el Workspace ya tiene `/studies/:studyId/:session`, Sidebar de sesiones y Canvas vacío genérico (`ResearchSessionCanvas` → `WorkspaceCanvas`). `case-framework` es la sesión default, pero sin contenido ni persistencia. Ver proposal.md — Why. Specs: `case-framework`, deltas en `research-session-nav`, `frontend-app`, `backend-api`, `study-objects`.

Constraints: Django+DRF+Mongo; cliente en `frontend/src/shared/api/client.ts`; iconos solo de `shared/icons`; Canvas protagonista; sin IA en este change.

## Goals / Non-Goals

**Goals:**
- Modelo y API owner-scoped para Case Framework + 5 secciones con campos Markdown tipados.
- Rutas anidadas overview/sección sin romper el shell del Workspace.
- Acordeón exclusivo en Sidebar + instrumentos reutilizables (config de dominio + UI genérica).
- Autosave con debounce y overview de solo lectura derivado.

**Non-Goals:**
- OT: no rediseñar el rail completo ni otras sesiones.
- No CRDT/colaboración, no versionado, no editor WYSIWYG rico tipo Notion.
- No migrar datos legacy (no hay contenido previo de Case Framework).

## Decisions

### 1. Modelo: CaseFramework 1:1 Study + CaseFrameworkSection por type

- `CaseFramework`: FK única a `Study`, timestamps.
- `CaseFrameworkSection`: FK a framework, `section_type` (choices de los 5 ids), `fields` (JSON dict `field_key → markdown string`), `reviewed` (bool), timestamps.
- Unique `(case_framework, section_type)`.
- GET del framework hace get-or-create del aggregate y garantiza las 5 secciones vacías.

**Alternatives:** embeber todo en `Study` → rechazado (ensucia Aggregate Root). Un documento blob por Study → rechazado (dificulta update parcial y progreso).

### 2. API shape

```text
GET  /api/studies/:studyId/case-framework/
PATCH /api/studies/:studyId/case-framework/sections/:sectionType/
```

- GET: framework + sections (fields, reviewed, derived `status`, updated_at).
- PATCH section: body `{ fields?: Partial<Record<fieldKey, string>>, reviewed?: boolean }` merge parcial de fields.
- Auth: mismo patrón owner-only que Study detail (404/403).
- Status derivado en serializer (no columna obligatoria): vacío → `not_started`; parcial → `in_progress`; todos los keys de dominio no vacíos → `with_content`; si `reviewed` → `reviewed` (gana sobre los anteriores).

**Alternatives:** PUT full replace → peor para autosave parcial. Endpoints por field → ruido. Status persistido siempre → drift vs contenido.

### 3. Routing frontend

```text
/studies/:studyId/case-framework          → CaseFrameworkOverviewCanvas
/studies/:studyId/case-framework/:section → CaseFrameworkSectionCanvas
/studies/:studyId/:session                → ResearchSessionCanvas (resto)
```

Declarar rutas `case-framework` y `case-framework/:section` **antes** o como ramas explícitas bajo `StudyWorkspace`, no dejar que `:session` capture `case-framework` sin children. Invalid `:section` → Navigate a overview.

Path helpers: extender `studySessionPath` / añadir `caseFrameworkSectionPath`.

### 4. Domain config, not hardcoded UI trees

Un módulo `caseFrameworkSections.ts` (o similar) declara para cada section: id, label ES, purpose, Icon, ordered fields `{ key, title, description, guidingQuestion }`. Overview y Section Canvas se parametrizan con esa config. UI genérica (`MarkdownResearchEditor`, `CaseFrameworkSectionCanvas`, `CaseFrameworkOverview`) no conoce copy de investigación hardcodeado fuera de la config.

### 5. Markdown: source of truth = string; render en overview

- Persistencia: Markdown crudo.
- Edición v1: textarea + toolbar mínima (inserta sintaxis) **o** dependencia ligera (`@uiw/react-md-editor` / similar) si el costo de integración es bajo; preferir una sola lib compartida para edit+preview si se añade.
- Overview: render Markdown → HTML seguro (sanitizar). Sin edición in-place en overview.

### 6. Autosave

- Debounce ~600–1000 ms por sección (no por tecla al servidor).
- Estados UI: idle Guardado / Guardando… / Guardado hace unos segundos / error discreto reintentable.
- `beforeunload` / cleanup en unmount: flush pendiente.
- Al cambiar de ruta dentro del Marco: flush antes de desmontar.

### 7. Sidebar accordion

- Solo `case-framework` tiene children en este change.
- Expandido si URL está bajo `case-framework` **o** el usuario lo abre manualmente; al navegar a otra sesión primaria se colapsa.
- Exclusive: no hay otros acordeones aún; seleccionar otra sesión primaria cierra children.
- Indicadores de progreso: punto/tono discreto por status (tokens), no badges tipo admin.

Icon mapping (catálogo actual; añadir SVG solo si falta semántica clara):

| Section | Preferencia |
|---------|-------------|
| conceptual-evolution | TimelineIcon / QuestionIcon |
| theoretical-framework | DocumentIcon / ChatIcon |
| fundamental-concepts | GraphIcon / WorkspaceIcon |
| tensions | WarningIcon / DecisionIcon |
| consolidated-object | EyeIcon / CheckIcon |

### 8. UX composition

Overview: lectura curada en secuencia numerada 01–05 con relación visual (eje/progresión sutil), no cards administrativas. Section Canvas: bloques Título → descripción → pregunta → editor, generosos en espacio vertical. Copy ES; ids EN.

## Risks / Trade-offs

- [Risk] Nested routes rompen el match actual de `:session` → Mitigation: rutas explícitas en `AppRouter` + tests de smoke de deep links.
- [Risk] Debounce pierde edits en crash/navegación rápida → Mitigation: flush on unmount + error banner reintentable.
- [Risk] Markdown XSS en overview → Mitigation: sanitizer obligatorio al render.
- [Risk] JSON `fields` sin schema DB estricto → Mitigation: validar keys contra config de dominio en serializer; ignorar/rechazar keys desconocidas.
- [Risk] Acordeón + compact mobile → Mitigation: reutilizar responsive del rail; children siguen accesibles (stack/expand), no eliminar subelementos.
- [Trade-off] Toolbar Markdown simple vs editor rico → se elige simplicidad; se puede sustituir la implementación del editor sin cambiar el contrato de API/specs.

## Migration Plan

1. Migración Django: modelos CaseFramework / CaseFrameworkSection.
2. Desplegar API get-or-create (Studies existentes obtienen framework vacío al primer GET).
3. Frontend: rutas + nav acordeón + instrumentos; feature flag innecesaria (default session ya es case-framework).
4. Rollback: revertir frontend a Canvas vacío y dejar tablas huérfanas inofensivas, o drop models en migración inversa si hace falta.

## Open Questions

- Ninguna que bloquee specs/tasks: si el catálogo de iconos no cubre semántica ideal, se reutilizan los más cercanos y se documenta en tasks añadir SVG solo si el vacío semántico es evidente en UI review.
