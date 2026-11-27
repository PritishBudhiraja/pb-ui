import { Slider } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "slider",
  name: "Slider",
  when: "Numeric range.",
  title: "Slider",
  kicker: "Form",
  description: "Radix slider on semantic tokens.",
  preview: (
    <Preview code={`<Slider defaultValue={[40]} aria-label="Volume" />`}>
      <Slider className="w-56" defaultValue={[40]} aria-label="Volume" />
    </Preview>
  ),
  a11y: "Thumb is keyboard reachable. aria-label or aria-labelledby on Slider names the thumb.",
  props: [
    { name: "defaultValue", type: "number[]", description: "Uncontrolled start" },
    { name: "aria-label", type: "string", description: "Accessible name for the thumb" },
    {
      name: "thumbLabels",
      type: "string[]",
      description: "One name per thumb for a range, such as Minimum and Maximum",
    },
  ],
}
