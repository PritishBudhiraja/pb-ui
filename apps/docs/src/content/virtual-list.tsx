import { VirtualList } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "virtual-list",
  name: "VirtualList",
  when: "Long lists without mounting every row.",
  title: "VirtualList",
  kicker: "Utility",
  description: "TanStack Virtual. Host renders each row.",
  preview: (
    <Preview code={`<VirtualList items={…} renderItem={…} />`}>
      <VirtualList
        className="w-full"
        height={160}
        items={["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]}
        renderItem={(item) => <p className="px-2 py-1.5 text-sm">{item}</p>}
      />
    </Preview>
  ),
  a11y: "role=list / listitem.",
  props: [{ name: "renderItem", type: "(item, index) => ReactNode", description: "Row" }],
}
