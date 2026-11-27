import { DescriptionDetail, DescriptionList, DescriptionTerm } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "description-list",
  name: "DescriptionList",
  when: "Term/detail pairs.",
  title: "DescriptionList",
  kicker: "Data",
  description: "dl / dt / dd.",
  preview: (
    <Preview code={`<DescriptionList><DescriptionTerm>Theme</DescriptionTerm>…</DescriptionList>`}>
      <DescriptionList className="w-full">
        <DescriptionTerm>Theme</DescriptionTerm>
        <DescriptionDetail>portfolio</DescriptionDetail>
      </DescriptionList>
    </Preview>
  ),
  a11y: "Native description list.",
  props: [{ name: "children", type: "ReactNode", description: "Terms and details" }],
}
