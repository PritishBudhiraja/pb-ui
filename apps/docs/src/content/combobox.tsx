import { Combobox } from "@pritish.budhiraja/ui"
import { useState } from "react"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

function ComboPreview() {
  const [value, setValue] = useState("one")
  return (
    <Preview code={`<Combobox items={…} value={value} onValueChange={setValue} />`}>
      <div className="w-56">
        <Combobox
          items={[
            { value: "one", label: "One" },
            { value: "two", label: "Two" },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </div>
    </Preview>
  )
}

export const doc: ComponentDoc = {
  slug: "combobox",
  name: "Combobox",
  when: "Filterable list.",
  title: "Combobox",
  kicker: "Form",
  description: "Filterable list in a popover, built on cmdk inside the existing Popover.",
  preview: <ComboPreview />,
  a11y: "Trigger reports aria-expanded. The search input is a labelled combobox that controls a listbox; arrow keys move between options and Enter selects. The chosen option has aria-checked.",
  props: [
    { name: "items", type: "ComboboxItem[]", description: "Options" },
    { name: "value", type: "string", description: "Controlled value" },
    { name: "defaultValue", type: "string", description: "Uncontrolled initial value" },
    { name: "disabled", type: "boolean", description: "Disables the trigger" },
  ],
}
