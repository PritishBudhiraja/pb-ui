import { Separator } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "separator",
  name: "Separator",
  when: "Hairline rule in UI chrome.",
  title: "Separator",
  kicker: "Layout",
  description: "Hairline rule. HatchDivider remains the signature section break.",
  preview: (
    <Preview code={`<Separator />`}>
      <div className="w-full">
        <Separator />
      </div>
    </Preview>
  ),
  a11y: "decorative by default.",
  props: [
    {
      name: "orientation",
      type: "horizontal | vertical",
      defaultValue: "horizontal",
      description: "Axis",
    },
  ],
}
