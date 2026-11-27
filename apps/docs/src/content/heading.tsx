import { EditorialHeading, Heading } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "heading",
  name: "Heading",
  when: "UI heading. EditorialHeading for serif display.",
  title: "Heading",
  kicker: "Typography",
  description: "Tracking-tight sans headings. EditorialHeading is the serif italic display.",
  preview: (
    <Preview
      code={`<Heading size="lg">Title</Heading>\n<EditorialHeading>Calm.</EditorialHeading>`}
    >
      <div>
        <Heading size="lg">Title</Heading>
        <EditorialHeading>Calm.</EditorialHeading>
      </div>
    </Preview>
  ),
  code: "",
  a11y: "as selects the heading level. Do not skip levels in a page.",
  props: [
    { name: "as", type: "h1–h6", defaultValue: "h2", description: "Element" },
    { name: "size", type: "sm | md | lg | xl", defaultValue: "md", description: "Visual size" },
  ],
}
