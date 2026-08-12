## 1. Theme-aware atmosphere mode

- [x] 1.1 Detect resolved theme in `ResearchNetworkAtmosphere` (`useTheme` and/or `data-theme`) and select `orbital` vs `exploration`
- [x] 1.2 Keep existing orbital simulation path behaviorally unchanged for dark
- [x] 1.3 Ensure mode switches live when theme preference/resolved appearance changes

## 2. Light exploration field

- [x] 2.1 Implement sparse particle field (appear/disappear) with brand neon `#D7FF2F` / `--color-brand-neon` — no rings, no nucleus cloud
- [x] 2.2 Implement ephemeral incomplete edges with occasional short branches that dissolve (never a complete graph)
- [x] 2.3 Add subtle cursor affinity (nearby node reaction + rate-limited revealed connections) without blocking UI pointer events
- [x] 2.4 Honor `prefers-reduced-motion` (static/paused field; no continuous connect loop / no cursor spawn storm)

## 3. Surfaces + identity QA

- [x] 3.1 Verify Auth + Study entry mount theme-aware atmosphere; foreground copy/CTAs remain legible in light and dark
- [x] 3.2 Tune density/opacity for warm paper light background (subtle, not cyberpunk; no strong glow)

## 4. UX framework docs

- [x] 4.1 Update `docs/ux-framework/01-visual-language.md` with dual entry atmospheres (orbital dark / exploration light) and metaphor line
- [x] 4.2 Update `docs/ux-framework/09-motion-language.md` with exploration-field motion, cursor affinity, and reduced-motion rules
- [x] 4.3 Optional brief note under `atmosphere/` in `12-react-architecture.md` if useful for discoverability
