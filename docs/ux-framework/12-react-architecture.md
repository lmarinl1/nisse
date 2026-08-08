# NISSE Design Language

## 12 --- React Architecture

Version: 1.0

------------------------------------------------------------------------

# Objetivo

Este documento define cómo implementar NISSE en React manteniendo
consistencia entre diseño, experiencia y código.

La arquitectura debe reflejar el modelo mental del producto: Workspaces,
Objetos Cognitivos y Exploración.

------------------------------------------------------------------------

# Principios

-   Composición antes que herencia.
-   Feature-first antes que carpetas por tipo.
-   Componentes pequeños.
-   Estado local cuando sea posible.
-   Estado global únicamente para información compartida.

------------------------------------------------------------------------

# Stack recomendado

-   React
-   TypeScript
-   Vite
-   TailwindCSS
-   React Router
-   TanStack Query
-   Zustand
-   Framer Motion
-   React Flow (grafos)
-   TipTap (editor)

------------------------------------------------------------------------

# Estructura

``` text
src/
├── app/
├── features/
│   ├── workspace/
│   ├── canvas/
│   ├── companion/
│   ├── scenarios/
│   ├── hypotheses/
│   ├── evidence/
│   └── timeline/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── tokens/
│   ├── utils/
│   └── icons/
├── layouts/
├── routes/
└── styles/
```

------------------------------------------------------------------------

# Componentes

Separar en:

## Primitives

Button

Input

Badge

Icon

Typography

------------------------------------------------------------------------

## Composites

ResearchPanel

Timeline

Drawer

Inspector

CanvasToolbar

------------------------------------------------------------------------

## Domain Components

ScenarioPanel

HypothesisCard

EvidenceViewer

FutureCone

GraphCanvas

CompanionDrawer

------------------------------------------------------------------------

# Organización

Cada feature contiene:

``` text
feature/
├── components/
├── hooks/
├── services/
├── store/
├── types/
├── utils/
└── index.ts
```

------------------------------------------------------------------------

# Estado

## Zustand

Workspace activo

Preferencias

Selección

UI

------------------------------------------------------------------------

## React Query

Documentos

APIs

MCPs

Fuentes

IA

Nunca guardar respuestas remotas manualmente.

------------------------------------------------------------------------

# Hooks

Ejemplos

useWorkspace()

useCanvas()

useCompanion()

useScenario()

useTimeline()

useSelection()

------------------------------------------------------------------------

# Layout

El Workspace es un Layout.

No una página.

``` tsx
<WorkspaceLayout>
  <Sidebar />
  <Canvas />
  <Inspector />
  <Companion />
</WorkspaceLayout>
```

------------------------------------------------------------------------

# Canvas

Debe ser desacoplado.

No conoce la IA.

No conoce el dominio.

Solo renderiza Objetos Cognitivos.

------------------------------------------------------------------------

# Companion

Toda interacción IA pasa por un único servicio.

Nunca llamar LLMs directamente desde componentes.

------------------------------------------------------------------------

# Servicios

``` text
services/

llm.service.ts

mcp.service.ts

search.service.ts

workspace.service.ts
```

------------------------------------------------------------------------

# Design Tokens

Consumir únicamente variables del sistema.

Nunca colores inline.

Nunca medidas fijas.

------------------------------------------------------------------------

# Motion

Centralizar transiciones.

No repetir animaciones.

------------------------------------------------------------------------

# Rutas

Las rutas representan Workspaces.

No representan CRUD.

Ejemplo:

/workspace/:id

/scenario/:id

/library

/settings

------------------------------------------------------------------------

# Testing

Preferir:

React Testing Library

Vitest

Playwright

------------------------------------------------------------------------

# Accesibilidad

Todo componente nuevo debe incluir:

-   teclado
-   foco
-   labels
-   roles

------------------------------------------------------------------------

# Performance

Lazy Loading

Memoización

Virtualización para listas grandes

Canvas incremental

------------------------------------------------------------------------

# Reglas para Cursor

Antes de crear un componente:

1.  Buscar si ya existe.
2.  Extender antes que duplicar.
3.  Mantener separación entre UI y dominio.
4.  Mantener el Workspace como unidad principal.
5.  Nunca mezclar lógica de IA con presentación.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   componentes de más de 300 líneas
-   lógica de negocio en JSX
-   llamadas fetch dentro del render
-   estilos inline
-   estados duplicados

------------------------------------------------------------------------

# Checklist

¿El componente es reutilizable?

¿Respeta el Design Language?

¿Consume Design Tokens?

¿Está desacoplado?

¿Pertenece a una Feature?

Si alguna respuesta es negativa, revisar la implementación.
