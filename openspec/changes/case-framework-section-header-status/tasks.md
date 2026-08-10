## 1. Section header chrome

- [x] 1.1 Refactor section Canvas header: right-side progress triad (Sin comenzar / En construcción / Terminado); gray inactive; active white / discovery / green; map `with_content` → En construcción
- [x] 1.2 Place Marcar como terminado toggle in the same right-side header group
- [x] 1.3 Add discreet upper-right yellow “Guardado” flag when save state is saved; hide while dirty/saving/error

## 2. Editor surfaces

- [x] 2.1 Set Markdown textarea (and related editor surfaces) background to neutral workspace/canvas — remove discovery yellow tint

## 3. QA

- [x] 3.1 Visual smoke: triad lighting, toggle placement, Guardado flag, neutral textareas
- [x] 3.2 Typecheck/build in WSL: `cd frontend && npx tsc -b && npm run build`
