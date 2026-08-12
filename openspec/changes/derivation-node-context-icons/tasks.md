## 1. Icons & data

- [x] 1.1 Añadir icono oficial `tag` al set (`shared/icons`) si aún no existe; mapear description→`document`, temporal→`timeline-clock`
- [x] 1.2 Extender `DerivationFlowNodeData` + `toFlowNodes`/merge con description, tags y recall enriquecido

## 2. Context affordances UI

- [x] 2.1 Rail: iconos solo si hay dato; estado apagado por defecto y amarillo discovery con popover abierto; `nodrag`/`nopan`
- [x] 2.2 Popover descripción: Markdown renderizado (helper existente)
- [x] 2.3 Popover vínculo temporal: card con línea, título del recuerdo y fecha formateada
- [x] 2.4 Popover tags: listar etiquetas del nodo

## 3. Verify

- [x] 3.1 Smoke: sin dato no hay icono; con dato apagado→clic encendido + contenido correcto; círculo intacto
- [x] 3.2 Typecheck WSL: `cd frontend && npx tsc -b`
