# React Flow y canvases de grafo

## Qué hay en el repo

- Dependencia: `@xyflow/react` (React Flow v12) en `frontend/package.json`.
- Uso principal: **Derivaciones del tiempo** — `frontend/src/features/time-derivations/DerivationsCanvas.tsx`.
- Nodos custom (`studyRoot`, `derivation`), edges dirigidos, Controls (y chrome temático con tokens NISSE; no el tema claro por defecto de la librería).
- Persistencia de layout: posiciones vía API Django → Neo4j (no estado solo-local).

## Qué no es

- No es un tutorial de React Flow.
- Otras sesiones (p. ej. timelines) usan canvas propios **sin** React Flow salvo que se documente lo contrario.
- Librerías aspiracionales del Design Language (Zustand, TanStack Query, etc.) no sustituyen a `@xyflow/react` para el grafo de derivaciones.

## Convenciones UX

- El Canvas sigue siendo protagonista; Drawers (`ResearchDrawer` / drawers de derivación) son secundarios.
- Controles de nodo que no deben arrastrar el grafo usan patrones `nodrag` / `nopan` de React Flow cuando aplica.
- Iconos solo desde `frontend/src/shared/icons`.

## Lecturas relacionadas

- [dual-store.md](./dual-store.md) — por qué el grafo vive en Neo4j.
- Design Language: `docs/ux-framework/12-react-architecture.md`.
- Feature folder: `frontend/src/features/time-derivations/`.
