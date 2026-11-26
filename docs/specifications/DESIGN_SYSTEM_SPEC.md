# Design system specification

Hatch is a personal frontend ecosystem: minimal, editorial, calm, keyboard-friendly, and composable. It is not a shadcn dump and not an Epoch product kit. The packages are `@pritish.budhiraja/tokens` and `@pritish.budhiraja/ui`.

## Identity

Monochrome semantics, dashed structure, hatch dividers, handwritten annotations, origin-ripple CTAs, circular theme reveal.

## Tokens

Three layers: primitive values inside theme files, semantic CSS variables (`--background`, `--primary`, `--editorial`, …), component CSS only for hatch/frame.

One palette, light and dark.

Typography is semantic (`--font-sans`, `--font-serif`, `--font-display`, `--font-hand`). Sans for UI, Source Serif for editorial display.

## Non-goals

- Next.js inside the library
- Epoch domain components
- Publishing, DNS, and hosting until those are approved
- Wrapping every HTML element
- Maximum component count
