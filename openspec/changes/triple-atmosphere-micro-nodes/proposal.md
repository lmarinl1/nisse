## Why

Tras densificar órbitas y auth, los nodos siguen leyéndose como estrellas grandes y el campo no alcanza la textura de polvo/plexus denso del centro. El usuario pide un ajuste explícito: **×3 puntos**, **÷3 tamaño**, **×3 conexiones concurrentes**, con mayor densidad hacia el núcleo.

## What Changes

- Triplicar la cantidad de nodos/partículas de `ResearchNetworkAtmosphere` (orbitales, extra-orbitales y núcleo) respecto a los conteos actuales.
- Reducir el radio de dibujo de puntos/estrellas aproximadamente a un tercio.
- Triplicar el tope de conexiones vivas a la vez (y la tasa de aparición si hace falta para sostener ese tope).
- Sesgar más la densidad hacia el centro (más partículas de núcleo / sesgo radial) sin cambiar el motivo orbital ni montajes Study/auth.

## Non-goals

- No rediseñar auth/Study layout ni props `layout`/`density`.
- No añadir labels, interacción, WebGL ni nuevas dependencias.
- No cambiar tokens de color ni escala ~60% del campo.
- No tocar backend.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `research-network-atmosphere`: densidad micro-nodo (×3 conteo, ÷3 tamaño, ×3 edges concurrentes, núcleo más denso).

## Impact

- **Frontend / UX:** solo `ResearchNetworkAtmosphere.tsx` (constantes de conteo/tamaño/edges y sesgo central).
- **Backend:** ninguno.
- **Research question:** ¿el campo se siente como polvo relacional denso sin convertirse en ruido o KPI chrome?
- **Cognitive Objects:** ninguno.
