## 1. Drawer width token and shared chrome

- [x] 1.1 Actualizar `--drawer-width` en `frontend/src/shared/tokens/tokens.css` a ~1/3 del viewport (p. ej. `clamp(20rem, 33.333vw, 36rem)`) y alinear el comentario del token
- [x] 1.2 Verificar que `research-drawer.css` usa solo `var(--drawer-width)` y que ningún feature drawer redefine un ancho distinto
- [x] 1.3 Ajuste responsive: en viewports estrechos el panel puede acercarse a ancho completo sin romper el slide-over derecho

## 2. Layout limpio de formularios en drawers

- [x] 2.1 Refinar ritmo interno compartido en `research-drawer.css` (body gap, hint, footer de acciones) para stack vertical limpio
- [x] 2.2 Pasada ligera en drawers densos (`RecallDrawer`, `DerivationDrawer`, y si hace falta `TimelineDrawer` / `StudyCreateDrawer`): una columna, grupos claros, sin títulos duplicados ni CTA perdidos en el body
- [x] 2.3 Smoke visual: abrir Study / Timeline / Recuerdo / Derivación / raíz y confirmar 1/3 + lectura limpia (tokens NISSE, Canvas visible)

## 3. FAB de derivaciones

- [x] 3.1 Quitar el botón «Agregar derivación» / «Agregar primera derivación» del `aside` de `SessionCanvasHeader` en `DerivationsCanvas`
- [x] 3.2 Añadir FAB inferior-derecha sobre el stage del Canvas (discovery + `PlusIcon`, label accesible); reutilizar la lógica de `addDerivation`
- [x] 3.3 Evitar solape con Controls/MiniMap de React Flow; mantener hint de estado vacío sin CTA de header
- [x] 3.4 Typecheck frontend en WSL: `cd frontend && npx tsc -b`

## 4. Design Language (`docs/ux-framework/`)

- [x] 4.1 Actualizar `docs/ux-framework/02-components.md` § Drawer / contrato `ResearchDrawer`: ancho oficial **≈ ⅓** del viewport (`--drawer-width`), stack limpio, footer de acciones; eliminar la norma de ¼
- [x] 4.2 Barrer y alinear menciones contradictorias de drawer width (¼ / 25vw / quarter) en otros docs del framework si aparecen (`03-patterns.md`, `05-workspace-grammar.md`, `06-design-tokens.md`, `08-screen-recipes.md`, etc.)
