## 1. Catalog & backend contract

- [x] 1.1 Crear catálogo seed de 18 Tipos de deriva (id estable, name, inspiration, reference, prompt) en backend + mirror tipado frontend
- [x] 1.2 Extender Neo4j serialize/create/update: `type_ids` (≥1, dedupe); emitir `derivation_types[]`; dejar de escribir/exigir `derivation_type`, `impact`, `is_speculative`
- [x] 1.3 Exponer `GET` catálogo (p. ej. `/api/studies/:id/derivations/types/`) y aceptar `type_ids` en POST/PATCH de nodos; mantener `recall_id` y `tags`
- [x] 1.4 Actualizar tests API: multi-tipo, rechazo sin tipos, recall+tags; sin impacto/especulativa

## 2. Frontend client & taxonomy

- [x] 2.1 Reemplazar taxonomía administrativa/`IMPACT_*` por catálogo metodológico; tipos cliente (`derivation_types`, `type_ids`)
- [x] 2.2 Actualizar `createDerivationNode` / `updateDerivationNode` / graph types; consumir catálogo

## 3. Drawer UX

- [x] 3.1 Reordenar Drawer: multi-select Tipos (arriba) → inspiración/referencia/pistas individuales → nombre → descripción → tags chip-input → recuerdo → carrusel vecinos
- [x] 3.2 Chip-input de etiquetas: Enter (y opcionalmente coma) crea cápsula en el mismo control; quitar; límites existentes
- [x] 3.3 Unificar padres/hijos en un solo carrusel horizontal post-textarea con diferenciación clara Padre/Hijo; click enfoca vecino
- [x] 3.4 Quitar UI de Impacto y Especulativa; validar ≥1 tipo al guardar; conservar picker de Recuerdos

## 4. Canvas

- [x] 4.1 Nodos de derivación: solo nombre (sin label de tipo); indicador mínimo opcional multi-tipo

## 5. Verify

- [x] 5.1 Smoke: crear/editar con varios tipos, pistas visibles, tags por Enter, recuerdo, carrusel vecinos, grafo sin impacto
- [x] 5.2 Typecheck WSL: `cd frontend && npx tsc -b`; tests backend relevantes
