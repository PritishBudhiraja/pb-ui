import { Badge } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "badge",
  name: "Badge",
  when: "Status pill.",
  title: "Badge",
  kicker: "Data",
  description: "Compact status chip.",
  preview: (
    <Preview code={`<Badge>New</Badge>`}>
      <Badge>New</Badge>
      <Badge variant="outline">Outline</Badge>
    </Preview>
  ),
  a11y: "A span. Do not rely on color alone.",
  props: [
    { name: "variant", type: "default | secondary | outline | destructive", description: "Tone" },
  ],
}
