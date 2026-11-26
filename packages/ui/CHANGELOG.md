# @pritish.budhiraja/ui

## 0.3.0

### Minor Changes

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
- Updated dependencies [5f871fc]
- Updated dependencies [bae15dd]
  - @pritish.budhiraja/tokens@0.1.1

## 0.2.0

### Minor Changes

- b7b60d2: CopyButton no longer shows a toast by itself. It announces "Copied" or "Could not copy" in a visually hidden `role="status"` region, so it works without a `<Toaster>`. To keep a toast, pass `onCopied` / `onCopyError` and call `toast()` there. New props: `copiedText`, `errorText` and `aria-label` (all text is now replaceable), plus the exported `CopyButtonProps` type.
- 4309c73: DataTable gains sortable columns (`sortValue` per column, `sort` / `defaultSort` / `onSortChange`, `manualSort` for server-side sorting), an empty state (`emptyText`) and loading placeholder rows (`loading`, `loadingRows`). Sortable headers are buttons, and the header cell carries `aria-sort`. New exported types: `DataTableProps`, `DataTableSort`, `DataTableSortDirection`.
  
  Components no longer use `forwardRef`; `ref` is a regular prop (React 19), and the `displayName` assignments are gone. `useMediaQuery` now uses `useSyncExternalStore` and returns `false` during server rendering and hydration. `useReducedMotion` is built on it.
- 292338d: FormField now connects its label, hint and error to the control: Input, Textarea, SelectTrigger, Combobox, DatePicker and TimePicker receive the field's id, `aria-describedby` and `aria-invalid`. A new `useFormFieldControl` hook lets custom controls do the same.
  
  Combobox is rebuilt on cmdk: the search input is a combobox that controls a listbox of options, with arrow-key navigation. The trigger no longer has `role="combobox"`. Combobox also gains `defaultValue`, `disabled`, `id` and `aria-label`.
- b5ba088: Add `@pritish.budhiraja/ui/tailwind.css` for apps that already use Tailwind CSS v4. Import it from your stylesheet after `@import "tailwindcss"`. Your Tailwind build then generates the library's classes, so preflight and the theme are included once instead of twice. `styles.css` is unchanged for apps without Tailwind. `tw-animate-css` moved to dependencies, and `tailwindcss` ^4 is an optional peer dependency.
- c3cbdd9: ThemeToggle is built on `IconButton` (ghost variant, 32px), so its focus ring, hover and disabled styles match the rest of the library. It no longer has its own muted background. `theme="system"` now follows the OS preference instead of counting as light, and a new `resolvedTheme` prop (as returned by next-themes) takes priority when given. The accessible name can be changed with `label`.

### Patch Changes

- c523d3b: Accessibility fixes found by new axe checks in the test suite:
  
  - `ToastClose` has the accessible name "Close" (it was an unlabelled icon button).
  - `Slider` passes `aria-label` / `aria-labelledby` to its thumb, so the control is named.
  - `ProgressBar` takes a `label` (default "Progress") for its accessible name.
  - The Combobox, DatePicker and TimePicker popovers are named by the component's `aria-label`, or its placeholder.
  - The Combobox "no matches" message sits outside the listbox, which may only contain options.
- fa89ac9: CommandPalette opens when only `onOpenChange` is passed. It used `onOpenChange` as the setter whenever it was given, so without `open` the palette never opened; it now uses `useControlledState` and calls `onOpenChange` on every change.
- 8576d5e: `useKeyboardShortcut` no longer removes and re-adds its `keydown` listener on every render when the handler is an inline function. It keeps the latest handler in a ref, so the listener only changes when the key combo or `enabled` changes.
- e90089d: Keep `"use client"` in the published build. The library now ships one file per module, and every module that uses hooks, context or event handlers starts with the directive, so it can be imported from React Server Components (for example, a Next.js App Router page). Server-safe components such as `Button` and `Card` stay directive-free.
- 94317dd: The toast `reducer` is now pure. Scheduling the removal timer moved out of the `DISMISS_TOAST` case into the dismiss functions (`toast().dismiss` and `useToast().dismiss`), so calling `reducer` directly no longer starts timers. Dismiss behaviour is unchanged.
