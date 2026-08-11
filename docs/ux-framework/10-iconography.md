# NISSE Design Language

## 10 --- Iconography & Visual Metaphors

Version: 1.2

------------------------------------------------------------------------

# Objetivo

La iconografía de NISSE representa conceptos de investigación.

Los iconos no decoran.

Explican.

Orientan.

Reducen carga cognitiva.

------------------------------------------------------------------------

# Fuente de verdad (implementación)

El set oficial vive en el frontend:

``` text
frontend/src/shared/icons/
├── svg/           # SVG editables (source)
├── Icon.tsx       # primitivo <Icon name="…" />
├── named.tsx      # exports tipados (HomeIcon, GraphIcon, …)
├── registry.tsx   # catálogo
├── icons.css      # tamaños del sistema
└── index.ts       # barrel de importación
```

Esto es **iconografía de interfaz** (Set I + Icon Set II). El logo / brand mark
(telescopio de identidad) es otra capa: `frontend/public/brand` + `shared/brand`
· `13-brand-mark.md`. El glifo UI `telescope` del catálogo **no** es el brand mark.

Importar siempre desde el barrel:

``` tsx
import { Icon, GraphIcon, DocumentIcon } from "../../shared/icons";

<GraphIcon />
<Icon name="document" size="nav" title="Evidencia" />
```

No usar alias inventados salvo que el proyecto configure paths; preferir rutas relativas al feature.

- No usar Lucide, Heroicons, Phosphor, Material Icons ni emojis en producto.
- No inventar SVG ad-hoc si el catálogo ya cubre el concepto.
- No importar SVGs sueltos fuera de `shared/icons` salvo extensión deliberada del set.

Detalle de uso en código: `frontend/src/shared/icons/README.md`.

------------------------------------------------------------------------

# Filosofía

Cada icono debe responder una pregunta.

¿Qué representa?

¿Qué acción comunica?

¿Qué concepto científico o prospectivo evoca?

Si un icono no responde esas preguntas, no debe existir.

------------------------------------------------------------------------

# Estilo técnico del set

Especificación del set NISSE (alineada con el prototipo):

- viewBox / canvas: **24×24**
- stroke: **2px**, `currentColor`
- caps / joins: **round**
- outline / línea, sin relleno decorativo
- sin efectos 3D ni sombras propias
- geometría simple, peso uniforme

Inspiración de lenguaje (no dependencias): Lucide · Phosphor · Heroicons.

Los colores `#D7FF2F` / `#F5F7FA` del prototipo de iconos **no** se hardcodean en UI.
En producto el color viene de tokens (`color` CSS / `currentColor`):

- por defecto → `color.text.primary` / `color.text.secondary`
- acento de intención / seleccionado / activo → `color.discovery.primary` (amarillo del sistema)
- estados → `color.warning`, `color.error`, `color.success`, `color.ai.*`

El **brand mark** en lockups in-app (`NisseBrandLockup`) usa el mismo
`color.discovery.primary` que los iconos activos, para que identidad e
instrumentos compartan un solo acento. El neon de kit (`color.brand.neon`) no
pinta iconos UI ni el lockup de producto. Ver `13-brand-mark.md`.

------------------------------------------------------------------------

# Catálogo actual

| name (API) | Componente | Uso semántico sugerido |
|---|---|---|
| `agent` | `AgentIcon` | Agente / orquestación |
| `ai-spark` | `AiSparkIcon` | Generación / insight de Companion |
| `arrow-left` | `ArrowLeftIcon` | Navegación atrás |
| `arrow-right` | `ArrowRightIcon` | Navegación adelante / continuar |
| `bell` | `BellIcon` | Avisos (no KPI) |
| `calendar` | `CalendarIcon` | Tiempo / fechas en bitácora |
| `candidates` | `CandidatesIcon` | Candidatos / alternativas |
| `chat` | `ChatIcon` | Entrada de diálogo del Companion (UI), no “chat genérico” |
| `check` | `CheckIcon` | Confirmación / éxito |
| `chevron-down` | `ChevronDownIcon` | Desplegar / replegar (acordeón); rotar en CSS |
| `close` | `CloseIcon` | Cerrar drawer / panel |
| `decision` | `DecisionIcon` | Bifurcación / decisión |
| `document` | `DocumentIcon` | Evidencia / documento |
| `download` | `DownloadIcon` | Exportar / descargar |
| `expand` | `ExpandIcon` | Expandir / pantalla completa |
| `eye` | `EyeIcon` | Observar / visibilidad |
| `filter` | `FilterIcon` | Filtrar en exploración |
| `folder` | `FolderIcon` | Colección / biblioteca |
| `graph` | `GraphIcon` | Grafo / red / relaciones |
| `home` | `HomeIcon` | Inicio / biblioteca de estudios |
| `legal` | `LegalIcon` | Marco legal / norma |
| `lock` | `LockIcon` | Privacidad / restringido |
| `minus` | `MinusIcon` | Quitar / colapsar |
| `more` | `MoreIcon` | Más acciones |
| `organization` | `OrganizationIcon` | Actor organizacional |
| `plus` | `PlusIcon` | Crear / añadir objeto |
| `question` | `QuestionIcon` | Pregunta / ayuda contextual |
| `security` | `SecurityIcon` | Seguridad / blindaje |
| `send` | `SendIcon` | Enviar prompt al Companion |
| `share` | `ShareIcon` | Compartir / difundir relación |
| `shield` | `ShieldIcon` | Protección / confianza |
| `timeline` | `TimelineIcon` | Timeline / secuencia |
| `user` | `UserIcon` | Actor persona |
| `warning` | `WarningIcon` | Advertencia / incertidumbre visible |
| `workspace` | `WorkspaceIcon` | Workspace / laboratorio |

### Icon Set II — tiempo

| name (API) | Componente | Uso semántico sugerido |
|---|---|---|
| `calendar-time` | `CalendarTimeIcon` | Fecha + momento / bitácora temporal |
| `clock` | `ClockIcon` | Tiempo / instante |
| `clock-fast` | `ClockFastIcon` | Aceleración temporal |
| `fast-forward` | `FastForwardIcon` | Avance / proyectar adelante |
| `history` | `HistoryIcon` | Historial / retrospectiva |
| `hourglass` | `HourglassIcon` | Proceso / espera / maduración |
| `rewind` | `RewindIcon` | Retroceso / revisar pasado |
| `timeline-clock` | `TimelineClockIcon` | Línea de tiempo / secuencia temporal |
| `timer` | `TimerIcon` | Temporizador / ventana de tiempo |

### Icon Set II — astronomía y observación

| name (API) | Componente | Uso semántico sugerido |
|---|---|---|
| `comet` | `CometIcon` | Evento / irrupción |
| `constellation` | `ConstellationIcon` | Narrativa / patrón de relaciones |
| `eclipse` | `EclipseIcon` | Ocultación / punto ciego |
| `moon` | `MoonIcon` | Fase / ciclo |
| `orbit` | `OrbitIcon` | Escenario / trayectoria orbital |
| `planet` | `PlanetIcon` | Mundo / objeto de estudio |
| `sun` | `SunIcon` | Fuente / horizonte luminoso |
| `telescope` | `TelescopeIcon` | Monitoreo / observación (UI; ≠ brand mark) |

### Icon Set II — navegación y orientación

| name (API) | Componente | Uso semántico sugerido |
|---|---|---|
| `compass` | `CompassIcon` | Ejes críticos / orientación |
| `north` | `NorthIcon` | Referencia / rumbo |
| `route` | `RouteIcon` | Camino / itinerario de investigación |
| `waypoint` | `WaypointIcon` | Hito / punto de paso |

### Icon Set II — grafos, nodos y relaciones

| name (API) | Componente | Uso semántico sugerido |
|---|---|---|
| `branch` | `BranchIcon` | Bifurcación / ramas |
| `cluster` | `ClusterIcon` | Agrupación / clúster |
| `directed-edge` | `DirectedEdgeIcon` | Relación dirigida |
| `edge` | `EdgeIcon` | Arista / vínculo |
| `hub` | `HubIcon` | Nodo central / hub |
| `layers` | `LayersIcon` | Capas / estratificación |
| `network` | `NetworkIcon` | Red / malla |
| `node` | `NodeIcon` | Nodo |
| `tree-graph` | `TreeGraphIcon` | Árbol / jerarquía |

### Icon Set II — sistemas y futuros

| name (API) | Componente | Uso semántico sugerido |
|---|---|---|
| `forecast` | `ForecastIcon` | Pronóstico / proyección |
| `perspective` | `PerspectiveIcon` | Evaluación / punto de vista |
| `signal` | `SignalIcon` | Señal / detector |
| `trajectory` | `TrajectoryIcon` | Trayectoria / fuerzas de evolución |

Si falta un concepto del Design Language, **extender el set** en `shared/icons` (SVG + registry + named export). No improvisar otro estilo.

------------------------------------------------------------------------

# Familias conceptuales

## Investigación

Buscar · Explorar · Observar (`eye`, `telescope`) · Analizar · Comparar (`perspective`)

## Conocimiento

Hipótesis · Evidencia (`document`) · Narrativa (`constellation`) · Insight (`ai-spark`) · Bitácora (`calendar` / `timeline-clock` / `history`)

## Prospectiva

Escenario (`orbit`) · Horizonte · Cono · Señal (`signal`) · Driver · Trayectoria (`trajectory`) · Forecast (`forecast`) · Incertidumbre (`warning` / `question` / `eclipse`)

## Orientación

Brújula (`compass`) · Rumbo (`north`) · Ruta (`route`) · Hito (`waypoint`)

## IA

Companion (`ai-spark`, `chat`, `send`) · Pensamiento · Generación · Orquestación · Agente (`agent`)

## Sistemas

Grafo (`graph` / `network`) · Nodo (`node`) · Relación (`edge` / `directed-edge` / `share`) · Capas (`layers`) · Workspace (`workspace`)

------------------------------------------------------------------------

# Metáforas Visuales

No utilizar metáforas empresariales.

Preferir:

- telescopio
- brújula
- constelación
- mapa
- laboratorio
- cuaderno
- árbol
- órbita
- prisma

Evitar:

- maletín
- fábrica
- engranajes como símbolo principal
- hojas de cálculo

------------------------------------------------------------------------

# Tamaños

Escala del sistema (clases CSS / prop `size`):

| Token visual | px | Clase | Uso |
|---|---|---|---|
| sm | 16 | `nisse-icon--sm` | tablas, listas densas |
| nav | 20 | `nisse-icon--nav` | navegación |
| md (default) | 24 | `nisse-icon` / `--md` | acciones |
| lg | 32 | `nisse-icon--lg` | protagonismo |

Nunca mezclar tamaños arbitrarios (`width: 18px`, etc.).

------------------------------------------------------------------------

# Color

Por defecto: color de texto (`currentColor`).

Estados:

- seleccionado / activo → discovery o research.active
- deshabilitado → text.muted + opacidad del sistema
- advertencia → color.warning
- error → color.error

No colorear iconos por decoración.
No usar el lima del kit de marca (`#D7FF2F` / brand neon) como acento de iconos UI; el acento activo es discovery.

------------------------------------------------------------------------

# Composición

Todo icono debe respirar.

Separación mínima: **8 px** del texto (`--space-2`).

Nunca centrar la interfaz en iconografía.

------------------------------------------------------------------------

# Iconos + Objetos Cognitivos

Cada Objeto Cognitivo debe tener un icono consistente en toda la UI.

Mapeo de partida (extender cuando exista glifo dedicado):

| Objeto | Icono actual |
|---|---|
| Evidencia | `document` |
| Timeline | `timeline-clock` (o `timeline` / `history`) |
| Relación / grafo | `graph` / `network` / `edge` |
| Escenario | `orbit` |
| Señal | `signal` |
| Trayectoria / fuerzas | `trajectory` |
| Narrativa | `constellation` |
| Actor (persona) | `user` |
| Actor (org) | `organization` |
| Incertidumbre | `warning` / `question` / `eclipse` |
| Workspace | `workspace` |
| Companion / IA | `ai-spark` / `agent` |
| Decisión / ejes | `decision` / `compass` |
| Alternativas | `candidates` |
| Monitoreo / observación | `telescope` (UI; ≠ brand mark) |

Cuando se añada un glifo específico (hipótesis, driver…), actualizar esta tabla y el registry.

### Sesiones de investigación (Sidebar)

Mapeo preferido tras Icon Set II:

| Sesión | Icono |
|---|---|
| Marco del objeto de estudio | `document` |
| Líneas de tiempo | `timeline-clock` |
| Fuerzas de evolución | `trajectory` |
| Ejes críticos | `compass` |
| Escenarios | `orbit` |
| Narrativas | `constellation` |
| Validación | `check` |
| Evaluación | `perspective` |
| Monitoreo | `telescope` |

------------------------------------------------------------------------

# Ilustraciones

Las ilustraciones deben ser técnicas.

Inspiración: atlas científicos · mapas celestes · diagramas · esquemas.

Nunca caricaturas.

------------------------------------------------------------------------

# Reglas para Cursor / desarrollo

1. Importar desde `frontend/src/shared/icons` (`Icon` o `*Icon`).
2. Si existe un icono semánticamente correcto, **reutilizarlo**.
3. Nunca inventar un icono para un concepto ya representado.
4. Priorizar claridad sobre originalidad.
5. No añadir librerías de iconos externas.
6. Extensiones del set: mismo estilo (24×24, stroke 2, `currentColor`, round) + actualizar registry, named exports e índice de este documento.
7. Accesibilidad: decorativo → `aria-hidden`; significativo → `title` / `aria-label`.
8. Naming de producto: Companion, no “Chat” en copy; el glifo `chat` es solo el instrumento de entrada.

------------------------------------------------------------------------

# Anti-patrones

Nunca:

- mezclar estilos (outline + filled ajenos)
- usar emojis
- abusar del color
- usar iconos como decoración
- duplicar significados
- hardcodear hex del prototipo de iconos
- centrar pantallas en iconografía

------------------------------------------------------------------------

# Checklist

¿El icono comunica un concepto?

¿Está en `shared/icons`?

¿Es consistente con el set?

¿Usa tamaño y color del sistema?

¿Puede entenderse sin texto (o tiene label accesible)?

¿Pertenece a la misma familia visual?

Si no, debe reemplazarse o extenderse el set oficial.
