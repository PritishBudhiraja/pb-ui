---
"@pritish.budhiraja/ui": patch
---

Keep `"use client"` in the published build. The library now ships one file per module, and every module that uses hooks, context or event handlers starts with the directive, so it can be imported from React Server Components (for example, a Next.js App Router page). Server-safe components such as `Button` and `Card` stay directive-free.
