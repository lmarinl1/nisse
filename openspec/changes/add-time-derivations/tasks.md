## 1. Infra Neo4j y configuración

- [x] 1.1 Añadir servicio `neo4j` (imagen oficial 5.x) a `docker-compose.yml` con volumen `neo4j_data`, puertos 7474/7687 y `NEO4J_AUTH` vía variables de entorno
- [x] 1.2 Documentar `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD` en `backend/.env.example` (y raíz si aplica); sin secrets reales en git
- [x] 1.3 Verificar en WSL: `docker-compose up -d` levanta Mongo + Neo4j y Bolt responde en `localhost:7687`

## 2. Backend Neo4j client y dominio de grafo

- [x] 2.1 Añadir dependencia del driver Neo4j al entorno Linux (`.venv`) y settings Django que lean `NEO4J_*`
- [x] 2.2 Implementar cliente/servicio Cypher: `ensure_graph(study)`, MERGE grafo único, nodo raíz, CRUD nodos/edges, update posición, cascade de edges al borrar derivación; filtrar siempre por `study_id`
- [x] 2.3 En creación de Study (hook existente junto a case-framework/timeline), llamar `ensure_graph`; root name = Study.name; ensure idempotente también en GET
- [x] 2.4 Al renombrar Study, actualizar nombre del nodo raíz (signal o en ensure/GET — documentar la opción elegida)

## 3. API derivaciones

- [x] 3.1 Exponer endpoints owner-only bajo `/api/studies/<pk>/derivations/` (GET grafo, POST/PATCH/DELETE nodes, POST/DELETE edges) según design.md
- [x] 3.2 Validar: rechazar delete de root; edges solo entre nodos del mismo Study; `recall_id` opcional debe pertenecer al Study (Mongo)
- [x] 3.3 Tests API enfocados (WSL: `source .venv/bin/activate && cd backend && python manage.py test`): ensure idempotente, foreign Study denied, posición, connect/disconnect, delete limpia edges, root protegido

## 4. Frontend sesión y cliente

- [x] 4.1 Insertar sesión `time-derivations` («Derivaciones del tiempo», `BranchIcon` o `NetworkIcon`) inmediatamente debajo de `case-framework` en `researchSessions.ts`; helper `timeDerivationsPath`
- [x] 4.2 Añadir `@xyflow/react` en `frontend` (WSL: `cd frontend && npm install @xyflow/react`)
- [x] 4.3 Extender API client tipado: get graph, node/edge mutations, position patch; taxonomía centralizada de tipos/impacto (ES labels)

## 5. Routing y Canvas React Flow

- [x] 5.1 Registrar ruta `/studies/:studyId/time-derivations` en `AppRouter` dentro de `StudyWorkspace` (feature `time-derivations`)
- [x] 5.2 Implementar `DerivationsCanvas` con nodos custom root/derivación, edges dirigidos, Controls tematizados NISSE, pan/zoom/fit, sin auto-layout
- [x] 5.3 Wire create desde Canvas (+ desde nodo seleccionado con auto-edge); persistir posición on drag stop; connect/disconnect optimistas con revert en error
- [x] 5.4 Estados vacío (solo root + CTA), loading y error con reintentar; verificar tokens + Canvas protagonista (sin tablas/admin)

## 6. Drawers y vínculo a Recuerdo

- [x] 6.1 `DerivationDrawer` (ResearchDrawer): editar nombre, Markdown, tipo, impacto, especulativa; guardar; eliminar derivación
- [x] 6.2 Selector «Relacionar con un recuerdo» con búsqueda/filtro (nombre, fecha, línea) usando Recalls del mismo Study; degradar si falta
- [x] 6.3 `StudyRootDrawer` contextual (nombre, descripción, conteos; sin editar identidad del Study desde aquí)

## 7. Smoke y cierre

- [x] 7.1 Smoke manual WSL (backend + Neo4j + `cd frontend && npm run dev`): menú orden, URL, grafo único, root inborrable, CRUD nodos/edges, persistencia posición/reload, Drawer, recall link, authz
- [x] 7.2 Typecheck/build frontend en WSL: `cd frontend && npx tsc -b && npm run build`
