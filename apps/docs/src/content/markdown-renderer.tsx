import { MarkdownRenderer } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "markdown-renderer",
  name: "MarkdownRenderer",
  when: "Render GFM markdown. No raw HTML. Images off by default.",
  title: "MarkdownRenderer",
  kicker: "Content",
  description:
    "react-markdown plus GFM tables and strikethrough. No raw HTML. Images are omitted unless allowImages is set, and then only https URLs render.",
  preview: (
    <Preview code={`<MarkdownRenderer markdown="# Note" />`}>
      <MarkdownRenderer markdown={"## Note\n\nEditorial markdown."} />
    </Preview>
  ),
  a11y: "Semantic headings and lists.",
  props: [
    { name: "markdown", type: "string", description: "Source" },
    { name: "allowImages", type: "boolean", description: "Default false; https only" },
  ],
}
