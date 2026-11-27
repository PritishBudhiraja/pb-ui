---
"@pritish.budhiraja/ui": patch
---

Fixes from an audit of the new components:

- `WeekCalendar`: dragging moves an event by the distance dragged, not more with each saved change, and a drag survives the parent saving each step. A cancelled touch drag ends, and the click after a drag no longer selects the event. The now line appears after hydration, moves every minute, and no longer causes a hydration mismatch. The resize handle is no longer a tab stop; the event describes its arrow-key moves.
- `Calendar` range mode marks every day in the range as pressed.
- `TimeRangePicker` and `DurationPicker` join `FormField`: unique ids, the field label, hint and error, and `aria-invalid`. The "End must be after start." error is announced and linked to the end time. `DurationPicker` shows hours above `maxHours` and an hour of 0, and treats negative or non-number values as 0. `TimeRangePicker` takes `id` and `aria-label`.
- `FileDropzone` applies `accept` and `multiple` to dropped files, keeps its hidden input out of the tab order, and joins `FormField` through the Browse button.
- Charts draw their grid, axes and area in the theme colours (they were invalid `hsl(hsl(...))` values), include a visually hidden data table, and key donut slices by position.
- `RichTextEditor` updates its placeholder and toolbar as you type, marks toolbar buttons with `aria-pressed`, and joins `FormField`.
- `SplitWorkspace` sizes the main panel from the side panels so the layout adds up to 100%.
- `revealFromOrigin` no longer runs the update twice when the browser skips the transition.
- `SortableList` no longer causes a hydration mismatch, and dropping an item on itself does not call `onReorder`.
- `CountdownDisplay` shows 00:00:00 for `NaN` or `Infinity`. `WeeklyActivityGrid` and `TimeAllocationBar` accept repeated labels; the grid reads each cell's value to screen readers.
- `Stepper` puts `aria-current` on the step and reads each step's status. `VirtualList` items carry `aria-setsize` and `aria-posinset`. `StreamingText` is `aria-busy` while streaming.
