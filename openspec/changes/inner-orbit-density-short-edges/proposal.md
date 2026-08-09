## Why

El núcleo ya es más denso tras el triad micro-nodo, pero las dos órbitas internas aún no concentran estrellas como un anillo denso, y las conexiones pueden saltar más de un paso orbital. Eso diluye la lectura de “plexus local” cerca del centro.

## What Changes

- Multiplicar por **5** la cantidad de estrellas asignadas a las **primeras 2 órbitas** (respecto a su población actual en esas órbitas).
- Densificar un poco más el centro (núcleo / anillos internos) sin rehacer auth ni el layout Study.
- Acortar las conexiones emergentes: la longitud máxima de un edge **nunca** debe superar la distancia entre dos órbitas consecutivas (el paso orbital del campo).

## Non-goals

- No triplicar de nuevo todo el campo ni cambiar tamaños de puntos globales.
- No añadir labels, interacción, WebGL ni nuevas deps.
- No tocar backend ni flujos de login.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `research-network-atmosphere`: densidad ×5 en órbitas 1–2; tope de longitud de conexión = distancia inter-órbita; centro un poco más denso.

## Impact

- **Frontend / UX:** `ResearchNetworkAtmosphere.tsx` (asignación por anillo, conteos internos, `EDGE_MAX_DIST` / umbral en unidades de `RING_STEP`).
- **Backend:** ninguno.
- **Research question:** ¿el centro se lee como un núcleo relacional denso con vínculos estrictamente locales?
- **Cognitive Objects:** ninguno.
