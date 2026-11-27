import { StreamingText } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "streaming-text",
  name: "StreamingText",
  when: "Append-only model output.",
  title: "StreamingText",
  kicker: "Content",
  description: "Presentational stream. Host feeds chunks.",
  preview: (
    <Preview code={`<StreamingText text="Hello" streaming />`}>
      <StreamingText text="Hello from the model" streaming />
    </Preview>
  ),
  a11y: "aria-live polite.",
  props: [{ name: "streaming", type: "boolean", description: "Caret" }],
}
