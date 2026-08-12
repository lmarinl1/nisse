## 1. Shared type detail + popover

- [x] 1.1 Add `@radix-ui/react-popover` (frontend) if not already present; wire portal content with design tokens
- [x] 1.2 Create presentational `DerivationTypeDetailCard` (name, reference, inspiration, pista) reusable by Drawer and Canvas

## 2. Drawer mosaic «Ver más»

- [x] 2.1 Truncate mosaic pista and add «Ver más» that opens popover with full pista; omit/disable when no overflow
- [x] 2.2 Ensure closing popover does not change type selection; copy in Spanish

## 3. Canvas node type chips

- [x] 3.1 Pass `typeIds` into flow node data; remove primary-type eyebrow
- [x] 3.2 Render per-type chips (icon via `iconForDerivationType` + name) with `nodrag`/`nopan`; click opens detail card popover
- [x] 3.3 Verify node name click still selects/opens Drawer; chips do not start drag; tokens + Canvas/Companion patterns OK

## 4. Verify

- [x] 4.1 Smoke: mosaic Ver más; multi-type chips + detail card; short pista without unnecessary Ver más
- [x] 4.2 Typecheck WSL: `cd frontend && npx tsc -b`
