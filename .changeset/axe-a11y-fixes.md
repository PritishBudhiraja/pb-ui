---
"@pritish.budhiraja/ui": patch
---

Accessibility fixes found by new axe checks in the test suite:

- `ToastClose` has the accessible name "Close" (it was an unlabelled icon button).
- `Slider` passes `aria-label` / `aria-labelledby` to its thumb, so the control is named.
- `ProgressBar` takes a `label` (default "Progress") for its accessible name.
- The Combobox, DatePicker and TimePicker popovers are named by the component's `aria-label`, or its placeholder.
- The Combobox "no matches" message sits outside the listbox, which may only contain options.
