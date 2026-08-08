# NISSE Design Language

## 08 --- Screen Recipes

Version: 1.0

------------------------------------------------------------------------

# Objetivo

Las recetas describen soluciones de UX reutilizables.

No son pantallas específicas.

Son composiciones que Cursor puede adaptar a cualquier dominio del
diseño de futuros.

------------------------------------------------------------------------

# Estructura de una receta

Cada receta define:

-   Objetivo
-   Pregunta de investigación
-   Layout
-   Componentes
-   Objetos Cognitivos
-   Flujo
-   Anti-patrones

------------------------------------------------------------------------

# Receta 01 --- Research Workspace

## Objetivo

Iniciar una investigación.

## Pregunta

¿Qué estamos intentando comprender?

## Layout

Sidebar \| Canvas \| Companion

## Componentes

-   Workspace
-   Canvas
-   Companion
-   Inspector
-   Timeline

## Flujo

Pregunta → Exploración → Hipótesis → Evidencia

------------------------------------------------------------------------

# Receta 02 --- Exploración de Grafos

Objetivo:

Comprender relaciones.

Layout:

Canvas a pantalla completa.

Panel derecho con propiedades.

Utilizar:

-   Graph Canvas
-   Relation Chips
-   Filters

Nunca usar listas como vista principal.

------------------------------------------------------------------------

# Receta 03 --- Constructor de Escenarios

Objetivo:

Comparar futuros posibles.

Componentes:

-   Scenario Panel
-   Timeline
-   Drivers
-   Uncertainty
-   Evidence

Usar Split View para comparar.

------------------------------------------------------------------------

# Receta 04 --- Cono de Futuros

Canvas central.

Inspector lateral.

Permitir:

-   agregar escenarios
-   mover horizontes
-   visualizar incertidumbre

------------------------------------------------------------------------

# Receta 05 --- Bitácora

Diseñada para reflexión.

Mostrar:

-   entradas cronológicas
-   objetos relacionados
-   referencias
-   decisiones

Debe sentirse como un cuaderno científico.

------------------------------------------------------------------------

# Receta 06 --- Conversación con IA

La conversación nunca es el destino.

Cada respuesta puede transformarse en:

-   hipótesis
-   escenario
-   nota
-   evidencia

Mostrar acciones rápidas para materializar el conocimiento.

------------------------------------------------------------------------

# Receta 07 --- Comparación

Dos Workspaces paralelos.

Canvas sincronizados.

Timeline compartida.

Ideal para escenarios alternativos.

------------------------------------------------------------------------

# Receta 08 --- Biblioteca

Vista tipo galería.

Paneles respirados.

Filtros persistentes.

Nunca tablas extensas.

------------------------------------------------------------------------

# Receta 09 --- Exploración Documental

Documento al centro.

Companion a la derecha.

Objetos detectados a la izquierda.

La IA propone relaciones.

------------------------------------------------------------------------

# Receta 10 --- Investigación Colaborativa

Múltiples agentes.

Actividad visible.

Comentarios contextuales.

Historial compartido.

------------------------------------------------------------------------

# Componentes frecuentes

Siempre priorizar:

-   Workspace
-   Canvas
-   Panel
-   Drawer
-   Companion
-   Timeline
-   Inspector

------------------------------------------------------------------------

# Wireframe Base

``` text
+-------------------------------------------------------------+
 Sidebar | Canvas Principal          | Companion / Inspector
         |                           |
         | Objetos Cognitivos        |
         | Relaciones                |
+-------------------------------------------------------------+
```

------------------------------------------------------------------------

# Reglas para Cursor

Cuando el usuario solicite una nueva pantalla:

1.  Elegir la receta más cercana.
2.  Adaptarla.
3.  Reutilizar componentes.
4.  Mantener el Workspace como unidad principal.
5.  Evitar comenzar desde cero.

------------------------------------------------------------------------

# Anti-patrones

Nunca crear:

-   formularios completos como pantalla
-   dashboards KPI
-   páginas vacías
-   asistentes lineales cuando el problema sea exploratorio

------------------------------------------------------------------------

# Checklist

-   ¿Existe una pregunta central?
-   ¿La receta favorece la exploración?
-   ¿La IA produce conocimiento?
-   ¿Los Objetos Cognitivos son visibles?
-   ¿El Canvas es protagonista?
