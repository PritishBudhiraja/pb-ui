import { HatchDivider } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "hatch-divider",
  name: "HatchDivider",
  when: "Section rule between editorial blocks.",
  sibling: "Separator for tight UI lists.",
  title: "HatchDivider",
  kicker: "Signature",
  why: "The hatched section rule is the visual beat between editorial blocks. It is not a generic hr.",
  whenNot:
    "Use Separator inside dense chrome (menus, toolbars). HatchDivider is for page sections.",
  related: [{ slug: "separator", name: "Separator" }],
  description: "The hatched section rule from the portfolio.",
  preview: (
    <Preview code={`<HatchDivider />`}>
      <div className="w-full">
        <HatchDivider />
      </div>
    </Preview>
  ),
  code: "",
  a11y: "aria-hidden. Do not use it as the only heading separator without a real heading.",
  props: [{ name: "className", type: "string", description: "Optional layout classes" }],
}
