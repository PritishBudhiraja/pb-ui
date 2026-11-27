import { FormField, SearchInput } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "form-field",
  name: "FormField",
  when: "Label, control, description, and error stacked.",
  title: "FormField",
  kicker: "Form",
  description: "Label, control, hint, and FormError in one stack. Hosts still own validation.",
  preview: (
    <Preview code={`<FormField label="Email" error="Required"><Input /></FormField>`}>
      <FormField className="w-72" label="Email" error="Required">
        <SearchInput />
      </FormField>
    </Preview>
  ),
  a11y: "The label targets the control. Input, Textarea, SelectTrigger, Combobox, DatePicker and TimePicker pick up the field's id, aria-describedby (hint or error) and aria-invalid. Custom controls can join with useFormFieldControl. FormError uses role=alert.",
  props: [
    { name: "htmlFor", type: "string", description: "Control id; generated when omitted" },
    { name: "hint", type: "string", description: "Describes the control when there is no error" },
    {
      name: "error",
      type: "string",
      description: "Shown as an alert; marks the control invalid",
    },
  ],
}
