## Why

NISSE solo opera en un tema oscuro fijo (`tokens.css` con `color-scheme: dark`), aunque el Design Language ya define Modo Light (“papel técnico”) y Modo Dark (“profundidad”). Hace falta que cada Diseñador de Futuros elija apariencia —claro, oscuro o según el dispositivo— desde Settings de perfil, como preferencia persistida, sin convertir el laboratorio en un panel de “tema genérico”.

## What Changes

- Tratar el token set actual como **dark mode** canónico.
- Definir un **light mode** semántico (fondos cálidos tipo papel técnico; contraste tipográfico alto; discovery yellow conservado), inspirado opcionalmente en la colorimetría cálida/académica de [Escuela para la Comunicación Esencial – Colegiatura](https://www.colegiatura.edu.co/escuela-para-la-comunicacion-esencial) —sin copiar marca ni tipografía ajenas.
- Preferencia de usuario `theme_preference`: `light` | `dark` | `system`, editable en Settings (sección Apariencia junto a Perfil).
- Persistencia en Profile (`GET`/`PATCH /api/profile/me/`) y aplicación inmediata en el documento (`data-theme` / `color-scheme`).
- Actualizar docs UX (`01-visual-language`, `06-design-tokens`) con valores light/dark explícitos y reglas de resolución `system`.

## Non-goals

- Temas custom por usuario, acentos arbitrarios, o “theme marketplace”.
- Preferencias ajenas (idioma, densidad, notificaciones, reduced-motion como setting).
- Rediseño de layout, canvas, o brand mark; solo tokens y resolución de apariencia.
- Forzar light en entry/login de forma distinta al resto de la app.

## Capabilities

### New Capabilities

- `theme-appearance`: resolución light/dark/system, tokens duales, Settings de Apariencia, aplicación global sin flash, docs UX alineadas.

### Modified Capabilities

- `identity-profile`: Profile incluye `theme_preference` como preferencia de trabajo (no social).
- `backend-api`: contrato Profile GET/PATCH incluye y valida `theme_preference`.
- `frontend-app`: shell autenticado (y entry) respeta el tema resuelto; Settings expone el control.

## Impact

- **Backend + frontend + UX** (un change API+UI).
- **Research question:** ¿Cómo se lee y se habita el laboratorio en luz diurna (papel técnico) frente a profundidad nocturna (observatorio)?
- **Cognitive Objects:** ninguno nuevo; la preferencia es contexto ambiental del Workspace.
- **Backend:** campo Profile, serializer, tests.
- **Frontend:** provider/hook de tema, tokens CSS duales, Settings Apariencia, tipado API.
- **Docs:** `docs/ux-framework/01-visual-language.md`, `06-design-tokens.md`.
