# Theming

Apply a theme with `data-theme="portfolio" | "epoch"` on a root node. Dark mode uses the `.dark` class (same contract as `next-themes`).

```html
<html class="dark" data-theme="portfolio">
```

Import `@pritishbudhiraja/ui/styles.css` once. ThemeToggle is headless regarding storage: pass `theme` and `setTheme` from the host.

View Transition CSS lives in tokens. `prefers-reduced-motion: reduce` disables the circular reveal; ThemeToggle then calls `setTheme` directly.
