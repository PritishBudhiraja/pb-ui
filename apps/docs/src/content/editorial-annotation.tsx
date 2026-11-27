import { EditorialAnnotation } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "editorial-annotation",
  name: "EditorialAnnotation",
  when: "Handwritten margin note or aside.",
  keywords: "editorial annotation handwritten margin note",
  sibling: "Alert for operational messages.",
  title: "EditorialAnnotation",
  kicker: "Signature",
  why: "Handwritten asides are part of the voice. They sit in the margin on wide screens so the column stays clean.",
  whenNot:
    "Not an Alert, toast, or error. Operational messages use Alert. Parent must be relative.",
  related: [{ slug: "alert", name: "Alert" }],
  description: "Handwritten margin note. Visible from the xl breakpoint. Parent must be relative.",
  preview: (
    <Preview
      code={`<div className="relative"><EditorialAnnotation>shipped</EditorialAnnotation></div>`}
    >
      <div className="relative w-full py-8">
        <EditorialAnnotation className="xl:static xl:translate-x-0">
          shipped in the open
        </EditorialAnnotation>
      </div>
    </Preview>
  ),
  code: "",
  a11y: "aria-hidden. Do not put unique information only in the annotation.",
  props: [
    { name: "side", type: "left | right", defaultValue: "right", description: "Which margin" },
    { name: "rotate", type: "number", defaultValue: "-8", description: "Degrees" },
  ],
}
