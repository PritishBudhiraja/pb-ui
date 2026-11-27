import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "accordion",
  name: "Accordion",
  when: "Collapsible sections.",
  title: "Accordion",
  kicker: "Navigation",
  description: "Stacked disclosure.",
  preview: (
    <Preview code={`<Accordion type="single" collapsible>…</Accordion>`}>
      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>What is this?</AccordionTrigger>
          <AccordionContent>A disclosure region.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Preview>
  ),
  a11y: "Header is a button. Content is a region.",
  props: [{ name: "type", type: "single | multiple", description: "Open policy" }],
}
