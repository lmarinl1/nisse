# NISSE Design Language

## 06 --- Design Tokens

Version: 1.0

------------------------------------------------------------------------

# Objetivo

Los Design Tokens son la fuente única de verdad del lenguaje visual de
NISSE.

Los componentes nunca deben utilizar valores "hardcodeados".

Todo debe derivarse de tokens semánticos.

------------------------------------------------------------------------

# Filosofía

Los tokens representan significado.

Nunca representan únicamente apariencia.

Incorrecto:

color-yellow-500

Correcto:

color.discovery.primary

------------------------------------------------------------------------

# Organización

``` text
tokens/
├── color
├── typography
├── spacing
├── radius
├── shadow
├── elevation
├── motion
├── opacity
├── border
├── grid
└── z-index
```

------------------------------------------------------------------------

# Color Tokens

## Workspace

``` yaml
color.workspace.background
color.workspace.surface
color.workspace.panel
color.workspace.canvas
```

## Investigación

``` yaml
color.discovery.primary
color.discovery.secondary
color.research.active
color.research.idle
```

## Brand mark (logo)

``` yaml
color.brand.neon          # #D7FF2F — neon del telescopio
color.brand.deep-space    # #05070A — fondo variantes dark
```

No confundir `color.brand.neon` con `color.discovery.primary` (acento de UI).
Ver `13-brand-mark.md`.

## IA

``` yaml
color.ai.thinking
color.ai.generating
color.ai.completed
color.ai.warning
```

## Objetos Cognitivos

``` yaml
color.scenario
color.hypothesis
color.evidence
color.signal
color.driver
color.uncertainty
color.timeline
```

## Estados

``` yaml
color.success
color.warning
color.error
color.info
```

------------------------------------------------------------------------

# Typography Tokens

``` yaml
font.family.primary
font.family.mono

font.size.display
font.size.h1
font.size.h2
font.size.h3
font.size.body
font.size.caption

font.weight.regular
font.weight.medium
font.weight.semibold
font.weight.bold

line-height.tight
line-height.normal
line-height.relaxed
```

------------------------------------------------------------------------

# Spacing

Escala oficial:

``` yaml
space.0 = 0
space.1 = 4
space.2 = 8
space.3 = 12
space.4 = 16
space.5 = 24
space.6 = 32
space.7 = 40
space.8 = 48
space.9 = 64
space.10 = 80
space.11 = 96
```

Nunca utilizar valores fuera de la escala.

------------------------------------------------------------------------

# Radius

``` yaml
radius.none
radius.sm
radius.md
radius.lg
radius.xl
radius.full
```

------------------------------------------------------------------------

# Shadow

``` yaml
shadow.xs
shadow.sm
shadow.md
shadow.lg
shadow.xl
```

Sombras suaves.

Nunca teatrales.

------------------------------------------------------------------------

# Elevation

``` yaml
elevation.base
elevation.panel
elevation.drawer
elevation.overlay
elevation.modal
```

------------------------------------------------------------------------

# Motion

Duraciones:

``` yaml
motion.instant = 80
motion.fast = 150
motion.normal = 250
motion.slow = 350
motion.reflective = 500
```

Curvas:

``` yaml
motion.ease.standard
motion.ease.enter
motion.ease.exit
motion.ease.emphasized
```

------------------------------------------------------------------------

# Opacity

``` yaml
opacity.disabled
opacity.subtle
opacity.overlay
opacity.hover
```

------------------------------------------------------------------------

# Border

``` yaml
border.width.sm
border.width.md
border.color.default
border.color.focus
border.color.selected
```

------------------------------------------------------------------------

# Grid

``` yaml
grid.desktop = 12
grid.tablet = 8
grid.mobile = 4
```

------------------------------------------------------------------------

# Breakpoints

``` yaml
xs
sm
md
lg
xl
2xl
```

------------------------------------------------------------------------

# Z-Index

``` yaml
z.base
z.panel
z.drawer
z.popover
z.tooltip
z.modal
z.toast
```

------------------------------------------------------------------------

# Semántica

Nunca utilizar tokens técnicos directamente en componentes.

Ejemplo:

``` tsx
<Button color="color.discovery.primary" />
```

No:

``` tsx
<Button color="#F5C518" />
```

------------------------------------------------------------------------

# Tokens React

Los componentes consumen únicamente tokens.

Nunca hexadecimales.

Nunca pixeles fijos.

------------------------------------------------------------------------

# Preparado para Tailwind

Los tokens deben poder exportarse hacia:

-   CSS Variables
-   Tailwind Theme
-   Style Dictionary
-   Figma Variables

------------------------------------------------------------------------

# Reglas para Cursor

Siempre utilizar tokens.

Nunca inventar nuevos sin justificar.

Reutilizar primero.

Extender después.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   usar colores inline
-   usar px arbitrarios
-   duplicar tokens
-   crear variantes locales
-   mezclar escalas

------------------------------------------------------------------------

# Checklist

¿El token es semántico?

¿Es reutilizable?

¿Representa intención?

¿Puede cambiar sin romper componentes?

Si alguna respuesta es no, rediseñar el token.
