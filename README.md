# NISSE

> **Speculative Research Workspace**
>
> Un framework de experiencia de usuario para construir aplicaciones de
> investigación, diseño de futuros e inteligencia aumentada.

Monorepo con **backend Django** (MongoDB), **frontend React** (Vite + TypeScript) y **OpenSpec** para desarrollo dirigido por especificaciones.

------------------------------------------------------------------------

# ¿Qué es NISSE?

NISSE no es un dashboard.

NISSE no es un CRM.

NISSE no es un chatbot.

NISSE es un **Speculative Research Workspace**: un entorno donde
personas y agentes de IA colaboran para explorar sistemas complejos,
construir hipótesis y diseñar futuros posibles.

Este repositorio documenta el lenguaje de diseño y las reglas de
implementación para mantener una experiencia consistente, junto con el
código de backend y frontend.

------------------------------------------------------------------------

# Filosofía

Todo el sistema responde a una idea central:

> **Diseñamos espacios para pensar, no pantallas para administrar.**

Cada decisión de UX debe favorecer:

- Exploración
- Contexto
- Relaciones
- Descubrimiento
- Reflexión
- Colaboración entre humanos e IA

------------------------------------------------------------------------

# Objetivos

- Crear interfaces consistentes.
- Facilitar el trabajo de diseñadores y desarrolladores.
- Guiar a Cursor y otros agentes de código.
- Mantener un único lenguaje visual.
- Evolucionar el sistema sin perder coherencia.

------------------------------------------------------------------------

# Estructura

```text
nisse/
├── backend/              # Django 5.2 + DRF + django-mongodb-backend
├── frontend/             # React 19 + TypeScript + Vite
├── openspec/             # Specs y changes (OpenSpec)
├── docs/ux-framework/    # Design Language completo (referencia)
├── docker-compose.yml
├── AGENTS.md             # Guías para agentes / equipo
├── .venv/                # Entorno Python (local, no se versiona)
└── .cursor/rules/        # Rules condensadas para Cursor (.mdc)
    ├── nisse-wsl.mdc         # siempre: solo WSL2
    ├── nisse-core.mdc        # siempre: filosofía + rol
    ├── nisse-practices.mdc   # siempre: OpenSpec / ingeniería
    ├── nisse-workspace.mdc   # frontend: canvas y objetos
    ├── nisse-ui.mdc          # frontend: visual / tokens / copy
    └── nisse-react.mdc       # frontend: arquitectura React
```

------------------------------------------------------------------------

# Cómo leer la documentación

Si eres nuevo:

1. `docs/ux-framework/00-philosophy.md`
2. Visual Language → Workspace Grammar → Components → Patterns (misma carpeta)

Las rules de Cursor son resúmenes accionables; el detalle vive en `docs/ux-framework/`. En un chat, profundiza con `@docs/ux-framework/...`.

------------------------------------------------------------------------

# Cómo trabajar con Cursor

Antes de pedir una pantalla:

1. Explica el problema.
2. Formula la pregunta de investigación.
3. Describe los Objetos Cognitivos involucrados.
4. Indica qué debe descubrir el usuario.

Evita pedir únicamente:

> "Haz una pantalla bonita"

Prefiere:

> "Diseña un Workspace para explorar señales débiles relacionadas con
> movilidad urbana mediante grafos y escenarios."

------------------------------------------------------------------------

# Flujo recomendado

```text
Idea
 ↓
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
```

------------------------------------------------------------------------

# Principios innegociables

- El Canvas es el protagonista.
- La IA acompaña, no reemplaza.
- El conocimiento es relacional.
- La incertidumbre es visible.
- Todo mantiene contexto.
- Los componentes representan instrumentos de investigación.

------------------------------------------------------------------------

# Convenciones

## Componentes

ResearchPanel

ScenarioPanel

WorkspaceCanvas

CompanionDrawer

## Nunca

Card1

PanelNuevo

ContainerFinal

------------------------------------------------------------------------

# ¿Cuándo actualizar el Framework?

Actualiza la documentación únicamente cuando:

- aparezca un patrón repetido;
- se cree un nuevo componente reutilizable;
- una decisión de UX se convierta en estándar;
- una metodología requiera una representación propia.

No documentes experimentos temporales.

------------------------------------------------------------------------

# Qué NO hacer

- No crear pantallas tipo CRM.
- No añadir reglas sin validarlas.
- No duplicar componentes.
- No romper Design Tokens.
- No crear variantes locales.

------------------------------------------------------------------------

# Checklist antes de hacer un Pull Request

- ¿Respeta la filosofía?
- ¿Usa componentes existentes?
- ¿Consume Design Tokens?
- ¿Mantiene el contexto?
- ¿El resultado se siente como un laboratorio?

Si alguna respuesta es "no", revisar antes de integrar.

------------------------------------------------------------------------

# Evolución

El Framework está vivo.

Primero construimos.

Después abstraemos.

Finalmente documentamos.

La documentación debe describir decisiones comprobadas, no hipótesis.

------------------------------------------------------------------------

# Visión

Queremos que cualquier diseñador, desarrollador o agente de IA pueda
construir una nueva funcionalidad para NISSE y que un usuario la
reconozca inmediatamente como parte del mismo universo.

Si una pantalla parece pertenecer a otra aplicación, el Framework ha
fallado.

------------------------------------------------------------------------

# Desarrollo técnico

## Shell: solo WSL2

Todo (agente, docs, scripts) se ejecuta en **WSL2** con la distro `Ubuntu-24.04`. No uses PowerShell/CMD para el monorepo.

```bash
# Entrar al repo desde Windows
wsl -d Ubuntu-24.04

cd "/mnt/c/Users/lmari/OneDrive/Escritorio/Maestría/Codigo/nisse"
```

## Requisitos (dentro de WSL)

- Python 3.11+ (`python3`)
- Node.js 20.19+ vía **nvm** en Linux (no el Node de Windows)
- Docker (Docker Desktop + integración WSL2) u otra instancia MongoDB / Atlas
- OpenSpec CLI: `npm install -g @fission-ai/openspec@latest` (en WSL)

Setup inicial (una vez):

```bash
wsl -d Ubuntu-24.04 -- bash "/mnt/c/Users/lmari/OneDrive/Escritorio/Maestría/Codigo/nisse/scripts/setup-wsl.sh"
```

## Arranque rápido

Desde una shell WSL en la raíz del repo:

### 1. MongoDB

```bash
docker compose up -d
```

### 2. Backend

```bash
source .venv/bin/activate
cd backend
cp -n .env.example .env
python manage.py migrate
python manage.py runserver
```

API health: http://127.0.0.1:8000/api/health/

### 3. Frontend

```bash
cd frontend
cp -n .env.example .env
npm install
npm run dev
```

App: http://localhost:5173/

## OpenSpec (flujo de trabajo)

Reinicia Cursor después del `openspec init` para cargar los slash commands.

| Comando | Uso |
|---------|-----|
| `/opsx-explore` | Explorar ideas sin compromiso |
| `/opsx-propose` | Crear change (proposal, specs, design, tasks) |
| `/opsx-apply` | Implementar según `tasks.md` |
| `/opsx-archive` | Archivar y fusionar deltas en `openspec/specs/` |

Specs actuales: `openspec/specs/`  
Cambios activos: `openspec/changes/`

## Buenas prácticas de ingeniería

- Toda feature no trivial pasa por OpenSpec
- Secretos solo en `.env` (nunca en git)
- Contratos de API explícitos; actualizar el cliente del frontend cuando cambien
- Commits convencionales preferidos
- Ver `AGENTS.md` y `openspec/config.yaml` para convenciones del equipo

## Stack

| Capa | Tecnología |
|------|------------|
| Shell | WSL2 (`Ubuntu-24.04`) |
| API | Django 5.2, Django REST Framework |
| DB | MongoDB (`django-mongodb-backend`) |
| UI | React 19, TypeScript, Vite |
| Specs | OpenSpec 1.8 |
| UX | Rules Cursor (`.cursor/rules/nisse-*.mdc`) + docs (`docs/ux-framework/`) |
