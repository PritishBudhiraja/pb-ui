# Learnings

- Portfolio Button is almost unused; OriginButton is the visual CTA. Unifying them too early would lose the signature interaction, so they remain separate (Button vs OriginButton).
- Origin filled and outline were copy-pasted; one CVA component with a ripple overlay is enough.
- `useToast` in the portfolio schedules timeouts but never dispatches `REMOVE_TOAST`.
- Heatmap weeks assumed contiguous input days; filling missing UTC dates is required for a generic chart.
- `data-theme-transition` was set in JS but unused in CSS.
- Tailwind v4 `@apply` in the tokens package only works when that CSS is processed by Tailwind (Storybook and `ui` `build:css`).
