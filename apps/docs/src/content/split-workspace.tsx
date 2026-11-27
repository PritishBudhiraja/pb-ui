import { InspectorPanel, SplitWorkspace } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "split-workspace",
  name: "SplitWorkspace",
  when: "Resizable nav, main, and inspector.",
  title: "SplitWorkspace",
  kicker: "Layout",
  description: "Nav | main | inspector with resizable panes.",
  preview: (
    <Preview code={`<SplitWorkspace nav={…} main={…} inspector={…} />`}>
      <SplitWorkspace
        className="h-48 border border-dashed border-border"
        nav={<p className="p-2 text-sm">Nav</p>}
        main={<p className="p-2 text-sm">Main</p>}
        inspector={<InspectorPanel title="Detail">Meta</InspectorPanel>}
      />
    </Preview>
  ),
  a11y: "Separators are keyboard-resizable.",
  related: [
    { slug: "resizable-panel", name: "ResizablePanel" },
    { slug: "inspector-panel", name: "InspectorPanel" },
  ],
  props: [{ name: "main", type: "ReactNode", description: "Center pane" }],
}
