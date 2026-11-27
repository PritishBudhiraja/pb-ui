import { Text } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "text",
  name: "Text",
  when: "Body copy with tone.",
  title: "Text",
  kicker: "Typography",
  description: "Paragraph with tone tokens.",
  preview: (
    <Preview code={`<Text tone="muted">Secondary copy</Text>`}>
      <div>
        <Text>Default</Text>
        <Text tone="muted">Muted</Text>
      </div>
    </Preview>
  ),
  code: "",
  a11y: "Renders a p. Do not nest headings inside it.",
  props: [
    {
      name: "tone",
      type: "default | muted | editorial",
      defaultValue: "default",
      description: "Color",
    },
  ],
}
