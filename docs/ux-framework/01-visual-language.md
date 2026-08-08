# NISSE Design Language

## 01 --- Visual Language

Version: 1.0

------------------------------------------------------------------------

# Propósito

El lenguaje visual de NISSE debe transmitir que el usuario se encuentra
dentro de un **Speculative Research Workspace**: un laboratorio para
explorar futuros, no un dashboard administrativo.

Cada decisión visual debe reforzar cuatro ideas:

-   Exploración
-   Rigor metodológico
-   Creatividad
-   Colaboración entre humanos e IA

------------------------------------------------------------------------

# Atmósfera

La interfaz debe sentirse como:

-   Un observatorio científico.
-   Un laboratorio creativo.
-   Un atlas de conocimiento.
-   Un espacio contemplativo.

Nunca debe sentirse como:

-   Un ERP.
-   Un CRM.
-   Un panel financiero.
-   Una hoja de cálculo.

------------------------------------------------------------------------

# Personalidad visual

  Atributo                  Nivel
  ------------------------- -------
  Elegancia                 Alta
  Minimalismo               Medio
  Densidad de información   Media
  Futurismo                 Alto
  Calidez                   Media
  Experimental              Alto
  Corporativo               Bajo

------------------------------------------------------------------------

# Filosofía espacial

El espacio vacío es una herramienta.

No llenar la pantalla únicamente porque existe espacio disponible.

Cada panel debe respirar.

La interfaz debe permitir que el usuario permanezca largos periodos
investigando sin fatiga.

------------------------------------------------------------------------

# Color System

## Filosofía

El color comunica intención.

Nunca decoración.

La mayor parte de la interfaz debe apoyarse en neutros.

Los colores de acento representan energía intelectual.

------------------------------------------------------------------------

## Paleta Base

### Background

-   Space Black
-   Carbon
-   Graphite
-   Deep Slate

### Surface

-   Surface 1
-   Surface 2
-   Surface 3
-   Elevated Surface

### Accent

-   Discovery Yellow
-   Horizon Gold

### Support

-   Success Green
-   Insight Blue
-   Warning Amber
-   Critical Red

------------------------------------------------------------------------

# Modo Light

El modo claro no es blanco absoluto.

Debe parecer papel técnico.

Fondos ligeramente cálidos.

Mucho contraste tipográfico.

------------------------------------------------------------------------

# Modo Dark

El modo oscuro representa profundidad.

Nunca utilizar negro puro.

Usar capas.

Las superficies deben diferenciarse mediante elevación y brillo.

------------------------------------------------------------------------

# Tokens (conceptuales)

``` yaml
color.background.primary
color.background.secondary
color.surface.default
color.surface.elevated
color.text.primary
color.text.secondary
color.accent.discovery
color.border.default
color.state.success
color.state.warning
color.state.error
```

------------------------------------------------------------------------

# Tipografía

## Filosofía

La lectura es una actividad principal.

La tipografía debe favorecer sesiones largas.

Priorizar fuentes como:

-   Inter
-   Geist
-   IBM Plex Sans
-   Manrope

Jerarquía:

-   Display
-   H1
-   H2
-   H3
-   Body Large
-   Body
-   Caption
-   Label

Evitar exceso de pesos.

------------------------------------------------------------------------

# Espaciado

Escala base de 8 px.

Valores permitidos:

-   4
-   8
-   12
-   16
-   24
-   32
-   40
-   48
-   64
-   80
-   96

No utilizar valores arbitrarios.

------------------------------------------------------------------------

# Border Radius

Todo debe sentirse contemporáneo.

Escala:

-   4
-   8
-   12
-   16
-   24

No utilizar esquinas completamente redondas excepto avatares.

------------------------------------------------------------------------

# Sombras

Las sombras comunican elevación.

Nunca dramatismo.

Preferir sombras suaves y difusas.

------------------------------------------------------------------------

# Grid

Desktop:

-   12 columnas

Tablet:

-   8 columnas

Mobile:

-   4 columnas

El canvas puede romper el grid cuando represente conocimiento.

------------------------------------------------------------------------

# Motion Language

Nada aparece.

Todo emerge.

Nada desaparece.

Todo se desvanece.

Principios:

-   Movimiento con propósito.
-   Duraciones entre 150--350 ms.
-   Ease-out para entradas.
-   Ease-in para salidas.

Las conexiones pueden dibujarse progresivamente.

------------------------------------------------------------------------

# Iconografía

Las acciones deben ser reconocibles inmediatamente.

Estilo:

-   Outline predominante.
-   Geometría simple.
-   Peso consistente.

Los íconos deben representar conceptos de investigación:

-   explorar
-   conectar
-   observar
-   documentar
-   simular
-   descubrir

------------------------------------------------------------------------

# Ilustraciones

Utilizar ilustraciones únicamente cuando aporten narrativa.

Inspiración:

-   mapas estelares
-   telescopios
-   grafos
-   diagramas científicos
-   cartografía

Evitar personajes caricaturescos.

------------------------------------------------------------------------

# Visualizaciones

Las visualizaciones son parte del lenguaje.

Componentes prioritarios:

-   Grafos
-   Árboles
-   Conos de escenarios
-   Timelines
-   Redes
-   Mapas conceptuales

Las tablas son el último recurso.

------------------------------------------------------------------------

# Estados

## Loading

Transmitir progreso intelectual.

Mensajes tipo:

> Construyendo relaciones...

> Contrastando evidencia...

> Explorando escenarios...

Nunca usar simplemente "Loading..."

------------------------------------------------------------------------

## Empty States

Deben invitar a comenzar una investigación.

Nunca comunicar ausencia.

------------------------------------------------------------------------

## Error

Los errores deben ser tranquilos.

Nunca alarmistas.

------------------------------------------------------------------------

# Densidad

Evitar interfaces saturadas.

Priorizar paneles, canvas y navegación lateral.

------------------------------------------------------------------------

# Responsive

Desktop es la experiencia principal.

En móviles:

-   simplificar paneles
-   conservar el canvas cuando sea posible
-   usar drawers para herramientas secundarias

------------------------------------------------------------------------

# Reglas para Cursor

Cuando diseñes una pantalla:

-   Prioriza canvas sobre dashboards.
-   Usa paneles en lugar de tarjetas repetitivas.
-   Mantén un punto focal claro.
-   Utiliza el amarillo únicamente como acento.
-   Favorece relaciones visuales entre elementos.
-   Evita tablas extensas.
-   Diseña pensando en exploración, no administración.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

-   parecer Excel
-   parecer un CRM
-   llenar la pantalla de KPIs
-   usar gradientes llamativos
-   usar sombras fuertes
-   crear interfaces completamente planas
-   saturar de botones primarios

------------------------------------------------------------------------

# Criterio final

Toda nueva interfaz debe responder:

-   ¿Se siente como un laboratorio?
-   ¿Invita a explorar?
-   ¿Respira visualmente?
-   ¿Hace visible el conocimiento?
-   ¿Podría confundirse con un dashboard tradicional?

Si la última respuesta es sí, debe rediseñarse.
