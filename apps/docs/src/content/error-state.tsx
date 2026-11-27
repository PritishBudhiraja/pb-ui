import { ErrorState } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "error-state",
  name: "ErrorState",
  when: "Failed load with retry.",
  title: "ErrorState",
  kicker: "Feedback",
  description: "Failed-fetch panel. EmptyState stays for first-run.",
  preview: (
    <Preview code={`<ErrorState title="Could not load" />`}>
      <ErrorState className="w-full" title="Could not load" description="Try again in a moment." />
    </Preview>
  ),
  a11y: "role=alert.",
  props: [{ name: "title", type: "string", description: "Primary line" }],
}
