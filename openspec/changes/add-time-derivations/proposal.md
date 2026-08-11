## Why

Tras el Marco del objeto de estudio, el Diseñador de Futuros necesita un laboratorio para explorar **hacia dónde puede derivar** la investigación: asociaciones abiertas (inspiración, tensión, especulación), no causalidad ni administración. Hoy no existe ese instrumento de grafo entre el marco y las líneas de tiempo.

## What Changes

- Nueva sesión de investigación **Derivaciones del tiempo** (`time-derivations`), inmediatamente debajo de **Marco del objeto de estudio**, sin subitems; abre su Canvas de grafo.
- Un **único grafo de derivaciones por Objeto de Estudio**, con nodo raíz = Study (no eliminable) y nodos de derivación editables vía Drawer.
- Canvas con **React Flow**: crear/mover/conectar/desconectar/eliminar nodos; zoom/pan/fit; posiciones persistidas; Drawer derecho sin desmontar el Canvas.
- Campos de derivación: nombre, descripción Markdown, tipo de deriva, impacto, especulativa, recuerdo relacionado (opcional, por id de Recall del mismo Study).
- **Neo4j** como fuente de verdad del grafo (nodos/edges); Django API intermedia; React no habla con Neo4j; servicio en `docker-compose.yml` + volumen + env.
- Al crear un Study, materialización idempotente del grafo con solo el nodo raíz.

## Non-goals

- IA, recomendaciones, RAG, auto-layout, colaboración, comentarios, versionado, import/export, métricas de grafo (centralidad, clustering).
- Múltiples grafos por Study; edición del Study desde el Drawer raíz.
- Conexión directa frontend→Neo4j; almacenar el grafo completo como JSON en MongoDB.

## Capabilities

### New Capabilities

- `time-derivations`: instrumento de exploración por grafo (nodo raíz, derivaciones, edges, Drawer, React Flow, vínculo opcional a Recall, estados vacío/carga/error).

### Modified Capabilities

- `research-session-nav`: insertar sesión `time-derivations` debajo de `case-framework`; icono de ramificación/red (no reloj).
- `frontend-app`: ruta `/studies/:studyId/time-derivations` con Canvas de grafo (no genérico vacío).
- `backend-api`: config Neo4j + endpoints Study-scoped del grafo; autorización owner-only.
- `study-objects`: al crear Study, garantizar grafo único con nodo raíz; artefactos de derivación pertenecen al Aggregate Root.
- `project-structure`: `docker-compose.yml` incluye servicio Neo4j con volumen.

## Impact

- **Backend + frontend + UX/workspace + infra** (un change API+UI+Docker).
- **Deps:** `@xyflow/react` (React Flow); driver Neo4j en Django; servicio `neo4j` en Compose.
- **Recall** sigue en MongoDB; Neo4j guarda solo `recall_id` opcional.
- **Research question:** ¿Hacia dónde puede derivar este objeto si sigo esta pista?
- **Cognitive Objects:** Derivation, DerivationGraph, edge `DERIVES_TO`; vínculo a Recall existente.
