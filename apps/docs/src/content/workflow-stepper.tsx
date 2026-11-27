import { WorkflowStepper } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "workflow-stepper",
  name: "WorkflowStepper",
  when: "Named stages.",
  title: "WorkflowStepper",
  kicker: "Status",
  description: "Named stages.",
  preview: (
    <Preview code={`<WorkflowStepper steps={…} current={0} />`}>
      <WorkflowStepper
        current={0}
        steps={[
          { id: "1", label: "Draft" },
          { id: "2", label: "Review" },
        ]}
      />
    </Preview>
  ),
  a11y: "Ordered list. Current has aria-current=step.",
  props: [{ name: "current", type: "number", description: "Zero-based index" }],
}
