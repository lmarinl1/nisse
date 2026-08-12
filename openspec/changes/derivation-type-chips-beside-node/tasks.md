## 1. Node structure

- [x] 1.1 Envolver círculo + rail en un contenedor flex (p. ej. `.td-node-wrap`); handles y nombre solo en el círculo
- [x] 1.2 Mover la toolbar de chips al rail lateral derecho, fuera del círculo; `nodrag`/`nopan` + stopPropagation

## 2. Geometry & alignment

- [x] 2.1 Restaurar círculo fijo (ancho = alto, `border-radius: 50%`); quitar pill/`height: auto` del nodo de derivación
- [x] 2.2 Alinear chips a la izquierda en el rail derecho; tokens + gap respecto al círculo

## 3. Verify

- [x] 3.1 Smoke: multi-tipo no deforma el círculo; clic chip abre card; clic nombre abre Drawer
- [x] 3.2 Typecheck WSL: `cd frontend && npx tsc -b`
