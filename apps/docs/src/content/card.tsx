import { Card, CardContent, CardHeader, CardTitle } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "card",
  name: "Card",
  when: "Structured panel with header.",
  title: "Card",
  kicker: "Data",
  description: "Solid panel. Surface stays the dashed portfolio chrome.",
  preview: (
    <Preview code={`<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>`}>
      <Card className="w-64">
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    </Preview>
  ),
  a11y: "A div. Put a heading in CardTitle.",
  props: [{ name: "className", type: "string", description: "Layout" }],
}
