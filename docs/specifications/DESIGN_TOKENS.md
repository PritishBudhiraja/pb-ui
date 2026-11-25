# Design tokens

Defined in `packages/tokens`.

## Semantic colors

`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive` (plus `-foreground` counterparts), `border`, `input`, `ring`, `editorial`, `gutter-ink`.

## Shape and motion

`--radius` 0.5rem. Durations: `--pb-duration-fast` 150ms, `--pb-duration-theme` 400ms. Easing: `--pb-ease-theme`, `--pb-ease-out`. Overlay z-index 200, toast 100.

## Layout

Default frame 720px, wide 1120px. Hatch height 1.125rem, −45° 3px/1px stripe.

## Fonts

Consumers must load fonts and assign `--font-geist-sans`, `--font-source-serif`, `--font-geist-mono`, or override `--pb-font-*`. Caveat is referenced as `--pb-font-hand`.
