# @pritish.budhiraja/tokens

## 0.1.1

### Patch Changes

- 5f871fc: Fixes from a line-by-line audit:
  
  - `Calendar` names each day by its full date, marks the selected day with `aria-pressed` and today with `aria-current="date"`, and moves between days with the arrow keys (one tab stop, crossing months).
  - `DatePicker` disables "Today" when today is outside `min` / `max`. `DatePicker` and `TimePicker` disable their hidden form input when the picker is disabled.
  - `ProgressBar` fills relative to `max`.
  - `OriginButton` keeps the caller's `onMouseEnter`, `onMouseLeave`, `onFocus` and `onBlur`.
  - `CopyButton` shows "Could not copy" when a copy fails right after a successful one.
  - `CommandPalette` items are keyed by `id`, so two items with the same label are selected one at a time. Its empty message sits outside the listbox.
  - `CalendarHeatmap` accepts days in any order.
  - Toasts sit above dialogs, sheets and the command palette (`z-[300]`, `--pb-z-toast: 300`).
  
  Tokens: `--destructive` meets 4.5:1 as text on the background and cards, as well as behind `--destructive-foreground`. In dark mode it is a lighter red with dark text on it: Portfolio `hsl(0 84.2% 59%)` with `hsl(0 0% 9%)`, Epoch `#cb6e6e` with `#171d19`.
- bae15dd: Fixes:
  
  - `Slider` renders one thumb per value, so ranges like `[20, 80]` work. New `thumbLabels` names each thumb.
  - `Checkbox`, `Switch`, `RadioGroup` and `Slider` join `FormField`: label, hint or error description, and `aria-invalid`. Radio groups and slider thumbs are named with `aria-labelledby`. New `useFormFieldGroup` hook for custom group controls.
  - `toast()` does nothing during server rendering, so one request's toasts cannot leak into another's. Toasts pushed out by the 3-toast limit no longer keep a removal timer.
  - `CommandPalette` takes `shortcut` (default `"k"`, `false` turns it off), and with two palettes on a page one press opens only the first.
  - `useKeyboardShortcut` ignores plain keys typed in inputs, text areas, selects and contenteditable regions. Chords with ⌘ / Ctrl still fire. Set `allowInInputs` to keep the old behaviour.
  - `Combobox` announces "No matches" to screen readers.
  - Types resolve under `moduleResolution: "node"` (`types`, `main` and `typesVersions` added).
  - `CHANGELOG.md` is included in both packages.
  
  Tokens: three colours now meet WCAG AA 4.5:1 for text. Portfolio light `--destructive` goes from 60.2% to 48.3% lightness. Epoch light `--muted-foreground` and `--editorial` go from `#65785b` to `#5c6e53`. Epoch dark `--destructive` changes too; see the audit fixes changeset.
