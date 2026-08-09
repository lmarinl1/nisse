## Why

La atmósfera orbital de red ya comunica laboratorio relacional, pero el campo se siente escaso: pocas órbitas, conexiones largas y poca densidad cerca del núcleo. Login y registro aún no comparten ese motivo, así que la entrada al laboratorio rompe continuidad visual con Study Home.

## What Changes

- Densificar `ResearchNetworkAtmosphere`: más órbitas (más delgadas), más conexiones cortas entre nodos, nodos/conexiones también fuera del anillo exterior, y partículas que emergen/desvanecen con mayor densidad hacia el centro.
- Conservar lo que ya funciona: órbita bidireccional (sentidos opuestos) y el desvanecido radial desde el núcleo.
- Montar la misma atmósfera como fondo no interactivo en login y sign up, con legibilidad del formulario y del brand lockup.
- Ajustar shell/CSS de auth solo lo necesario para full-bleed + capa de contenido encima (sin rediseñar el flujo de identidad).

## Non-goals

- No añadir labels institucionales, leyendas ni nodos interactivos.
- No cambiar tokens globales de discovery ni recolorar a brand neon.
- No tocar backend, API de auth, ni lógica de sesión.
- No montar la atmósfera en Workspace Canvas ni en diagnostics en este change.
- No convertir auth en landing marketing con hero overlays o cards decorativas.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `research-network-atmosphere`: densificación orbital, conexiones más cortas y abundantes (incl. nodos fuera de órbitas), emergencia/fade denso desde el centro; reutilización en superficies de autenticación.
- `frontend-app`: login y registro muestran la atmósfera compartida como fondo detrás del contenido de identidad.

## Impact

- **Frontend / UX:** `ResearchNetworkAtmosphere.tsx` (+ CSS), `AuthScreen` / `auth.css`, posible prop de intensidad o layout para Study vs auth.
- **Backend:** ninguno.
- **Research question:** ¿cómo se siente entrar al laboratorio como continuidad del campo relacional, no como pantalla administrativa?
- **Cognitive Objects:** ninguno nuevo; el motivo visual sigue siendo atmósfera, no objeto editable.
