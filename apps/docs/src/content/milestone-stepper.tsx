import { MilestoneStepper } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "milestone-stepper",
  name: "MilestoneStepper",
  when: "Numbered stages.",
  title: "MilestoneStepper",
  kicker: "Status",
  description: "Numbered stages. Shares Stepper internals.",
  preview: (
    <Preview code={`<MilestoneStepper steps={…} current={1} />`}>
      <MilestoneStepper
        current={1}
        steps={[
          { id: "1", label: "Start" },
          { id: "2", label: "Ship" },
        ]}
      />
    </Preview>
  ),
  a11y: "Numbered ordered list.",
  props: [{ name: "steps", type: "StepItem[]", description: "Milestones" }],
}
