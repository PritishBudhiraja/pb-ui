import { Label } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "label",
  name: "Label",
  when: "Associate text with a control via htmlFor.",
  title: "Label",
  kicker: "Form",
  description: "Radix label primitive.",
  preview: (
    <Preview code={`<Label htmlFor="name">Name</Label>`}>
      <Label>Name</Label>
    </Preview>
  ),
  code: "",
  a11y: "Clicking the label focuses the associated control.",
  props: [{ name: "htmlFor", type: "string", description: "Control id" }],
}
