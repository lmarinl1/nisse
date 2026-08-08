# NISSE Design Language

## 13 --- Brand Mark (logo)

Version: 1.0

------------------------------------------------------------------------

# Objetivo

Definir el **mark oficial** de NISSE (telescopio) y cómo usarlo en producto,
documentación y assets.

El brand mark **no** es un icono de UI del set `shared/icons`.

- Iconos UI → conceptos / acciones (`10-iconography.md`)
- Brand mark → identidad de la aplicación (este documento)

------------------------------------------------------------------------

# Source of truth

Geometría trazada desde la imagen del proyecto:

`frontend/public/brand/reference-original.png`

No es un telescopio rediseñado ni una reinterpretación. Conserva proporciones,
ángulo, estrellas/puntos y tratamiento de línea neon-yellow del mark elegido.

------------------------------------------------------------------------

# Implementación

``` text
frontend/public/brand/          # assets estáticos (canonical)
frontend/src/shared/brand/      # NisseMark + README
```

Importar:

``` tsx
import { NisseMark } from "../../shared/brand";

<NisseMark variant="official" width={48} height={48} />
```

Favicon:

``` html
<link rel="icon" type="image/svg+xml" href="/brand/nisse-favicon.svg" />
```

------------------------------------------------------------------------

# Variantes

## Oficial — `nisse-icon-official.svg` (`variant="official"`)

Marca oficial: telescopio + estrellas + partículas + fill neon + glow sutil,
fondo transparente.

Usos: header de aplicación · splash · portada · login / entry · identidad de
producto · documentación · marketing.

## Favicon — `nisse-favicon.svg` (`variant="favicon"`)

Misma geometría del telescopio **sin** estrellas ni partículas (evitan ruido a
16–32 px).

Usos: favicon · PWA · navegación compacta · avatar pequeño · pestaña del
navegador.

Tamaños recomendados: 16 · 32 · 48.

## Dark — `*-dark.svg`

Incluyen fondo deep-space `#05070A`. Usar cuando el SVG deba ser un rectángulo
autocontenido. En UI web normal preferir transparentes.

## Clean — `*-clean.svg`

Misma geometría y color, sin glow. Usar en impresión, UI densa, tamaños muy
pequeños o sistemas que no manejan bien filtros SVG.

## currentColor — `*-currentColor.svg`

Permiten heredar color. Para fidelidad de identidad preferir color fijo.
Nota: vía `<img>` no hereda `color` CSS; requiere SVG inline o máscara.

------------------------------------------------------------------------

# Color de marca vs tokens de UI

| Rol | Hex | Token |
|---|---|---|
| Neon de marca (mark) | `#D7FF2F` | `--color-brand-neon` / `color.brand.neon` |
| Deep space (variantes dark) | `#05070A` | `--color-brand-deep-space` |
| Texto primario (kit) | `#F5F7FA` | alinear con `--color-text-primary` |
| Texto secundario (kit) | `#A4ADB8` | alinear con `--color-text-secondary` |
| Border (kit) | `#29303A` | no sustituye tokens de borde semánticos |

El acento de **descubrimiento en UI** (`--color-discovery-primary`) orienta
atención en la interfaz; **no** reemplaza el neon del mark oficial.

No sustituir el neon del telescopio por azul/púrpura “AI genérico”.

------------------------------------------------------------------------

# Significado

El telescopio expresa el comportamiento central de NISSE:

**mirar más allá de lo inmediatamente visible.**

Comunica: observación · exploración · perspectiva · curiosidad · distancia ·
posibilidad.

La ausencia de trípode es intencional: NISSE no es un observatorio fijo; es un
instrumento portable a distintos contextos y horizontes.

> NISSE no nos dice qué hay adelante.
> NISSE nos da un instrumento con el cual mirar.

------------------------------------------------------------------------

# Clear space

Reservar aire alrededor del mark ≈ **10% de su ancho**.

No colocar texto, bordes, controles UI, otros logos ni decoración dentro de
esa zona.

------------------------------------------------------------------------

# No modificar

Nunca:

- añadir un trípode
- añadir/quitar estrellas del icono oficial (el favicon es la única variante
  oficial sin estrellas)
- cambiar proporciones del telescopio
- rotarlo o estirarlo
- reemplazar el neon yellow por azul/púrpura genérico
- añadir gradientes al cuerpo del telescopio
- convertirlo en objeto 3D
- añadir motivos robot / AI
- redibujar el telescopio

------------------------------------------------------------------------

# Sensación visual

Debe sentirse: futurista · preciso · exploratorio · sereno · sofisticado.

No debe sentirse: cyberpunk · infantil · caricaturesco · militarista ·
asistente AI genérico.

------------------------------------------------------------------------

# Reglas para Cursor / desarrollo

1. Usar assets de `frontend/public/brand` y/o `NisseMark` desde `shared/brand`.
2. No mezclar el brand mark con el catálogo de `shared/icons`.
3. Preferir `official` en superficies de identidad; `favicon` en chrome
   compacto.
4. Preferir color fijo del mark sobre `currentColor` cuando importe la
   fidelidad de marca.
5. No redibujar ni “mejorar” la geometría; extender solo variantes documentadas.
6. El wordmark tipográfico “NISSE” puede acompañar al mark; el mark no sustituye
   el naming en código (`NisseMark`, no `Logo1`).

------------------------------------------------------------------------

# Checklist

¿Es brand mark o icono UI?

¿Variante correcta (official vs favicon vs clean/dark)?

¿Clear space ~10%?

¿Sin redibujo / rotación / stretch?

¿Neon de marca intacto en el SVG oficial?

Si no, corregir antes de merge.
