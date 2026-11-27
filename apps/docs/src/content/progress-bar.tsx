import { ProgressBar, ProgressRing } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "progress-bar",
  name: "ProgressBar",
  when: "Determinate bar or ring.",
  title: "ProgressBar",
  kicker: "Feedback",
  description: "Determinate bar. ProgressRing is the circular sibling.",
  preview: (
    <Preview code={`<ProgressBar value={40} label="Upload" />\n<ProgressRing value={40} />`}>
      <div className="flex w-full items-center gap-4">
        <ProgressBar className="flex-1" value={40} label="Upload" />
        <ProgressRing value={40} />
      </div>
    </Preview>
  ),
  a11y: "Radix progressbar named by label. Ring has role=img and a percent label.",
  props: [
    { name: "value", type: "number", description: "0–100" },
    { name: "label", type: "string", description: "Accessible name. Default Progress" },
  ],
}
