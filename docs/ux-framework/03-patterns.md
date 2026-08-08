# NISSE Design Language

## 03 --- Patterns

Version: 1.0

------------------------------------------------------------------------

# Objetivo

Los patrones describen **cómo se combinan los componentes** para
resolver problemas de interacción.

Un componente es una pieza.

Un patrón es una estrategia.

NISSE privilegia patrones de exploración sobre patrones administrativos.

------------------------------------------------------------------------

# Principios

-   Mantener siempre el contexto.
-   Evitar romper el flujo mental.
-   La IA acompaña, no interrumpe.
-   El canvas es protagonista.
-   Los paneles complementan el canvas.

------------------------------------------------------------------------

# Patrón: Speculative Workspace

Es la unidad principal del sistema.

Estructura:

``` text
+------------------------------------------------------+
 Sidebar | Canvas Principal | Companion / Inspector
         |                  | Drawer lateral
+------------------------------------------------------+
```

Contiene:

-   Canvas
-   Paneles
-   Drawers
-   Objetos cognitivos
-   Bitácora
-   Agentes

------------------------------------------------------------------------

# Patrón: Exploración + IA

El usuario nunca abandona el contexto.

1.  Selecciona un objeto.
2.  Invoca al Companion.
3.  La IA genera resultados.
4.  Los resultados aparecen sobre el canvas.
5.  El usuario reorganiza y continúa.

Nunca abrir una página nueva.

------------------------------------------------------------------------

# Patrón: Progressive Disclosure

Mostrar únicamente la información necesaria.

Primer nivel: - resumen

Segundo nivel: - detalle

Tercer nivel: - evidencia

Nunca mostrar toda la información desde el inicio.

------------------------------------------------------------------------

# Patrón: Inspector Lateral

Toda edición ocurre en un Drawer derecho.

Ventajas:

-   conserva contexto
-   evita modales
-   permite comparar información

------------------------------------------------------------------------

# Patrón: Canvas Infinito

El canvas representa el pensamiento.

Debe soportar:

-   zoom
-   pan
-   selección múltiple
-   conexiones
-   agrupación

No imponer límites artificiales.

------------------------------------------------------------------------

# Patrón: Investigación

Flujo recomendado:

Pregunta

↓

Exploración

↓

Hipótesis

↓

Evidencia

↓

Escenarios

↓

Reflexión

↓

Bitácora

El usuario puede regresar a cualquier etapa.

------------------------------------------------------------------------

# Patrón: Conversación

La conversación produce artefactos.

Nunca termina únicamente en texto.

Cada respuesta relevante puede convertirse en:

-   escenario
-   hipótesis
-   nota
-   evidencia
-   relación

------------------------------------------------------------------------

# Patrón: Navegación

Sidebar:

-   Workspaces
-   Biblioteca
-   Agentes
-   Configuración

Top Bar:

-   búsqueda
-   acciones globales

Nunca duplicar navegación.

------------------------------------------------------------------------

# Patrón: Estados de IA

Generando:

mostrar progreso narrativo.

Analizando...

Relacionando...

Contrastando...

Construyendo escenarios...

Nunca usar loaders genéricos.

------------------------------------------------------------------------

# Patrón: Comparación

Permitir comparar dos o más objetos lado a lado.

Utilizar Split View.

Evitar abrir ventanas independientes.

------------------------------------------------------------------------

# Patrón: Línea de tiempo

La línea de tiempo representa evolución.

No únicamente fechas.

Puede mostrar:

-   decisiones
-   eventos
-   escenarios
-   señales

------------------------------------------------------------------------

# Patrón: Grafos

Usar grafos cuando existan relaciones.

No reemplazarlos por listas.

Las conexiones son tan importantes como los nodos.

------------------------------------------------------------------------

# Patrón: Bitácora

Toda investigación genera un registro.

Entradas:

-   observaciones
-   reflexiones
-   decisiones
-   evidencia

Debe sentirse como un diario científico.

------------------------------------------------------------------------

# Empty State

Cada estado vacío debe invitar a iniciar una exploración.

Nunca comunicar ausencia.

Ejemplo:

"Comienza formulando una pregunta."

------------------------------------------------------------------------

# Errores

Explicar:

-   qué ocurrió
-   impacto
-   cómo continuar

Nunca culpar al usuario.

------------------------------------------------------------------------

# Responsive

Desktop:

Canvas protagonista.

Tablet:

Canvas + Drawer.

Mobile:

Vista secuencial conservando contexto.

------------------------------------------------------------------------

# Reglas para Cursor

Al crear una pantalla:

-   parte siempre desde un Workspace.
-   utiliza canvas si existen relaciones.
-   usa drawers para edición.
-   conserva el contexto visible.
-   convierte resultados de IA en objetos manipulables.
-   evita páginas independientes.
-   evita asistentes paso a paso innecesarios.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   reemplazar canvas por formularios
-   esconder relaciones
-   abrir múltiples modales
-   crear dashboards tradicionales
-   usar tablas como vista principal
-   romper el flujo de investigación

------------------------------------------------------------------------

# Checklist

¿El patrón mantiene el contexto?

¿Facilita la exploración?

¿La IA colabora?

¿Existe continuidad visual?

¿El usuario siente que investiga y no administra?

Si alguna respuesta es negativa, revisar el patrón.
