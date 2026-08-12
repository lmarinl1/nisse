## Why

El grafo de Derivaciones del tiempo aún se lee como nodos rectangulares densos y poco instrumentales: no muestra el tipo en el Canvas, las relaciones padre/hijos solo se intuyen en el grafo, y no hay etiquetas persistentes para clasificar pistas. Hace falta un lenguaje visual circular (borde Discovery Yellow, fondo transparente) y un Drawer que haga explícitas las conexiones y las etiquetas.

## What Changes

- Nodos **circulares** con **borde amarillo Discovery** y **fondo transparente** (root y derivaciones; root sigue distinguible).
- Dentro del nodo: **nombre** + **tipo de deriva** (label ES de la taxonomía).
- **Eliminar aristas** de forma fiable (selección + Delete/Backspace y feedback); persistencia ya parcial — reforzar UX/contrato.
- En el Drawer de una derivación: **nodo padre(s)** y **nodos hijos** como **cards en carrusel** horizontal.
- **Etiquetas** por nodo: agregar/quitar y **persistir** (Neo4j vía API); visibles y editables en el Drawer.

## Non-goals

- Auto-layout, IA, tipos de relación tipados más allá de `derives_toward`.
- Rediseñar taxonomía de tipos o impacto.
- Colaboración / comentarios / versionado de etiquetas.

## Capabilities

### New Capabilities

- (ninguna capability path nueva de producto)

### Modified Capabilities

- `time-derivations`: visual de nodos, eliminación de edges, navegación padre/hijos en Drawer, etiquetas persistentes.

## Impact

- **Frontend + backend** (API/Neo4j para `tags`; payload de grafo enriquecido con vecinos).
- Feature `time-derivations` (nodos CSS/React Flow, Drawer, canvas edges).
- **Research question:** sin cambio.
- **Cognitive Objects:** Derivation gana `tags`; relaciones padre/hijo solo de lectura en UI.
