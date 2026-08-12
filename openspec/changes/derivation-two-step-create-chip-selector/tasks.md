## 1. Shared Chip Selector

- [x] 1.1 Crear `ResearchChipSelector` en `shared/ui` (multi-value, icono oficial + label, tokens Discovery, a11y teclado)
- [x] 1.2 Estilos CSS del chip selector; export en `shared/ui/index`
- [x] 1.3 Nota breve en `docs/ux-framework/02-components.md`: Chip Selector como select multi-respuesta

## 2. Canvas node eyebrow

- [x] 2.1 Mostrar tipo primario en gris (eyebrow) en `DerivationFlowNode`; si `typeCount > 1`, primer nombre + `…`
- [x] 2.2 Pasar primer type name desde `DerivationsCanvas` / `toFlowNodes`; quitar dots si quedan redundantes

## 3. Two-step Drawer

- [x] 3.1 Refactor `DerivationDrawer`: modos create/edit; pasos 1 y 2; Siguiente / Editar
- [x] 3.2 Paso 1: nombre + Chip Selector + mosaico (referencia / nombre / pista) que sigue la selección
- [x] 3.3 Paso 2: resumen nombre+tipos + Editar; descripción, tags, recuerdo, vecinos; Guardar
- [x] 3.4 FAB/create: abrir draft local en paso 1 (sin POST); Guardar en paso 2 crea nodo; edit abre paso 2

## 4. Verify

- [x] 4.1 Smoke: wizard create, mosaico, Editar, eyebrow en Canvas, edit existente
- [x] 4.2 Typecheck WSL: `cd frontend && npx tsc -b`
