# NISSE Design Language

## 05 --- Workspace Grammar

Version: 1.0

------------------------------------------------------------------------

# Introducción

La Gramática del Workspace define cómo se organizan los espacios de
investigación.

Así como un idioma tiene reglas para construir frases, NISSE tiene
reglas para construir Workspaces.

No se diseñan pantallas.

Se diseñan espacios de pensamiento.

------------------------------------------------------------------------

# Principio Fundamental

Toda interfaz debe responder una única pregunta de investigación.

Un Workspace nunca representa una funcionalidad.

Representa una investigación.

------------------------------------------------------------------------

# Jerarquía Espacial

``` text
Application
└── Workspace
    ├── Canvas
    ├── Tool Panels
    ├── Companion
    ├── Inspector
    ├── Timeline
    └── Cognitive Objects
```

------------------------------------------------------------------------

# Workspace

Es la unidad principal.

Contiene:

-   una investigación
-   un contexto
-   uno o varios canvas
-   paneles auxiliares
-   una bitácora
-   agentes

Nunca mezclar investigaciones independientes.

------------------------------------------------------------------------

# Canvas

El Canvas ocupa la mayor parte del espacio.

Es el lugar donde vive el conocimiento.

Debe soportar:

-   pan
-   zoom
-   selección
-   agrupación
-   conexiones
-   anotaciones

Nunca esconder el canvas detrás de formularios.

------------------------------------------------------------------------

# Tool Panels

Los Tool Panels contienen instrumentos.

Ejemplos:

-   filtros
-   fuentes
-   propiedades
-   plantillas
-   IA

Siempre son secundarios respecto al Canvas.

------------------------------------------------------------------------

# Inspector

El Inspector aparece cuando existe un objeto seleccionado.

Nunca mostrar un inspector vacío.

Debe ser contextual.

------------------------------------------------------------------------

# Companion

El Companion siempre permanece accesible.

No reemplaza el Workspace.

Lo complementa.

Las respuestas relevantes deben transformarse en Objetos Cognitivos.

------------------------------------------------------------------------

# Timeline

Toda investigación posee una dimensión temporal.

La Timeline puede mostrar:

-   eventos
-   cambios
-   decisiones
-   versiones
-   bitácoras

------------------------------------------------------------------------

# Zonas del Workspace

## Navegación

Persistente.

## Exploración

Canvas principal.

## Contexto

Inspector.

## Colaboración

Companion.

## Evidencia

Paneles laterales.

------------------------------------------------------------------------

# Composición

Orden recomendado:

1.  Contexto
2.  Exploración
3.  Relaciones
4.  Evidencia
5.  Reflexión
6.  Acción

------------------------------------------------------------------------

# Layouts Permitidos

## Canvas + Inspector

Ideal para explorar.

------------------------------------------------------------------------

## Canvas + Companion

Ideal para cocrear con IA.

------------------------------------------------------------------------

## Split Canvas

Comparar escenarios.

------------------------------------------------------------------------

## Canvas + Timeline

Analizar evolución.

------------------------------------------------------------------------

# Layouts Prohibidos

-   Dashboard con múltiples KPIs como vista principal.
-   Formularios a pantalla completa.
-   Múltiples modales encadenados.
-   Navegación fragmentada.

------------------------------------------------------------------------

# Navegación

Preferir:

-   Drawers
-   Side Panels
-   Tabs persistentes

Evitar:

-   Wizards largos
-   Popups
-   Navegación que rompa el contexto

------------------------------------------------------------------------

# Flujo Ideal

Pregunta

↓

Exploración

↓

Generación IA

↓

Objetos Cognitivos

↓

Relaciones

↓

Reflexión

↓

Bitácora

↓

Escenarios

------------------------------------------------------------------------

# Reglas de Visibilidad

Mostrar primero:

-   contexto
-   relaciones
-   acciones

Ocultar detalles avanzados hasta que sean necesarios.

------------------------------------------------------------------------

# Estados del Workspace

## Vacío

Invita a comenzar.

## Activo

Muestra relaciones vivas.

## Generando

La IA trabaja sin bloquear al usuario.

## Colaborativo

Permite múltiples agentes.

------------------------------------------------------------------------

# Motion

Los paneles se deslizan.

Los objetos emergen.

Las conexiones se dibujan.

Nunca utilizar animaciones sin significado.

------------------------------------------------------------------------

# Responsive

Desktop:

Workspace completo.

Tablet:

Canvas + panel intercambiable.

Mobile:

Canvas simplificado y drawers.

------------------------------------------------------------------------

# Reglas para Cursor

Siempre construir desde el Workspace.

Pensar primero en el Canvas.

Agregar paneles únicamente cuando aporten contexto.

La IA nunca reemplaza el espacio principal.

Los resultados importantes se materializan como Objetos Cognitivos.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   empezar una pantalla con tarjetas
-   ocultar el canvas
-   separar la IA en otra página
-   perder el contexto al editar
-   crear espacios sin una pregunta de investigación

------------------------------------------------------------------------

# Checklist

-   ¿Existe una pregunta central?
-   ¿El Canvas es protagonista?
-   ¿Los paneles son secundarios?
-   ¿La IA acompaña?
-   ¿Las relaciones son visibles?
-   ¿El Workspace invita a explorar?

Si alguna respuesta es negativa, el diseño debe replantearse.
