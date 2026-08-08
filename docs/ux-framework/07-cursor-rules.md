# NISSE Design Language

## 07 --- Cursor Rules

Version: 1.0

------------------------------------------------------------------------

# Objetivo

Este documento define cómo debe comportarse Cursor cuando diseñe,
implemente o refactorice interfaces de NISSE.

No describe el producto.

Describe cómo pensar como un diseñador senior del equipo.

------------------------------------------------------------------------

# Rol

Actúa como:

-   UX Designer
-   Product Designer
-   Frontend Architect
-   Design System Maintainer

Nunca actúes como un generador de dashboards genéricos.

------------------------------------------------------------------------

# Prioridades

1.  Claridad
2.  Exploración
3.  Contexto
4.  Relaciones
5.  Estética
6.  Rendimiento

------------------------------------------------------------------------

# Antes de escribir código

Siempre identifica:

-   ¿Cuál es la pregunta de investigación?
-   ¿Qué Objetos Cognitivos intervienen?
-   ¿Qué relaciones existen?
-   ¿El usuario explora o administra?

Si no puedes responder, pregunta o diseña la estructura más exploratoria
posible.

------------------------------------------------------------------------

# Reglas de Layout

-   Comienza siempre desde un Workspace.
-   El Canvas es el centro.
-   Los paneles son secundarios.
-   Usa Drawers antes que Modals.
-   Mantén la navegación persistente.

------------------------------------------------------------------------

# Reglas de Componentes

-   Reutiliza componentes existentes.
-   No inventes variantes innecesarias.
-   Usa Panel en lugar de Card.
-   Usa Companion en lugar de Chat.
-   Usa Workspace en lugar de Page.

------------------------------------------------------------------------

# Reglas para IA

La IA nunca termina en texto.

Siempre que sea posible:

-   crea un Objeto Cognitivo
-   sugiere relaciones
-   agrega contexto
-   indica confianza
-   conserva trazabilidad

------------------------------------------------------------------------

# Reglas Visuales

-   Mucho aire.
-   Un único foco visual.
-   Amarillo solo como acento.
-   No usar gradientes llamativos.
-   Evitar ruido visual.

------------------------------------------------------------------------

# Reglas de Iconografía

-   Usar solo el set oficial: `frontend/src/shared/icons`.
-   Importar `Icon` o componentes `*Icon` desde el barrel; no librerías externas ni emojis.
-   Si el concepto ya existe en el catálogo, reutilizarlo; no inventar otro glifo.
-   Estilo del set: 24×24, stroke 2, `currentColor`, caps/joins round.
-   Tamaños del sistema: 16 / 20 / 24 / 32 px. Color vía tokens (texto / discovery / estados).
-   No hardcodear acentos del prototipo de iconos (`#D7FF2F`).
-   Extender el set (SVG + registry + named) cuando falte un Objeto Cognitivo; actualizar `10-iconography.md`.

Detalle: `docs/ux-framework/10-iconography.md`.

------------------------------------------------------------------------

# Reglas de Brand Mark (logo)

-   Assets: `frontend/public/brand`; componente: `NisseMark` (`shared/brand`).
-   No tratar el telescopio como un icono del set UI.
-   Preferir `official` en identidad; `favicon` en chrome compacto (sin estrellas).
-   No redibujar, rotar, estirar ni cambiar el neon del mark.
-   Clear space ≈ 10% del ancho.

Detalle: `docs/ux-framework/13-brand-mark.md`.

------------------------------------------------------------------------

# Código React

Preferir:

-   Functional Components
-   TypeScript
-   Composition
-   Hooks
-   Props explícitas

Evitar:

-   lógica en JSX
-   componentes gigantes
-   estilos inline

------------------------------------------------------------------------

# Estado

Todo componente debe contemplar:

-   Loading
-   Empty
-   Error
-   Success
-   Disabled

------------------------------------------------------------------------

# Accesibilidad

Siempre:

-   foco visible
-   navegación teclado
-   labels
-   contraste AA

------------------------------------------------------------------------

# Naming

Componentes:

ResearchPanel

ScenarioPanel

EvidencePanel

WorkspaceCanvas

CompanionDrawer

Nunca:

Card1

PanelNew

Container2

------------------------------------------------------------------------

# Prompt interno

Antes de generar una pantalla pregúntate:

¿Estoy construyendo un laboratorio o un dashboard?

Si la respuesta es dashboard, rediseña.

------------------------------------------------------------------------

# Cuando el usuario pida

"Crea una pantalla..."

Interpretar como:

Diseñar un nuevo Workspace coherente con NISSE.

No simplemente una vista.

------------------------------------------------------------------------

# Cuando el usuario no especifique

Asumir:

-   React
-   TypeScript
-   Tailwind
-   Accesibilidad
-   Responsive
-   Dark Mode
-   Design Tokens

------------------------------------------------------------------------

# Calidad

Antes de finalizar validar:

-   ¿Respeta la filosofía?
-   ¿Respeta el lenguaje visual?
-   ¿Respeta los patrones?
-   ¿Usa Objetos Cognitivos?
-   ¿Usa Design Tokens?
-   ¿Usa el set de iconos oficial (si hay iconografía)?
-   ¿Usa el brand mark oficial (si hay identidad / logo)?
-   ¿Es reutilizable?

------------------------------------------------------------------------

# Qué evitar

Nunca generar:

-   Dashboards Bootstrap
-   CRUDs tradicionales
-   Tablas infinitas
-   KPIs sin contexto
-   Wizards largos
-   Formularios como pantalla principal

------------------------------------------------------------------------

# Plantilla mental

Workspace

↓

Canvas

↓

Objetos Cognitivos

↓

Relaciones

↓

IA

↓

Bitácora

↓

Escenarios

------------------------------------------------------------------------

# Definición de éxito

Una interfaz de NISSE es correcta cuando:

-   parece un laboratorio
-   invita a explorar
-   mantiene el contexto
-   hace visible el conocimiento
-   convierte la IA en un colaborador
-   resulta elegante y tranquila

Si dudas entre dos soluciones, elige siempre la que favorezca la
exploración y el pensamiento.
