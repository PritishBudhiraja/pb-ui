import { RichTextEditor } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "rich-text-editor",
  name: "RichTextEditor",
  when: "HTML editor with Hatch chrome.",
  title: "RichTextEditor",
  kicker: "Content",
  description:
    'TipTap StarterKit. HTML in and out. Clearing value to "" empties the document. placeholder is shown while empty. No journal schema.',
  preview: (
    <Preview code={`<RichTextEditor value="<p>Hello</p>" />`}>
      <RichTextEditor className="w-full" value="<p>Hello from Hatch.</p>" />
    </Preview>
  ),
  a11y: "Toolbar buttons plus labelled editor. Toolbar is disabled when editable is false.",
  props: [
    { name: "value", type: "string", description: "HTML" },
    { name: "placeholder", type: "string", description: "Shown when empty" },
    { name: "editable", type: "boolean", description: "Default true" },
  ],
}
