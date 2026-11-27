import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "tabs",
  name: "Tabs",
  when: "In-page panels.",
  title: "Tabs",
  kicker: "Navigation",
  description: "In-page panels.",
  preview: (
    <Preview code={`<Tabs defaultValue="one">…</Tabs>`}>
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First</TabsContent>
        <TabsContent value="two">Second</TabsContent>
      </Tabs>
    </Preview>
  ),
  a11y: "Arrow keys on the tab list. Panels are labelled by their trigger.",
  props: [{ name: "defaultValue", type: "string", description: "Initial tab" }],
}
