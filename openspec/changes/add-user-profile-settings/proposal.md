## Why

La identidad del Diseñador de Futuros en NISSE es mínima (`display_name` + username) y está repartida de forma inconsistente (texto suelto en Campo, logout directo). Hace falta un perfil completo, un `UserIdentity` reutilizable y Settings para editarlo, de modo que la identidad acompañe el trabajo como contexto — no como perfil social.

## What Changes

- Ampliar el perfil persistido: nombre, apellidos, cargo, country code, celular, correo, username (único).
- Avatar de iniciales (nombre + apellidos), borde amarillo NISSE, sin foto ni colores por usuario.
- Control de usuario en Header/Campo: iniciales + primer nombre + `@username`; dropdown con identidad, Settings y Cerrar sesión (flujo de logout existente).
- Pantalla `/settings` (única sección Perfil) con formulario editable, validaciones, guardado con feedback y protección de cambios sin guardar.
- Referencia discreta de usuario junto al brand NISSE en el entry/Workspace donde ya vive el logo.
- Fuente de verdad única en frontend: al guardar, Header, Workspace, dropdown y Settings se actualizan sin re-login.
- API: extender `GET/PATCH /api/profile/me/` (identidad desde sesión; sin `user_id` del cliente).

## Non-goals

- Foto/avatar upload, portada, biografía, redes, perfiles públicos, directorio/búsqueda de usuarios.
- Preferencias, notificaciones, seguridad avanzada, cambio de contraseña (si ya hay otro flujo), auth nueva, roles/permisos nuevos.
- Experiencia de “perfil social” o dashboard de cuenta.

## Capabilities

### New Capabilities

- `user-settings`: pantalla Settings (ruta, sección Perfil, formulario, validación, guardado, dirty-state, estados de carga/error).

### Modified Capabilities

- `identity-profile`: campos completos del Profile; reglas de iniciales; identidad de trabajo (no social); componente `UserIdentity` y estado compartido.
- `backend-api`: contrato de Profile ampliado; `PATCH` del perfil propio derivado de la sesión autenticada.
- `frontend-app`: shell de identidad en Header/Campo, dropdown, ruta Settings, convivencia brand + usuario.

## Impact

- **Backend + frontend + UX** (un change API+UI).
- **Backend:** modelo `Profile` (o campos en User + Profile 1:1 existente), serializers, `ProfileMeView` GET/PATCH, tests, migraciones.
- **Frontend:** `AuthContext`/estado de perfil; `UserIdentity`; Settings route/form; cliente tipado; iconos de `shared/icons`.
- **Research question:** ¿Quién investiga en este laboratorio y con qué identidad de trabajo?
- **Cognitive Objects:** ninguno nuevo; identidad de sesión como contexto del Workspace.
