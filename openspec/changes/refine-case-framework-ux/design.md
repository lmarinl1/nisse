## Context

El Marco ya está implementado (`add-case-framework-content`: API, acordeón, overview, editors, autosave). Ver proposal.md — Why. Este change solo refina UX/composición frontend; el contrato de campos y rutas se mantiene.

Constraints: iconos solo vía `shared/icons` (hoy no hay chevron); Drawer antes que Modal; tokens discovery; Canvas protagonista.

## Goals / Non-Goals

**Goals:**
- Chevron integrado + hover amarillo con halo.
- Section Canvas: mosaic 2 col, header protagónico, toggle Terminado, tabs Escribir/Previsualizar, pista de pregunta.
- Overview: header con tracking de estados (círculos amarillos), tiles fijos + Drawer derecho overflow.
- Scrollbar cápsula del menú Proceso.

**Non-Goals:**
- Cambiar field keys, section ids o endpoints salvo label/status de producto Terminado.
- Nuevas deps de editor Markdown pesadas si el preview existente basta con tabs.

## Decisions

### 1. Chevron icon in catalog

Añadir `chevron-down` (y rotación CSS para collapsed/expanded) a `frontend/src/shared/icons` siguiendo el pipeline SVG → registry → named. No reutilizar `ExpandIcon` (semántica distinta).

**Alternative:** rotar `ArrowRightIcon` — menos claro como chevron de acordeón.

### 2. Chevron inside primary NavLink row

Un solo control seleccionable: el `NavLink`/botón del ítem principal contiene label + icono de sesión + chevron. Click en el cuerpo navega al overview y expande; el chevron puede `stopPropagation` solo si se necesita toggle sin navegar — **preferencia:** click en cualquier parte del ítem navega a overview y asegura expandido; segundo gesto o chevron colapsa solo cuando ya estás bajo `case-framework` (o chevron siempre togglea expand sin impedir NavLink al overview vía área principal).

Decisión concreta: fila única; chevron a la derecha **dentro** del hit-target; click chevron toggles expand; click resto → `case-framework` overview + expand. Hover: chevron `color: discovery` + `::after` círculo halo (token).

### 3. Status label Terminado without API BREAKING

Mantener bool `reviewed` y status API `reviewed`; UI copy = **Terminado** / **Marcar como terminado**. `PROGRESS_STATUS_LABELS.reviewed = 'Terminado'`.

**Alternative:** renombrar API a `completed` — **BREAKING** innecesario ahora.

### 4. Terminado toggle = color-line switch

Componente `SectionCompletionToggle`: track con segmento discovery; thumb; estados on/off; accesible (`role="switch"`). Reemplaza checkbox.

### 5. Mosaic + field chrome

CSS grid `repeat(2, minmax(0, 1fr))` en section fields; 1 col bajo breakpoint Workspace. Cada celda: título, subtítulo (description), tabs Escribir|Previsualizar, editor/preview, footer hint con guiding question (tooltip `title` + texto footer discreto).

Preview: reutilizar `renderMarkdownToHtml`.

### 6. Overview tiles + Drawer

Tiles altura/min-height fijos (p.ej. ~12–14rem). Overflow detectado vía `scrollHeight > clientHeight` o clamp + botón “Ver completo”. Drawer derecho (`CaseFrameworkFieldDrawer`) montado en stage (no modal); overlay sutil; contenido MD read-only; cerrar con Escape/click fuera/botón.

Header overview: banda con 5 nodos (círculos amarillos + label/status) alineados al tracking actual del nav.

### 7. Capsule scrollbar

Pseudo-elementos `::-webkit-scrollbar*` en `.research-session-nav` (y Firefox `scrollbar-width: thin; scrollbar-color`). Thumb discovery tenue; track transparente/línea 1px — sin riel pesado.

## Risks / Trade-offs

- [Risk] `add-case-framework-content` aún no archivado → Mitigation: archivar primero ese change o fusionar deltas de `case-framework` al archivar este.
- [Risk] Toggle chevron vs navegación confusa → Mitigation: hit areas claras + aria-expanded.
- [Risk] Overflow detection frágil con MD async → Mitigation: ResizeObserver tras render.
- [Trade-off] Mantener `reviewed` en API vs rename → se elige label-only para evitar BREAKING.

## Migration Plan

1. Frontend-only deploy (icon + CSS + componentes).
2. Sin migración DB.
3. Rollback: revertir UI; API intacta.

## Open Questions

- Ninguna bloqueante: si el toggle “solo chevron colapsa sin navegar” vs “toda la fila navega” se ajusta en apply tras smoke de un click.
