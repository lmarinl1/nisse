## 1. Session nav order

- [x] 1.1 Reordenar `RESEARCH_SESSIONS`: `timelines` antes que `time-derivations` (tras `case-framework`)

## 2. Recall temporal month/day

- [x] 2.1 Añadir campos opcionales mes y día en create recuerdo (`TimelineCanvas`) y en edit (`RecallDrawer`); persistir `temporal_month` / `temporal_day`
- [x] 2.2 Verificar orden ascendente en pista tras guardar (sort_key existente)

## 3. Relation cards

- [x] 3.1 Introducir carrusel/cards de relación (estilo vecinos): título, línea de tiempo, abrir, quitar
- [x] 3.2 RecallDrawer: mostrar conexiones de colapso como cards; add/remove (dialog o API)
- [x] 3.3 DerivationDrawer: card(s) de recuerdo relacionado + agregar/quitar `recall_id`; clic navega/enfoca recuerdo
- [x] 3.4 Clic en card abre el recuerdo en contexto de su línea (navigate + select)

## 4. Verify

- [x] 4.1 Smoke: orden del rail, create con mes/día, cards colapso, cards derivación↔recuerdo
- [x] 4.2 Typecheck WSL: `cd frontend && npx tsc -b`
