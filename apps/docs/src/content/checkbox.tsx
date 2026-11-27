import { Checkbox, Label } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "checkbox",
  name: "Checkbox",
  when: "Boolean or multi-select.",
  title: "Checkbox",
  kicker: "Form",
  description: "Radix checkbox with a check indicator.",
  preview: (
    <Preview code={`<Checkbox id="x" /><Label htmlFor="x">Subscribe</Label>`}>
      <div className="flex items-center gap-2">
        <Checkbox id="docs-check" />
        <Label htmlFor="docs-check">Subscribe</Label>
      </div>
    </Preview>
  ),
  code: "",
  a11y: "Space toggles. Disabled uses opacity and not-allowed cursor.",
  props: [{ name: "checked", type: "boolean", description: "Controlled checked state" }],
}
