## Why

Las Derivaciones del tiempo aún clasifican nodos con un tipo único administrativo más Impacto y Especulativa. El Diseñador de Futuros necesita **lentes metodológicas** (varios Tipos de deriva con inspiración, referencia y pista) antes de nombrar la deriva — sin perder grafo Neo4j, tags, vecinos ni vínculo a Recuerdos.

## What Changes

- **BREAKING (API/UI):** eliminar `impact` e `is_speculative` de create/update/serialize y del Drawer.
- Reemplazar el enum de tipo único por **uno o varios** Tipos de deriva del catálogo metodológico (18 entradas iniciales: Ready Made… Decisiones / Intenciones).
- Cada tipo: nombre, inspiración, referencia, pista (instrucción exhortativa).
- Drawer: selector multi arriba del nombre; bloques Inspiraciones / Referencias / Pistas (pistas no fusionadas); nombre; descripción; **tags chip-input**; recuerdo relacionado; **después del textarea**, un único carrusel horizontal con padres e hijos claramente diferenciados.
- Canvas: nodos muestran **solo el nombre** (indicador mínimo opcional de multi-tipo); sin metadata metodológica en el nodo.
- Conservar: React Flow, edges, tags, `recall_id` a Recuerdos de timelines, persistencia Neo4j.

## Non-goals

- Admin UI / CRUD de Tipos desde frontend; IA; fusión automática de pistas; scoring.
- Rediseñar arquitectura del Canvas o del grafo por Study.
- Quitar o debilitar la relación opcional con Recuerdos.

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `time-derivations`: tipología metodológica multi-valor; Drawer ordenado; tags como cápsulas en un input; vecinos unificados post-descripción; Canvas solo nombre; sin impacto/especulativa.
- `backend-api`: contrato de nodos de derivación deja impacto/especulativa; expone tipos asociados (y catálogo).

## Impact

- **Backend + Frontend + UX Workspace:** `backend/core/derivations.py` (+ seed/catálogo), API views/tests; `frontend/src/features/time-derivations/` (taxonomy, Drawer, nodes, CSS); cliente tipado.
- **Research question:** ¿desde qué lente metodológica exploramos esta deriva?
- **Cognitive Objects:** Derivación (tipos como lentes); Recuerdo (vínculo opcional); vecinos del grafo.
