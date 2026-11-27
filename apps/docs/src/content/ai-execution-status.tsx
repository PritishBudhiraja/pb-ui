import { AIExecutionStatus } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "ai-execution-status",
  name: "AIExecutionStatus",
  when: "Stage list for a run.",
  title: "AIExecutionStatus",
  kicker: "Status",
  description: "Stage list. Host owns the machine.",
  preview: (
    <Preview code={`<AIExecutionStatus steps={…} />`}>
      <AIExecutionStatus
        steps={[
          { id: "1", label: "Plan", status: "done" },
          { id: "2", label: "Run", status: "running" },
        ]}
      />
    </Preview>
  ),
  a11y: "List of stages with status text.",
  props: [{ name: "steps", type: "ExecutionStep[]", description: "pending/running/done/error" }],
}
