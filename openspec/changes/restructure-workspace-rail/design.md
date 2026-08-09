## Context

El rail actual en `StudyWorkspace` apila brand → volver → Objeto de Estudio → `ResearchSessionNav` (Proceso). La label de `case-framework` y el copy “Biblioteca” viven en `researchSessions.ts` y superficies de Study. Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**

- Recomponer el orden visual del rail con CSS/flex (spacer) sin cambiar rutas ni ids.
- Unificar copy de producto: Campo / Campo de investigación; Marco del objeto de estudio.

**Non-Goals:**

- No renombrar módulos TS (`StudyLibrary`) ni clases CSS salvo lo necesario para el pie del rail.
- No alterar atmósfera, Companion ni Canvas de sesión.

## Decisions

1. **Nombre “Campo”**  
   Alternativas: Exploratorio, Observatorio, Ágora, Estudios.  
   Elegido **Campo** / **Campo de investigación**: metáfora de terreno de indagación en un laboratorio (filosofía NISSE), sin connotación documental. Enlace corto: “Campo” o “Volver al campo”.

2. **Orden del rail**  
   `brand` → `ResearchSessionNav` → `flex: 1` spacer → bloque Study (eyebrow + h1 + desc) → link Campo. El pie queda anclado con `margin-top: auto` en un wrapper `workspace__rail-foot`.

3. **Label de sesión**  
   Solo cambia el string visible; el id `case-framework` se mantiene (sin **BREAKING** de URL).

4. **Responsive**  
   En móvil, mantener Proceso accesible; Study context puede seguir compactándose (desc oculta) pero el pie (identidad mínima + Campo) permanece al final del rail.

## Risks / Trade-offs

- [Copy “Biblioteca” residual en docs/UX recipe 08] → Mitigation: este change actualiza producto UI + specs; la receta documental puede alinearse después.
- [Rail alto con 8 sesiones empuja el pie fuera de vista] → Mitigation: `min-height: 100vh` + `overflow-y: auto` en el rail; pie al final del scroll, no `position: sticky` en v1 (evita tapar sesiones).

## Migration Plan

Despliegue frontend-only. Rollback: revertir el change. Sin migración de datos.
