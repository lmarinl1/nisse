## 1. Section header and completion

- [x] 1.1 Increase spacing among right-header elements (Guardado flag, triad items, hints)
- [x] 1.2 Remove Marcar como terminado toggle from section Canvas (and unused wiring)
- [x] 1.3 Derive triad Terminado automatically when all section fields are non-empty; otherwise Sin comenzar / En construcción; sync `reviewed` on autosave to match completeness

## 2. Overview proportion

- [x] 2.1 Fix overview tracking band to span header width proportionally with `minmax(0, 1fr)` and no horizontal overflow/scroll

## 3. QA

- [x] 3.1 Smoke: spacing, no toggle, auto Terminado on fill/clear, overview no horizontal scroll
- [x] 3.2 Typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
