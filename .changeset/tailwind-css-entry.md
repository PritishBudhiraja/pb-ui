---
"@pritish.budhiraja/ui": minor
---

Add `@pritish.budhiraja/ui/tailwind.css` for apps that already use Tailwind CSS v4. Import it from your stylesheet after `@import "tailwindcss"`. Your Tailwind build then generates the library's classes, so preflight and the theme are included once instead of twice. `styles.css` is unchanged for apps without Tailwind. `tw-animate-css` moved to dependencies, and `tailwindcss` ^4 is an optional peer dependency.
