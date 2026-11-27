import { EmptyState } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "empty-state",
  name: "EmptyState",
  when: "First-run or no results.",
  title: "EmptyState",
  kicker: "Feedback",
  description: "Dashed first-run panel.",
  preview: (
    <Preview code={`<EmptyState title="Nothing here" description="Add a record." />`}>
      <EmptyState
        className="w-full"
        title="Nothing here yet"
        description="Use this on first-run screens."
      />
    </Preview>
  ),
  code: "",
  a11y: "Plain text. Pass actions that are real buttons.",
  props: [
    { name: "title", type: "string", description: "Primary line" },
    { name: "action", type: "ReactNode", description: "Optional CTA" },
  ],
}
