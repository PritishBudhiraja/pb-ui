---

## "@pritish.budhiraja/ui": minor

FormField now connects its label, hint and error to the control: Input, Textarea, SelectTrigger, Combobox, DatePicker and TimePicker receive the field's id, `aria-describedby` and `aria-invalid`. A new `useFormFieldControl` hook lets custom controls do the same.

Combobox is rebuilt on cmdk: the search input is a combobox that controls a listbox of options, with arrow-key navigation. The trigger no longer has `role="combobox"`. Combobox also gains `defaultValue`, `disabled`, `id` and `aria-label`.
