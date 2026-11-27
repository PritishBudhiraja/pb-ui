import { SplitWorkspace } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "resizable-panel",
  name: "ResizablePanel",
  when: "A pane inside SplitWorkspace.",
  title: "ResizablePanel",
  kicker: "Layout",
  description: "Pane inside SplitPane / SplitWorkspace.",
  preview: (
    <Preview code={`<SplitWorkspace main={…} />`}>
      <SplitWorkspace className="h-32" main={<p className="p-2 text-sm">Only</p>} />
    </Preview>
  ),
  a11y: "Use with Group separators.",
  props: [
    { name: "defaultSize", type: "string | number", description: "Percent string or pixels" },
  ],
}
