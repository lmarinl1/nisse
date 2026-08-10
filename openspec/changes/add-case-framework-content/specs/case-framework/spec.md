## Purpose

Define the Case Framework research instrument inside an Objeto de Estudio: five progressive Markdown sections, a read-only integrated overview Canvas, autosave persistence, and non-blocking progress — without linear wizards or AI.

## ADDED Requirements

### Requirement: Case Framework belongs to exactly one Study
The system SHALL associate at most one Case Framework aggregate with each Study. Every Case Framework section MUST belong to that Study's Case Framework. The system MUST NOT allow a Case Framework or section to be shared across Studies or to exist without a Study.

#### Scenario: Framework scoped to Study
- **WHEN** the owner opens Case Framework for Study A
- **THEN** only content persisted for Study A is shown, never content from Study B

### Requirement: Five progressive research sections
The Case Framework SHALL expose exactly five sections in this conceptual order, with Spanish product labels: (1) Tema de partida y evolución conceptual, (2) Marco teórico-conceptual, (3) Conceptos fundamentales para el abordaje, (4) Problemáticas o tensiones establecidas, (5) Objeto de estudio consolidado. Stable section ids MUST be: `conceptual-evolution`, `theoretical-framework`, `fundamental-concepts`, `tensions`, `consolidated-object`. The order expresses epistemological progression and MUST NOT enforce a linear completion path.

#### Scenario: All sections available without order lock
- **WHEN** the owner opens any of the five section ids under a Study's Case Framework
- **THEN** that section's editable Canvas is available regardless of whether other sections are empty

### Requirement: Section field structure
Each section SHALL persist a structured set of Markdown fields defined for that section type (not a single undifferentiated blob as the primary model). Field keys and guiding questions MUST match the domain configuration for that section. Empty fields MUST be allowed. The system MUST NOT require all fields to be filled before saving or navigating away.

#### Scenario: Save partial section content
- **WHEN** the owner writes Markdown in one field of Conceptual Evolution and leaves other fields empty
- **THEN** the saved section retains that field's Markdown and empty values for the rest

#### Scenario: Conceptual Evolution fields
- **WHEN** the owner opens Tema de partida y evolución conceptual
- **THEN** the Canvas presents Markdown fields for intuición o pregunta inicial, desplazamientos conceptuales, decisiones teóricas y metodológicas, and evolución del pensamiento, each with title, brief description, and guiding question

#### Scenario: Theoretical Framework fields
- **WHEN** the owner opens Marco teórico-conceptual
- **THEN** the Canvas presents Markdown fields for conversaciones teóricas, aportes de los interlocutores, tensiones y desacuerdos, reinterpretaciones y desplazamientos, and cruces entre enfoques

#### Scenario: Fundamental Concepts fields
- **WHEN** the owner opens Conceptos fundamentales para el abordaje
- **THEN** the Canvas presents Markdown fields for conceptos fundamentales, relaciones entre conceptos, and conceptos heredados y resignificados

#### Scenario: Tensions fields
- **WHEN** the owner opens Problemáticas o tensiones establecidas
- **THEN** the Canvas presents Markdown fields for tensiones principales, origen de las tensiones, productividad de las tensiones, and tensiones irresueltas

#### Scenario: Consolidated Object fields
- **WHEN** the owner opens Objeto de estudio consolidado
- **THEN** the Canvas presents Markdown fields for definición del objeto, delimitación del campo, diferenciación, relación con conceptos teorías y tensiones, and estado actual del objeto

### Requirement: Editable Markdown Canvas per section
Each section SHALL render an independent editable Canvas that shows only that section's fields. Each field MUST support Markdown writing for headings, bold, italic, lists, numbered lists, block quotes, and links. The Canvas MUST feel like a reflective writing instrument (space for thought, guiding questions) and MUST NOT present as a dense administrative form, table, or forced wizard.

#### Scenario: Section Canvas isolates fields
- **WHEN** the owner is on Fundamental Concepts
- **THEN** only that section's fields are editable on the Canvas, not fields from other sections

#### Scenario: Markdown persists as source
- **WHEN** the owner saves Markdown containing a heading, a list, and a link
- **THEN** subsequent loads return the same Markdown source for that field

### Requirement: Autosave without interrupting writing
Edits SHALL persist through automatic save with discrete feedback states such as Guardado, Guardando…, and Guardado hace unos segundos. The system MUST NOT interrupt writing with modales for routine saves. Navigating between Case Framework Canvases MUST NOT discard unsaved edits that have not yet flushed; the client MUST flush or retain them so content is not lost.

#### Scenario: Autosave after pause
- **WHEN** the owner types in a field and pauses briefly
- **THEN** the content is persisted and discrete save feedback is shown without a modal

#### Scenario: Switch section without losing draft
- **WHEN** the owner has recent unsaved keystrokes and navigates to another Case Framework section
- **THEN** those keystrokes are not lost (flushed or recovered before the previous Canvas unmounts)

### Requirement: Integrated read-only overview Canvas
The Case Framework overview route SHALL present a curated, non-editable reading of all five sections as a progressive construction of the research object. For each section the overview MUST show number, name, purpose, current rendered content, progress status, and an action to open that section's editable Canvas. The overview MUST be a derived representation of the five sections and MUST NOT become a second writable data source.

#### Scenario: Overview shows persisted Markdown as rich content
- **WHEN** the owner opens the Case Framework overview after writing Markdown in Tensiones
- **THEN** the Tensiones block renders that content as enriched text (not raw-only admin dump) and remains non-editable on the overview

#### Scenario: Edit action opens section Canvas
- **WHEN** the owner activates the edit action for Conceptos fundamentales on the overview
- **THEN** they navigate to that section's editable Canvas URL within the same Study

#### Scenario: Empty section still listed
- **WHEN** a section has no content yet
- **THEN** the overview still lists it with purpose and status, without inventing placeholder research conclusions

### Requirement: Non-blocking progress status
Each section SHALL expose a progress status among: Sin comenzar, En construcción, Con contenido, Revisado. Status MUST be derived from content and/or an explicit reviewed mark, MUST be visible discreetly in navigation and overview, and MUST NOT block navigation or editing of any section.

#### Scenario: Empty section is Sin comenzar
- **WHEN** all fields of a section are empty and it is not marked Revisado
- **THEN** its status is Sin comenzar

#### Scenario: Partial content is En construcción
- **WHEN** at least one field has content but not all fields have content and it is not Revisado
- **THEN** its status is En construcción

#### Scenario: Full content is Con contenido
- **WHEN** every field of a section has non-empty content and it is not Revisado
- **THEN** its status is Con contenido

#### Scenario: Reviewed is non-blocking
- **WHEN** a section is marked Revisado
- **THEN** its status shows Revisado and the owner can still open and edit any Case Framework section

### Requirement: Owner-only Case Framework access
Only the Study owner SHALL retrieve or update that Study's Case Framework. Requests from non-owners MUST be denied without leaking another owner's content.

#### Scenario: Foreign Case Framework denied
- **WHEN** an authenticated user requests Case Framework for a Study they do not own
- **THEN** the API responds with 404 or 403 and no section Markdown is returned
