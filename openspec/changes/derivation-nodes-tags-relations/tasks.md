## 1. Backend tags on derivations

- [x] 1.1 Extender modelo Neo4j/`derivations.py`: propiedad `tags` (lista de strings) en create/update/serialize; default `[]`
- [x] 1.2 Aceptar `tags` en PATCH (y opcionalmente POST) de nodos; validar lista de strings no vacíos, dedupe
- [x] 1.3 Incluir `tags` en GET grafo; smoke/test mínimo de persistencia de tags

## 2. Nodos circulares y contenido

- [x] 2.1 Restylar `.td-node` / root / derivation: círculo, borde Discovery Yellow, fondo transparente
- [x] 2.2 Mostrar nombre + label ES del tipo en `DerivationFlowNode`; root circular distinguible sin tipo de deriva
- [x] 2.3 Ajustar handles y overflow de texto largo (ellipsis / title)

## 3. Eliminación de aristas

- [x] 3.1 Verificar selección de edge + Delete/Backspace persiste; feedback de error si falla
- [x] 3.2 Refuerzo visual de edge seleccionada (stroke Discovery) para que la eliminación sea descubrible

## 4. Drawer: vecinos y etiquetas

- [x] 4.1 Calcular padres/hijos desde edges del grafo y renderizar carruseles de cards en `DerivationDrawer`
- [x] 4.2 Click en card de vecino selecciona ese nodo (abre su Drawer / foco en Canvas)
- [x] 4.3 UI de etiquetas (chips + agregar/quitar) en el Drawer; persistir vía `updateDerivationNode`
- [x] 4.4 Extender tipos/cliente API (`tags` en `DerivationNode` / patch)
- [x] 4.5 Typecheck frontend WSL: `cd frontend && npx tsc -b`
