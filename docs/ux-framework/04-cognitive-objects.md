# NISSE Design Language

## 04 --- Cognitive Objects

Version: 1.0

------------------------------------------------------------------------

# Introducción

Los Objetos Cognitivos son el núcleo conceptual de NISSE.

Mientras un Design System tradicional documenta botones, tablas o
formularios, NISSE documenta los elementos con los que una persona
piensa durante un proceso de investigación prospectiva.

Estos objetos representan conocimiento vivo.

No son simples modelos de datos.

------------------------------------------------------------------------

# Principios

Un Objeto Cognitivo debe:

-   representar una idea
-   evolucionar con el tiempo
-   relacionarse con otros objetos
-   mantener trazabilidad
-   poder visualizarse de múltiples formas
-   ser reutilizable

------------------------------------------------------------------------

# Anatomía

Todo Objeto Cognitivo debe incluir:

-   Identificador
-   Nombre
-   Descripción
-   Contexto
-   Autor
-   Fecha
-   Estado
-   Nivel de confianza
-   Relaciones
-   Historial
-   Etiquetas
-   Evidencia asociada

------------------------------------------------------------------------

# Hipótesis

## Propósito

Representa una posibilidad que aún no ha sido validada.

## Estados

-   Nueva
-   En análisis
-   Contrastada
-   Validada
-   Rechazada

## Relaciones

Puede conectarse con:

-   Evidencias
-   Escenarios
-   Señales
-   Actores

Visualmente debe sentirse ligera y abierta.

------------------------------------------------------------------------

# Escenario

Representa una construcción narrativa de un posible futuro.

## Atributos

-   Horizonte temporal
-   Narrativa
-   Drivers
-   Incertidumbres
-   Riesgos
-   Oportunidades
-   Nivel de plausibilidad

Puede contener múltiples hipótesis.

------------------------------------------------------------------------

# Evidencia

Representa información verificable.

Puede provenir de:

-   documentos
-   APIs
-   MCPs
-   entrevistas
-   artículos
-   observaciones

Nunca debe modificarse manualmente.

------------------------------------------------------------------------

# Señal Débil

Indicio temprano de un cambio.

Debe registrar:

-   fuente
-   fecha
-   intensidad
-   categoría
-   interpretación

Puede fortalecer una hipótesis.

------------------------------------------------------------------------

# Driver

Elemento que impulsa cambios sistémicos.

Ejemplos:

-   tecnología
-   política
-   cultura
-   economía
-   medio ambiente

Los Drivers suelen agrupar múltiples señales.

------------------------------------------------------------------------

# Incertidumbre

Representa aquello que aún no puede conocerse.

No es un error.

Debe visualizarse explícitamente.

Puede afectar múltiples escenarios.

------------------------------------------------------------------------

# Actor

Persona, organización o agente involucrado.

Puede representar:

-   humano
-   IA
-   institución
-   comunidad
-   empresa

------------------------------------------------------------------------

# Bitácora

Registro cronológico del proceso de investigación.

Cada entrada contiene:

-   fecha
-   reflexión
-   contexto
-   referencias
-   objetos relacionados

Debe sentirse como un diario científico.

------------------------------------------------------------------------

# Narrativa

Construye una historia coherente a partir de varios objetos.

No reemplaza la evidencia.

La organiza.

------------------------------------------------------------------------

# Grafo

Visualización principal de relaciones.

Los nodos representan Objetos Cognitivos.

Las aristas representan relaciones.

Debe permitir:

-   explorar
-   filtrar
-   agrupar
-   descubrir comunidades

------------------------------------------------------------------------

# Cono de Futuros

Visualización icónica de NISSE.

Representa:

-   presente
-   futuros posibles
-   futuros plausibles
-   futuros preferibles

Debe admitir escenarios superpuestos.

------------------------------------------------------------------------

# Relaciones

Todo Objeto Cognitivo puede establecer relaciones tipadas.

Ejemplos:

-   soporta
-   contradice
-   depende de
-   amplía
-   deriva en
-   afecta

Las relaciones son objetos de primera clase.

------------------------------------------------------------------------

# Ciclo de Vida

Crear

↓

Relacionar

↓

Analizar

↓

Contrastar

↓

Documentar

↓

Evolucionar

Nunca eliminar conocimiento.

Preferir archivar.

------------------------------------------------------------------------

# Representación visual

Cada objeto debe poseer:

-   iconografía propia
-   color contextual
-   nivel de énfasis
-   estados
-   acciones rápidas

Nunca depender únicamente del texto.

------------------------------------------------------------------------

# Interacciones

Los objetos deben permitir:

-   arrastrar
-   conectar
-   agrupar
-   comentar
-   versionar
-   citar

------------------------------------------------------------------------

# Reglas para IA

Cuando un agente genere información relevante:

No devolver únicamente texto.

Crear Objetos Cognitivos.

Relacionarlos automáticamente.

Sugerir nuevas conexiones.

Indicar nivel de confianza.

------------------------------------------------------------------------

# API React sugerida

``` tsx
<CognitiveObject
 type="scenario"
 title="Escenario Optimista"
 confidence={0.82}
 relations={relations}
/>
```

------------------------------------------------------------------------

# Reglas para Cursor

Siempre preguntar:

¿Qué Objeto Cognitivo representa esta información?

Antes de crear una nueva entidad, verificar si puede reutilizar una
existente.

Priorizar relaciones sobre listas.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   convertir un objeto en texto plano
-   ocultar relaciones
-   perder historial
-   eliminar evidencia
-   duplicar escenarios
-   representar incertidumbre como error

------------------------------------------------------------------------

# Checklist

¿El objeto representa conocimiento?

¿Tiene relaciones?

¿Puede evolucionar?

¿Tiene contexto?

¿Puede visualizarse en un canvas?

Si alguna respuesta es negativa, revisar el diseño.
