# Design system specification

PB UI is a personal frontend ecosystem: minimal, editorial, calm, keyboard-friendly, and composable. It is not a shadcn dump and not an Epoch product kit.

## Identity

Monochrome semantics, dashed structure, hatch dividers, handwritten annotations, origin-ripple CTAs, circular theme reveal.

## Tokens

Three layers: primitive values inside theme files, semantic CSS variables (`--background`, `--primary`, `--editorial`, …), component CSS only for hatch/frame.

Themes:

- **Portfolio light/dark** — default theme
- **Epoch light/dark** — alternate theme

Typography is semantic (`--font-sans`, `--font-serif`, `--font-display`, `--font-hand`). Portfolio uses Geist + Source Serif. Epoch candidates use Inter + Instrument Serif.

## Non-goals

- Next.js inside the library
- Epoch domain components
- Publishing, DNS, and hosting until those are approved
- Wrapping every HTML element
- Maximum component count
