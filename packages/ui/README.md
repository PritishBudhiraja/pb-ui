# @pritish.budhiraja/ui

Hatch React components. Docs: [ui.pritishbudhiraja.com](https://ui.pritishbudhiraja.com).

```bash
pnpm add @pritish.budhiraja/ui
```

```tsx
import "@pritish.budhiraja/ui/styles.css"
import { Button } from "@pritish.budhiraja/ui"
import { OriginButton } from "@pritish.budhiraja/ui/motion"
```

If your app already uses Tailwind CSS v4, import the Tailwind entry from your own stylesheet instead of `styles.css`. Your Tailwind build then generates the library's classes too, so preflight and the theme are included once:

```css
@import "tailwindcss";
@import "@pritish.budhiraja/ui/tailwind.css";
```

`@pritish.budhiraja/tokens` is installed with this package. Set `data-theme="portfolio"` or `"epoch"` on the document, and `class="dark"` for dark mode.
