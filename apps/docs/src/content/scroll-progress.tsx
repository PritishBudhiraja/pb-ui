import { Text } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "scroll-progress",
  name: "ScrollProgress",
  when: "Reading progress on long articles.",
  keywords: "scroll progress reading bar",
  sibling: "Import from @pritish.budhiraja/ui/motion.",
  title: "ScrollProgress",
  kicker: "Signature",
  why: "A thin reading bar for long documents. Optional — this docs layout does not mount it globally so it does not fight the header.",
  whenNot: "Import from the motion entry. Skip it on short marketing pages.",
  related: [{ slug: "origin-button", name: "OriginButton" }],
  description:
    "Fixed 3px bar. Import from motion. Optional on long article pages — this docs layout does not mount it globally so it does not fight the header.",
  preview: (
    <Preview code={`import { ScrollProgress } from "@pritish.budhiraja/ui/motion"`}>
      <Text tone="muted">Mount once in the host app shell.</Text>
    </Preview>
  ),
  code: "",
  a11y: "aria-hidden. Reduced motion keeps the bar fully scaled.",
  props: [{ name: "className", type: "string", description: "Position overrides" }],
}
