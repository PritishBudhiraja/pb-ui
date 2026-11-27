# Accessibility guidelines

Target WCAG 2.2 AA for shipped behavior.

- Semantic HTML first; ARIA only when needed
- Focus-visible rings using `--ring`
- Icon-only controls require `aria-label` (IconButton `label` is required)
- Overlays use Radix focus trap and Escape
- Heatmaps expose a text summary (`sr-only` + `role="img"`)
- Theme toggle sets `aria-pressed`
- Respect `prefers-reduced-motion`
- Automated axe checks in the component tests do not replace keyboard review
