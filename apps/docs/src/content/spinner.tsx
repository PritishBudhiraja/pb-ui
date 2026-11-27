import { Spinner } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "spinner",
  name: "Spinner",
  when: "Indeterminate wait.",
  title: "Spinner",
  kicker: "Feedback",
  description: "Indeterminate wait.",
  preview: (
    <Preview code={`<Spinner />`}>
      <Spinner />
    </Preview>
  ),
  a11y: "role=status with a visually hidden label.",
  props: [{ name: "label", type: "string", defaultValue: "Loading", description: "sr-only text" }],
}
