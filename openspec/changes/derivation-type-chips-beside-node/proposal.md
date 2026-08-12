## Why

Las chips de tipos dentro del nodo alargaron el círculo (pill/óvalo) y rompen la lectura del grafo. Hay que conservar el círculo perfecto y sacar las etiquetas a un costado, sin perder el acceso a la card de detalle.

## What Changes

- Sacar la toolbar de tipos **fuera** del círculo del nodo de derivación (a un costado).
- Cuando las chips están a la **derecha** del nodo, alinearlas a la **izquierda** (columna anclada al borde del círculo).
- Restaurar el nodo a círculo de dimensiones fijas iguales (`border-radius: 50%`); el nombre permanece dentro del círculo.
- Mantener clic en chip → card (nombre, referencia, inspiración, pista) y `nodrag`/`nopan`.

## Non-goals

- Cambiar el catálogo de tipos, API o el mosaico «Ver más» del Drawer.
- Rediseñar edges/handles ni el layout automático del grafo (salvo el bounding box del node wrapper).

## Capabilities

### New Capabilities

- (ninguna)

### Modified Capabilities

- `time-derivations`: las chips de tipos dejan de vivir dentro del círculo; pasan a un rail lateral alineado para no deformar el nodo.

## Impact

- **Frontend / UX Workspace** — `DerivationNodes`, CSS de `time-derivations` (wrapper círculo + rail).
- **Cognitive Objects:** Derivación, Tipo de deriva.
- **Pregunta de investigación:** ¿Qué lentes cargan esta deriva sin perder la forma del objeto en el Canvas?
- **Backend:** ninguno.
