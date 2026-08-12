## 1. Layout chain

- [x] 1.1 Inspeccionar cadena Outlet (`workspace__stage` → wrappers → `TimelineCanvas`) y asegurar `flex: 1`, `min-height: 0`, altura usable hasta el root del instrumento
- [x] 1.2 Ajustar `workspace.css` solo si el stage no acota altura al hijo (cambio mínimo)

## 2. Timeline Canvas scroll containment

- [x] 2.1 En `timelines.css`, contener `.timeline-canvas` como Case Framework: `height: 100%`, `min-height: 0`, `overflow-y: auto` (y `overflow-x: hidden` si aplica)
- [x] 2.2 Aplicar el mismo patrón a `.timelines` (overview) solo si el overview también provoca scroll de página
- [x] 2.3 Confirmar tokens + gramática Canvas/Companion: rail y Companion fijos; sin rediseño de track/Drawer

## 3. Verify

- [x] 3.1 Smoke desktop: Timeline con muchos Recuerdos — scroll solo en stage; Sidebar/Companion fijos; Drawer usable
- [x] 3.2 Typecheck frontend WSL: `cd frontend && npx tsc -b`
