---
"@pritish.budhiraja/ui": minor
---

ThemeToggle is built on `IconButton` (ghost variant, 32px), so its focus ring, hover and disabled styles match the rest of the library. It no longer has its own muted background. `theme="system"` now follows the OS preference instead of counting as light, and a new `resolvedTheme` prop (as returned by next-themes) takes priority when given. The accessible name can be changed with `label`.
