## 1. Design Language and global scrollbar

- [x] 1.1 Document the line + discovery capsule/circle scrollbar standard in `docs/ux-framework/` (visual language or tokens) and link it from the framework README
- [x] 1.2 Add shared scrollbar CSS tokens/rules applied across app scroll surfaces (WebKit + Firefox); remove divergent Proceso-only scrollbar styling or align it to the global standard

## 2. Case Framework surfaces

- [x] 2.1 Neutralize overview/section header fills to tile background; keep optional discovery border
- [x] 2.2 Restyle status and save chips as outline-only (gray / discovery / green by semantics); label Terminado stays green-outline
- [x] 2.3 Let Case Framework content use full Canvas stage width (relax narrow max-width gutters)

## 3. Workspace chrome balance

- [x] 3.1 Match desktop Companion column width band to the left rail (`minmax` parity)
- [x] 3.2 Verify stage content no longer leaves a large unused right gutter beside a skinny content column

## 4. QA

- [x] 4.1 Visual smoke: headers, chips, scrollbars (nav + canvas + drawer), Companion width, full-width Marco content
- [x] 4.2 Typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
