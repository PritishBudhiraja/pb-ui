import { CopyButton } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "copy-button",
  name: "CopyButton",
  when: "Copy a value with clipboard feedback.",
  keywords: "copy clipboard",
  sibling: "useClipboard when the trigger is custom.",
  title: "CopyButton",
  kicker: "Action",
  description: "Copies a value and announces success. Pass a visible label for the control.",
  preview: (
    <Preview code={`<CopyButton value="hello" label="Copy greeting" />`}>
      <CopyButton value="hello" label="Copy greeting" />
    </Preview>
  ),
  a11y: "Requires label. Live region announces copied or error.",
  props: [
    { name: "value", type: "string", description: "Text to copy" },
    { name: "label", type: "string", description: "Accessible name" },
  ],
}
