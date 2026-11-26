---
"@pritish.budhiraja/ui": patch
"@pritish.budhiraja/tokens": patch
---

Fixes from a line-by-line audit:

- `Calendar` names each day by its full date, marks the selected day with `aria-pressed` and today with `aria-current="date"`, and moves between days with the arrow keys (one tab stop, crossing months).
- `DatePicker` disables "Today" when today is outside `min` / `max`. `DatePicker` and `TimePicker` disable their hidden form input when the picker is disabled.
- `ProgressBar` fills relative to `max`.
- `OriginButton` keeps the caller's `onMouseEnter`, `onMouseLeave`, `onFocus` and `onBlur`.
- `CopyButton` shows "Could not copy" when a copy fails right after a successful one.
- `CommandPalette` items are keyed by `id`, so two items with the same label are selected one at a time. Its empty message sits outside the listbox.
- `CalendarHeatmap` accepts days in any order.
- Toasts sit above dialogs, sheets and the command palette (`z-[300]`, `--pb-z-toast: 300`).

Tokens: `--destructive` meets 4.5:1 as text on the background and cards, as well as behind `--destructive-foreground`. In dark mode it is a lighter red with dark text on it: Portfolio `hsl(0 84.2% 59%)` with `hsl(0 0% 9%)`, Epoch `#cb6e6e` with `#171d19`.
