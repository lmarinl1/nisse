## Why

Los Research Drawers hoy ocupan ~1/4 del viewport, lo que aprieta formularios densos y deja la interfaz irregular entre superficies. Además, «Agregar derivación» vive en el SessionCanvasHeader y compite con el propósito de la sesión; crear debe sentirse como instrumento sobre el Canvas.

## What Changes

- Todos los drawers del producto (vía `ResearchDrawer`: Study, Timeline, Recuerdo, Derivación, raíz, colapso, etc.) pasan a **~1/3 del viewport** en desktop.
- Reorganizar formularios/contenido dentro de cada drawer para una lectura limpia (jerarquía, ritmo, secciones; sin aspecto de CRUD administrativo).
- En Derivaciones del tiempo: quitar el CTA de agregar del header; **FAB** abajo a la derecha sobre el Canvas.
- Actualizar **`docs/ux-framework/`** (fuente de Design Language) para que el contrato oficial de Drawer sea **≈ ⅓ del viewport**, layout limpio y alineado con la implementación — no dejar la doc en ¼.

## Non-goals

- No cambiar campos de dominio ni backend.
- No convertir Drawer en Modal; no FAB genérico en otras sesiones (salvo que ya tengan CTA propio en header y se deje fuera de alcance).
- No rediseñar SessionCanvasHeader fuera de quitar ese CTA en derivaciones.
- No reescribir el UX framework completo; solo las secciones de Drawer / tokens / patrones que fijen el ancho y el rol del drawer.

## Capabilities

### New Capabilities

- `research-drawer`: contrato compartido de ancho (~1/3 desktop), chrome y layout limpio de formularios para todos los drawers.
- `time-derivations`: affordance de creación vía FAB inferior-derecha; sin CTA en el header de la sesión (delta UX sobre el instrumento de grafo).

### Modified Capabilities

- (ninguna en specs principales archivadas)
## Impact

- **Frontend / UX-workspace** + **docs Design Language**.
- Tokens (`--drawer-width`), `research-drawer.css`, wrappers de drawers, `DerivationsCanvas`.
- Docs: al menos `docs/ux-framework/02-components.md` (contrato ResearchDrawer); revisar menciones de ¼ / drawer en `03-patterns.md`, `06-design-tokens.md`, `05-workspace-grammar.md` si contradicen el ⅓.
- **Research question:** sin cambio.
- **Cognitive Objects:** sin nuevos.
