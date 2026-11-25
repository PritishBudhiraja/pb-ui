# Portfolio audit

Source: local clone of [Portfolio-Website](https://github.com/PritishBudhiraja/Portfolio-Website) inspected on 2026-11-25. Live site: https://www.pritishbudhiraja.com/

## Stack

Next.js 16 App Router, React 19, Tailwind CSS v4 (CSS-first, no `tailwind.config`), Biome, pnpm. Fonts: Geist Sans/Mono, Source Serif 4, Work Sans (resume), Caveat (hand notes).

## Visual identity

- Near-neutral light/dark semantic tokens in `app/globals.css`
- Dashed borders, hatch dividers, gutter hairlines on `SiteFrame`
- Editorial asides (`MarginNote`) at `xl`
- Circular View Transition theme toggle
- Cursor-origin ripple buttons
- Contribution heatmap using foreground opacity, not GitHub greens

## Motion

Framer Motion (OriginButton, ScrollProgress, ThemeToggle icons). Lenis smooth scroll via `window.__lenis`. `tw-animate-css` for toast enter/exit.

## Coupling

- Next: `next/link`, `next/navigation`, `next/font`, `fetch` `revalidate` in GitHub data
- `next-themes` for ThemeProvider / ThemeToggle / Spotify embed
- Command menu hardcodes portfolio routes and social URLs

## Accessibility (verified in source)

Present: many `aria-label`s, `lang="en"`, `sr-only` definition terms, command dialog label.

Gaps: OriginButton lacks focus-visible and keyboard analog for the ripple; heatmap cells are `title` only; navbar mobile menu missing `aria-expanded`; LocalTime timezone hardcoded.

## Global CSS leakage

Resume print rules, Spotify embed, cmdk headings, and site-frame live in a single `globals.css`. PB UI extracts hatch, frame, view transitions, and semantic colors. Resume and Spotify stay in the app.

## Visual baseline

Screenshots of the live site belong in `docs/audit/screenshots/`. If that folder is empty, capture was not completed in this environment.
