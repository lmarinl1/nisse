# NISSE Icon Set

Set oficial de iconos del frontend. Fuente de diseño: prototipo NISSE + `docs/ux-framework/10-iconography.md`.

## Especificación

- Canvas / viewBox: **24×24**
- Stroke: **2px**, caps/joins **round**
- Color: **`currentColor`** (hereda de CSS)
- Outline / línea; sin relleno decorativo

Los acentos del prototipo (`#D7FF2F`, `#F5F7FA`) **no** se usan en producto. En UI aplicar tokens (`--color-text-*`, `--color-discovery-primary`, estados).

## Importación

```tsx
import { Icon, HomeIcon, GraphIcon } from "../../shared/icons";

<HomeIcon />
<Icon name="graph" size="lg" title="Grafo de relaciones" />
<span style={{ color: "var(--color-discovery-primary)" }}>
  <GraphIcon aria-hidden />
</span>
```

## Tamaños (`size` o clases)

| size | px | Clase | Uso |
|------|----|-------|-----|
| `sm` | 16 | `nisse-icon--sm` | listas / tablas |
| `nav` | 20 | `nisse-icon--nav` | navegación |
| `md` | 24 | default / `--md` | acciones |
| `lg` | 32 | `nisse-icon--lg` | protagonismo |

## Extender el set

1. Añadir `svg/<name>.svg` con el mismo estilo técnico.
2. Registrar el glifo en `registry.tsx` y el export en `named.tsx` + `index.ts`.
3. Actualizar el catálogo en `docs/ux-framework/10-iconography.md`.

No añadir Lucide u otras librerías de iconos.

El logo de la app (telescopio) no vive aquí: ver `../brand/` y `docs/ux-framework/13-brand-mark.md`.
