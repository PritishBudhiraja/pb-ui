import { Badge, Stack } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "stack",
  name: "Stack",
  when: "Vertical or horizontal gap.",
  title: "Stack",
  kicker: "Layout",
  description: "Flex stack. Grid is the responsive sibling.",
  preview: (
    <Preview code={`<Stack gap="sm"><Badge>A</Badge></Stack>`}>
      <Stack direction="row" gap="sm">
        <Badge>A</Badge>
        <Badge variant="outline">B</Badge>
      </Stack>
    </Preview>
  ),
  a11y: "Layout only.",
  props: [
    { name: "direction", type: "row | column", defaultValue: "column", description: "Axis" },
    { name: "gap", type: "sm | md | lg", defaultValue: "md", description: "Spacing" },
  ],
}
