import { IconButton } from "@pritish.budhiraja/ui"
import { Search } from "lucide-react"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "icon-button",
  name: "IconButton",
  when: "Icon-only control. Requires a label.",
  keywords: "icon button aria-label",
  sibling: "Button when the action has visible text.",
  title: "IconButton",
  kicker: "Primitive",
  description: "Button size=icon with a required accessible name.",
  preview: (
    <Preview code={`<IconButton label="Search"><Search /></IconButton>`}>
      <IconButton label="Search">
        <Search />
      </IconButton>
    </Preview>
  ),
  code: "",
  a11y: "label is required and becomes aria-label.",
  props: [{ name: "label", type: "string", description: "Accessible name" }],
}
