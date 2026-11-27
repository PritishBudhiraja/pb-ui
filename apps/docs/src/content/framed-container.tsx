import { FramedContainer } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "framed-container",
  name: "FramedContainer",
  when: "Page chrome with dashed column gutters.",
  keywords: "framed container dashed column gutters site frame",
  sibling: "Surface for inner cards.",
  title: "FramedContainer",
  kicker: "Signature",
  why: "The page chrome from the portfolio: a dashed column with gutter hairlines. Hosts wrap a route in this instead of inventing a layout.",
  whenNot:
    "Use Surface or Card for inner panels. Do not nest FramedContainer inside another full-page frame.",
  related: [
    { slug: "surface", name: "Surface" },
    { slug: "hatch-divider", name: "HatchDivider" },
  ],
  description: "Dashed column with gutter hairlines. Generalization of SiteFrame.",
  preview: (
    <Preview code={`<FramedContainer>…</FramedContainer>`} className="p-0">
      <div className="h-40 w-full overflow-hidden">
        <FramedContainer className="min-h-0">
          <p className="p-6 text-sm text-muted-foreground">Column + gutters</p>
        </FramedContainer>
      </div>
    </Preview>
  ),
  code: "",
  a11y: "Decorative pseudo-elements are pointer-events none.",
  props: [{ name: "wide", type: "boolean", defaultValue: "false", description: "1120px vs 720px" }],
}
