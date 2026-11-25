# PB UI — agent development rules

This is a standalone design system. Keep product apps in their own repositories.

## Component-first process

Whenever a new UI requirement arrives:

1. Understand the design and interaction requirements.
2. Inspect existing components and stories.
3. Prefer reuse, then composition, then a justified new component.
4. Define the public API before implementation.
5. Implement the smallest maintainable solution.
6. Validate accessibility, reduced motion, themes, and states.
7. Update documentation and ADRs when a real decision is made.

## New component questions

- Why does this component need to exist?
- Why can't existing components solve this?
- Can it be composed from primitives?
- Is it generic or product-specific?
- What is its expected reuse?
- Does it introduce a new dependency?
- What are its maintenance implications?

Reject duplicate components with different names but equivalent responsibilities.

## Hard constraints

- No Next.js APIs in framework-independent components (`next/link`, `next/navigation`, `next/font`).
- No Epoch domain widgets (SeasonCard, FocusTimer, TaskRow, and similar).
- No hardcoded product colors inside generic components — use semantic tokens.
- Do not install dependencies without documenting why in `docs/audit/DEPENDENCY_AUDIT.md`.
- Do not publish from a laptop. npm releases go through GitHub Actions (`Release`). Do not configure DNS or AWS without approval.
- Do not generate boilerplate documentation.

## Packages

- `@pritish.budhiraja/tokens` — CSS variables and themes.
- `@pritish.budhiraja/ui` — components without `framer-motion`.
- `@pritish.budhiraja/ui/motion` — OriginButton, ScrollProgress, and other motion-only exports.

## Definition of done

A component is complete when its purpose, public API, themes, states, keyboard behavior, accessibility, examples, and tests are in place, and it has no application-specific dependencies.
