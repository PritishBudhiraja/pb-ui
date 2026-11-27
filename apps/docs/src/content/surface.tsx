import { Surface } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "surface",
  name: "Surface",
  when: "Dashed inner panel.",
  keywords: "surface dashed card",
  sibling: "Card when you need header/title/footer structure.",
  title: "Surface",
  kicker: "Primitive",
  why: "Dashed inner panel from the portfolio chrome. Smaller than FramedContainer, simpler than Card.",
  whenNot:
    "Use Card when you need header, title, and footer slots. Use FramedContainer for the page.",
  related: [
    { slug: "card", name: "Card" },
    { slug: "framed-container", name: "FramedContainer" },
  ],
  description: "Dashed card from the portfolio chrome.",
  preview: (
    <Preview code={`<Surface className="p-4">Content</Surface>`}>
      <Surface className="p-4">Dashed surface</Surface>
    </Preview>
  ),
  code: "",
  a11y: "A div. Put a heading inside when it is a region.",
  props: [
    {
      name: "dashed",
      type: "boolean",
      defaultValue: "true",
      description: "Dashed vs solid border",
    },
  ],
}
