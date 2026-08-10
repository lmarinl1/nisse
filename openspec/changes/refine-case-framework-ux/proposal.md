## Why

El Marco del objeto de estudio ya persiste y navega, pero la edición se siente aún como formulario (check de revisado, acordeón con botón externo, overview denso) y no como instrumento de investigación. Hay que pulir navegación, headers de progreso, editores Markdown y la lectura integrada antes de que el hábito de uso se fije.

## What Changes

- Integrar un **chevron** de expandir/replegar dentro del ítem principal del Sidebar (no botón externo); hover amarillo con halo circular.
- Canvas de subelemento en **mosaico de 2 columnas**; header protagónico con título, subtítulo, marca del Marco, estado de progreso y feedback de guardado.
- Sustituir el checkbox “Revisado” por un **toggle de línea de color** y copy **“Marcar como terminado”**; el estado de producto **Terminado** reemplaza **Revisado**.
- Cada campo: título + subtítulo; pregunta orientadora como pista (footer/tooltip); tabs **Escribir** / **Previsualizar** Markdown.
- Scrollbar del menú Proceso más delgada, estética de **cápsula amarillo tenue sobre línea** (no riel clásico).
- Overview del ítem principal: header con tracking de estados de los cinco subítems (círculos amarillos); campos en **cuadros de tamaño fijo**; overflow abre **Drawer derecho** de lectura Markdown completa (no editable).

## Non-goals

- No cambiar el modelo de cinco secciones ni sus field keys de dominio.
- No IA, colaboración, versionado ni exportación.
- No rediseñar el resto de sesiones del Proceso ni el Companion genérico (salvo reutilizar patrón Drawer).
- No archivar ni fusionar automáticamente el change `add-case-framework-content` (coordinar al archivar).

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `case-framework`: composición de Canvas (mosaico, header, toggle terminado, tabs MD, overview fijo + Drawer overflow); labels de progreso Terminado.
- `research-session-nav`: chevron integrado en el ítem `case-framework`; scrollbar del menú Proceso con estética cápsula.

## Impact

- **Frontend / UX-workspace** principalmente; API: solo si se renombra el status `reviewed` → `completed`/`terminated` en contrato (preferir label UI + mantener bool `reviewed` si se evita **BREAKING**).
- Iconografía: nuevo `chevron` en `shared/icons` (no existe hoy).
- Research question: ¿Cómo se lee y escribe el Marco sin sentir administración?
- Cognitive Objects: ninguno nuevo.
