import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

function SelectPreview() {
  return (
    <Preview
      code={`<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>…</SelectContent></Select>`}
    >
      <Select>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
        </SelectContent>
      </Select>
    </Preview>
  )
}

export const doc: ComponentDoc = {
  slug: "select",
  name: "Select",
  when: "One of a known list.",
  sibling: "Combobox when the list is long or searchable.",
  title: "Select",
  kicker: "Form",
  description: "Radix select. Use Combobox when the list should be filterable.",
  preview: <SelectPreview />,
  a11y: "Trigger is a button. Options are a listbox. Keyboard arrows and typeahead are Radix defaults.",
  props: [{ name: "value", type: "string", description: "Controlled value" }],
}
