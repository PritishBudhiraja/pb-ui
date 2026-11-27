import { DurationPicker } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "duration-picker",
  name: "DurationPicker",
  when: "Hours and minutes as total minutes.",
  title: "DurationPicker",
  kicker: "Form",
  description: "Hours and minutes. Value is total minutes.",
  preview: (
    <Preview code={`<DurationPicker defaultValue={90} />`}>
      <DurationPicker defaultValue={90} />
    </Preview>
  ),
  a11y: "Two labelled selects in a group.",
  props: [{ name: "value", type: "number", description: "Total minutes" }],
}
