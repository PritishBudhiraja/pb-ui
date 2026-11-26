---
"@pritish.budhiraja/ui": minor
---

- `Calendar`, `DatePicker` and `TimePicker` render the same markup on the server and while hydrating. Locale-dependent text uses `en-US` until hydration, then the viewer's locale, and "today" is marked only after hydration. A new `locale` prop sets the locale everywhere; pass it when server rendering.
- `Calendar` and `DatePicker` take `weekStartsOn` (default `0`, Sunday). Weekday headers come from the locale, with the full name as a tooltip.
- `TimePicker` shows and selects a minute that isn't on the step (10:07 with 5-minute steps).
- `DropdownMenu` and `ContextMenu` export `Sub`, `SubTrigger`, `SubContent`, `RadioGroup`, `RadioItem` and `Portal`.
- `CopyButton` announces "Copied" again on a repeat copy.
- `Calendar` and `DatePicker` format with the Gregorian calendar, so locales whose default calendar differs (such as `fa-IR`) label the same dates the grid shows.
- `CheckboxItem`, `RadioItem` and `SubTrigger` in both menus work with `asChild`.
