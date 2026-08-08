# NISSE brand mark (telescopio)

Marca oficial de la aplicación. **No** forma parte del set de iconos UI (`shared/icons`).

Assets estáticos: `frontend/public/brand/`  
API React: `frontend/src/shared/brand`  
Normas: `docs/ux-framework/13-brand-mark.md`

## Source of truth

La geometría se trazó desde `public/brand/reference-original.png` (suministrado por el proyecto). No reinterpretar ni redibujar el telescopio.

## Variantes

| Archivo | Variante API | Uso |
|---------|--------------|-----|
| `nisse-icon-official.svg` | `official` | Marca oficial (header, login, splash, docs) |
| `nisse-icon-official-clean.svg` | `official-clean` | Sin glow (UI densa, impresión, filtros SVG frágiles) |
| `nisse-icon-official-dark.svg` | `official-dark` | Fondo deep-space `#05070A` autocontenido |
| `nisse-favicon.svg` | `favicon` | Favicon / chrome compacto (sin estrellas) |
| `nisse-favicon-clean.svg` | `favicon-clean` | Favicon sin glow |
| `nisse-favicon-dark.svg` | `favicon-dark` | Favicon con fondo deep-space |
| `nisse-icon-currentColor.svg` | `official-currentColor` | Hereda color (ver nota) |
| `nisse-favicon-currentColor.svg` | `favicon-currentColor` | Hereda color (ver nota) |

## Importación

```tsx
import { NisseMark, NisseBrandLockup } from "../../shared/brand";

<NisseBrandLockup size="entry" />
<NisseBrandLockup size="compact" />
<NisseMark variant="official" width={48} height={48} />
```

Favicon (`index.html`):

```html
<link rel="icon" type="image/svg+xml" href="/brand/nisse-favicon.svg" />
```

## Color

- Neon de marca (en el SVG oficial): `#D7FF2F` → token `--color-brand-neon`
- Deep space (variantes dark): `#05070A` → token `--color-brand-deep-space`
- Acento de **UI** discovery sigue siendo `--color-discovery-primary` (no sustituir el neon del mark)

Para máxima fidelidad de identidad, preferir variantes de color fijo (`official` / `favicon`), no `currentColor`.

`currentColor` vía `<img>` **no** hereda `color` CSS; usar solo si se incrusta el SVG en línea o con máscara CSS.

## Reglas rápidas

- Clear space ≈ 10% del ancho del mark
- No añadir trípode, no rotar, no estirar, no redibujar
- Favicon = única variante oficial sin estrellas
- Sensación: futurista, precisa, exploratoria, serena — no cyberpunk ni “AI genérico”
