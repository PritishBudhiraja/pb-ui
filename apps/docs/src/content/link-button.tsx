import { LinkButton } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "link-button",
  name: "LinkButton",
  when: "Looks like a text link, behaves like a button or asChild link.",
  sibling: "Button outline for bordered actions.",
  title: "LinkButton",
  kicker: "Primitive",
  description: "Button styles on an anchor. Prefer this over inventing a second button.",
  preview: (
    <Preview code={`<LinkButton href="#install">Install</LinkButton>`}>
      <LinkButton href="#install">Install</LinkButton>
    </Preview>
  ),
  a11y: "Renders <a>. Do not nest buttons.",
  props: [{ name: "href", type: "string", description: "Required URL" }],
}
