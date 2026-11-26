# Theming

Apply the palette with `data-theme="portfolio"` on a root node. Dark mode uses the `.dark` class (same contract as `next-themes`). There is no second product theme. Token changes happen in Hatch and apply to every consumer (ADR-004).

```html
<html class="dark" data-theme="portfolio">
```

Import `@pritish.budhiraja/ui/styles.css` once. ThemeToggle is headless regarding storage: pass `theme` and `setTheme` from the host.

View Transition CSS lives in tokens. `prefers-reduced-motion: reduce` disables the circular reveal; ThemeToggle then calls `setTheme` directly.
