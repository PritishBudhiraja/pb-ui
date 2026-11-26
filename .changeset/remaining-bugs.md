---
"@pritish.budhiraja/ui": minor
"@pritish.budhiraja/tokens": patch
---

Fixes:

- `Slider` renders one thumb per value, so ranges like `[20, 80]` work. New `thumbLabels` names each thumb.
- `Checkbox`, `Switch`, `RadioGroup` and `Slider` join `FormField`: label, hint or error description, and `aria-invalid`. Radio groups and slider thumbs are named with `aria-labelledby`. New `useFormFieldGroup` hook for custom group controls.
- `toast()` does nothing during server rendering, so one request's toasts cannot leak into another's. Toasts pushed out by the 3-toast limit no longer keep a removal timer.
- `CommandPalette` takes `shortcut` (default `"k"`, `false` turns it off), and with two palettes on a page one press opens only the first.
- `useKeyboardShortcut` ignores plain keys typed in inputs, text areas, selects and contenteditable regions. Chords with ⌘ / Ctrl still fire. Set `allowInInputs` to keep the old behaviour.
- `Combobox` announces "No matches" to screen readers.
- Types resolve under `moduleResolution: "node"` (`types`, `main` and `typesVersions` added).
- `CHANGELOG.md` is included in both packages.

Tokens: three colours now meet WCAG AA 4.5:1 for text. Portfolio light `--destructive` goes from 60.2% to 48.3% lightness. Epoch light `--muted-foreground` and `--editorial` go from `#65785b` to `#5c6e53`. Epoch dark `--destructive` goes from `#c45c5c` to `#b64242`.
