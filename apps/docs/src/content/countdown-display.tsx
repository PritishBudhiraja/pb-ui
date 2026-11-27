import { CountdownDisplay } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "countdown-display",
  name: "CountdownDisplay",
  when: "Host-owned remaining seconds.",
  title: "CountdownDisplay",
  kicker: "Viz",
  description: "Host clocks remainingSeconds. Hatch only formats.",
  preview: (
    <Preview code={`<CountdownDisplay remainingSeconds={1500} />`}>
      <CountdownDisplay remainingSeconds={1500} />
    </Preview>
  ),
  a11y: "role=timer.",
  props: [{ name: "remainingSeconds", type: "number", description: "Host-owned remaining time" }],
}
