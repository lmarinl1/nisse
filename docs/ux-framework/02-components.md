# NISSE Design Language

## 02 --- Components

Version: 1.0

------------------------------------------------------------------------

# Propósito

Los componentes de NISSE no son widgets de interfaz.

Son **instrumentos de investigación**.

Cada componente debe ayudar al usuario a observar, conectar, analizar o
construir conocimiento.

Nunca deben existir componentes puramente decorativos.

------------------------------------------------------------------------

# Filosofía

Un componente debe responder una única intención.

Debe ser:

-   Componible
-   Reutilizable
-   Accesible
-   Declarativo
-   Agnóstico del caso de uso

------------------------------------------------------------------------

# Anatomía

Cada componente documentará:

-   Propósito
-   Cuándo usarlo
-   Cuándo NO usarlo
-   Anatomía
-   Estados
-   Variantes
-   Tokens utilizados
-   Accesibilidad
-   API React
-   Ejemplo JSX

------------------------------------------------------------------------

# Clasificación

## Foundation

-   Typography
-   Icon (`shared/icons` — ver `10-iconography.md`)
-   Divider
-   Badge
-   Tooltip

## Inputs

-   Button
-   Icon Button
-   Toggle
-   Checkbox
-   Radio
-   Switch
-   Select
-   Text Input
-   Text Area
-   Search Box

## Navigation

-   Sidebar
-   Top Bar
-   Breadcrumb
-   Tabs
-   Drawer
-   Command Palette

## Containers

-   Panel
-   Section
-   Stack
-   Split View
-   Workspace
-   Canvas

## AI

-   Companion Panel
-   Prompt Composer
-   Generation Progress
-   Agent Status
-   Thinking Timeline

## Knowledge

-   Evidence Card
-   Hypothesis Card
-   Scenario Card
-   Relation Chip
-   Citation Block

## Visualization

-   Graph Canvas
-   Future Cone
-   Timeline
-   Tree View
-   Network View

------------------------------------------------------------------------

# Naming

Nunca utilizar nombres genéricos.

Incorrecto:

Card

Correcto:

ResearchPanel

ScenarioPanel

EvidencePanel

HypothesisPanel

------------------------------------------------------------------------

# Button

## Filosofía

Representa intención.

Debe existir un solo botón primario por contexto.

Estados:

-   Default
-   Hover
-   Active
-   Focus
-   Disabled
-   Loading

Variantes:

-   Primary
-   Secondary
-   Ghost
-   Danger
-   Link

------------------------------------------------------------------------

# Panel

El panel reemplaza la card tradicional.

Cada panel responde una única pregunta.

Debe contener:

-   encabezado
-   contexto
-   contenido
-   acciones

Nunca mezclar múltiples objetivos.

------------------------------------------------------------------------

# Workspace

El componente más importante.

Representa un laboratorio completo.

Puede contener:

-   Canvas
-   Paneles
-   Drawers
-   IA
-   Visualizaciones

Nunca debe comportarse como una página estática.

------------------------------------------------------------------------

# Canvas

Es el corazón del sistema.

Permite:

-   mover
-   conectar
-   explorar
-   reorganizar
-   descubrir

Debe soportar zoom y desplazamiento.

------------------------------------------------------------------------

# Companion Panel

No es un chat.

Es un compañero de investigación.

Puede:

-   generar objetos
-   sugerir relaciones
-   resumir
-   crear escenarios

Debe convivir con el canvas.

------------------------------------------------------------------------

# Drawer

Preferir Drawers sobre modales.

Los Drawers mantienen el contexto.

Ubicaciones:

-   Left
-   Right
-   Bottom

## Contrato oficial (implementación)

En producto, el instrumento compartido es `ResearchDrawer`
(`frontend/src/shared/ui/`):

-   ancla derecha ≈ **⅓ del viewport** en desktop (`--drawer-width`, tipicamente
    `clamp(20rem, 33.333vw, 36rem)`)
-   en viewports estrechos puede acercarse al ancho completo como slide-over derecho
-   formularios en **una columna**, ritmo vertical limpio; acciones primarias en el footer
-   título en Discovery Yellow
-   brand mark con estrellas en el header
-   CTA Guardar/Crear/Actualizar con `btn-discovery`
-   Select accesible: `ResearchSelect` (Radix + tokens NISSE)

El Canvas debe permanecer parcialmente visible; preferir Drawer antes que Modal.

El header homologado de Canvas de subitem/sesión es `SessionCanvasHeader`
(mark + eyebrow + título + propósito + aside opcional).

------------------------------------------------------------------------

# Tabs

Las Tabs representan perspectivas.

No categorías.

Cambiar de Tab nunca debe romper el contexto de investigación.

------------------------------------------------------------------------

# Search

La búsqueda es exploratoria.

Debe permitir:

-   lenguaje natural
-   filtros
-   operadores
-   sugerencias

------------------------------------------------------------------------

# Estados comunes

Todos los componentes deben soportar:

-   Empty
-   Loading
-   Error
-   Success
-   Disabled

------------------------------------------------------------------------

# Accesibilidad

Todos los componentes:

-   navegación por teclado
-   foco visible
-   contraste AA
-   labels accesibles

------------------------------------------------------------------------

# React

Cada componente debe cumplir:

-   composición antes que herencia
-   props pequeñas
-   variantes mediante props
-   estilos desacoplados
-   tokens compartidos

Ejemplo:

``` tsx
<ResearchPanel
 title="Escenarios"
 variant="default"
>
 ...
</ResearchPanel>
```

------------------------------------------------------------------------

# Reglas para Cursor

Cuando necesites crear una nueva interfaz:

-   reutiliza componentes existentes
-   nunca inventes componentes equivalentes
-   usa Panel antes que Card
-   usa Workspace antes que Page
-   usa Canvas cuando existan relaciones
-   usa Drawer antes que Modal
-   mantén bajo el número de acciones primarias

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   crear cards para todo
-   abrir modales innecesarios
-   duplicar componentes
-   crear botones con estilos únicos
-   mezclar múltiples jerarquías visuales
-   romper el sistema de espaciado

------------------------------------------------------------------------

# Checklist

Antes de aprobar un componente:

-   ¿Tiene una única intención?
-   ¿Es reutilizable?
-   ¿Respeta la filosofía?
-   ¿Puede documentarse fácilmente?
-   ¿Es accesible?
-   ¿Puede evolucionar sin romper otros componentes?

Si alguna respuesta es no, el componente debe rediseñarse.
