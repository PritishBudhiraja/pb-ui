import { Textarea } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "textarea",
  name: "Textarea",
  when: "Multiline notes.",
  keywords: "textarea note form",
  title: "Textarea",
  kicker: "Form",
  description: "Native textarea, min-height 6rem.",
  preview: (
    <Preview code={`<Textarea placeholder="Note" />`}>
      <Textarea className="w-72" placeholder="Optional note" />
    </Preview>
  ),
  code: "",
  a11y: "Pair with Label. Resize is native.",
  props: [
    {
      name: "...",
      type: "TextareaHTMLAttributes",
      description: "All native textarea attributes",
    },
  ],
}
