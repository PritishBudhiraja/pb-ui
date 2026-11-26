# Learnings

- Portfolio Button is almost unused; OriginButton is the visual CTA. Unifying them too early would lose the signature interaction, so they remain separate (Button vs OriginButton).
- Origin filled and outline were copy-pasted; one CVA component with a ripple overlay is enough.
- `useToast` in the portfolio schedules timeouts but never dispatches `REMOVE_TOAST`.
- Heatmap weeks assumed contiguous input days; filling missing UTC dates is required for a generic chart.
- `data-theme-transition` was set in JS but unused in CSS.
- Tailwind v4 `@apply` in the tokens package only works when that CSS is processed by Tailwind (Storybook and `ui` `build:css`).
- TipTap `setContent` must run when the parent value is `""`. Guarding on `value &&` leaves the last document on screen.
- `react-resizable-panels` 4.x imports React `Activity`, which is 19.2+. A 19.0 peer range was a lie for any consumer that imports `SplitWorkspace` from the barrel.
- Workspace `workspace:*` consumers do not prove the published tarball. CI has to `pnpm pack` and install in a throwaway tree.
- FullCalendar would solve recurrence, not Hatch chrome. Overlap packing is enough for a presentational week grid.
