import { RadioGroup, RadioGroupItem } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "radio-group",
  name: "RadioGroup",
  when: "One of a small set.",
  title: "RadioGroup",
  kicker: "Form",
  description: "One choice from a small set.",
  preview: (
    <Preview code={`<RadioGroup defaultValue="a"><RadioGroupItem value="a" /></RadioGroup>`}>
      <RadioGroup defaultValue="a" className="flex gap-4">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="ra" />
          <label htmlFor="ra">A</label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="rb" />
          <label htmlFor="rb">B</label>
        </div>
      </RadioGroup>
    </Preview>
  ),
  a11y: "Arrow keys move selection. Pair items with labels.",
  props: [{ name: "value", type: "string", description: "Controlled value" }],
}
