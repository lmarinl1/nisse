# NISSE Design Language

## 09 --- Motion Language

Version: 1.0

------------------------------------------------------------------------

# Introducción

En NISSE el movimiento no es decoración.

El movimiento representa pensamiento.

Cada transición comunica que el conocimiento está evolucionando.

------------------------------------------------------------------------

# Filosofía

Nunca animar por estética.

Siempre animar para explicar.

El usuario debe comprender:

-   qué cambió
-   por qué cambió
-   hacia dónde evolucionó

------------------------------------------------------------------------

# Principios

1.  El conocimiento emerge.
2.  Las relaciones se descubren.
3.  Las hipótesis evolucionan.
4.  Los escenarios florecen.
5.  La IA piensa antes de responder.

------------------------------------------------------------------------

# Duraciones

  Acción   Duración
  -------- ----------
  Hover    120ms
  Focus    150ms
  Drawer   220ms
  Panel    250ms
  IA       350ms
  Canvas   400ms

------------------------------------------------------------------------

# Entradas

Nunca aparecer instantáneamente.

Usar:

-   fade
-   slight scale
-   translate

------------------------------------------------------------------------

# Salidas

Desvanecimiento.

Nunca desaparecer abruptamente.

------------------------------------------------------------------------

# Canvas

El Canvas nunca debe "recargarse".

Debe transformarse.

Agregar nodos sin perder contexto.

------------------------------------------------------------------------

# Grafos

Las conexiones deben dibujarse progresivamente.

Los nodos pueden crecer suavemente.

Nunca hacer aparecer toda la red al mismo tiempo.

------------------------------------------------------------------------

# Objetos Cognitivos

Cuando se crea un objeto:

1.  aparece
2.  toma foco
3.  muestra contexto
4.  se integra al grafo

------------------------------------------------------------------------

# IA

Mientras la IA trabaja:

No bloquear.

Mostrar actividad mediante:

-   pulsos
-   ondas
-   partículas sutiles
-   texto narrativo

Ejemplos:

"Contrastando evidencia..."

"Explorando escenarios..."

"Narrando posibilidades..."

------------------------------------------------------------------------

# Companion

Las respuestas largas aparecen por bloques.

No renderizar todo de una vez.

------------------------------------------------------------------------

# Drawers

Siempre deslizar.

Nunca hacer pop.

------------------------------------------------------------------------

# Inspector

Actualizar contenido mediante crossfade.

------------------------------------------------------------------------

# Hover

Debe sugerir interactividad.

Nunca exagerar.

------------------------------------------------------------------------

# Selección

Los objetos seleccionados:

-   elevan
-   resaltan borde
-   aumentan contraste

------------------------------------------------------------------------

# Timeline

Los eventos aparecen en secuencia.

No simultáneamente.

------------------------------------------------------------------------

# Cono de Futuros

Los horizontes se expanden.

Los escenarios crecen desde el presente.

------------------------------------------------------------------------

# Scroll

Suave.

Nunca brusco.

------------------------------------------------------------------------

# Loading

El Loading representa investigación.

Nunca spinner únicamente.

Combinar:

-   progreso
-   narrativa
-   actividad

------------------------------------------------------------------------

# Microinteracciones

Cada acción importante confirma visualmente:

-   guardar
-   conectar
-   mover
-   agrupar
-   generar

------------------------------------------------------------------------

# Motion Tokens

``` yaml
motion.instant
motion.fast
motion.normal
motion.slow
motion.reflective

motion.ease.enter
motion.ease.exit
motion.ease.standard
```

------------------------------------------------------------------------

# Accesibilidad

Respetar prefers-reduced-motion.

Toda animación debe poder reducirse.

------------------------------------------------------------------------

# Reglas para Cursor

Animar únicamente cuando:

-   cambia el conocimiento
-   aparece contexto
-   evoluciona una investigación

Nunca animar elementos decorativos.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   animaciones infinitas
-   rebotes
-   zoom exagerado
-   transiciones largas
-   loaders genéricos

------------------------------------------------------------------------

# Checklist

¿La animación explica?

¿Reduce incertidumbre?

¿Mantiene contexto?

¿Respeta la calma?

Si no, eliminarla.
