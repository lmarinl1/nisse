## 1. Densify ResearchNetworkAtmosphere

- [x] 1.1 Increase orbital ring count (~8–10) and reduce ring/edge stroke width; keep rings faint (discovery token alphas)
- [x] 1.2 Raise node/edge caps and tighten max connection distance so short near-neighbor edges dominate; keep mixed CW/CCW orbital speeds
- [x] 1.3 Add extra-orbital node cohort (radius beyond outermost ring) that can participate in short connections
- [x] 1.4 Add denser core emerge/fade particles near the nucleus; preserve the soft radial center fade
- [x] 1.5 Optional: add `layout` (or equivalent) prop for Study vs auth field centering without forking the draw loop

## 2. Auth background integration

- [x] 2.1 Restructure `AuthScreen` + `auth.css` into a full-viewport shell (atmosphere layer + content column with light scrim if needed)
- [x] 2.2 Mount `ResearchNetworkAtmosphere` behind login and registration; keep brand lockup, form, errors, and switch link usable and legible

## 3. Verification

- [x] 3.1 Visual QA: Study Home, login, register — denser thin orbits, short connections, outer nodes, dense core fade; reduced-motion still static
- [x] 3.2 UX checklist: laboratory atmosphere (not marketing/KPI), tokens only, no pointer capture on atmosphere, auth and Study content remain primary
