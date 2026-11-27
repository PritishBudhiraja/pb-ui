import { LoadingButton } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "loading-button",
  name: "LoadingButton",
  when: "Submit in flight.",
  sibling: "Button plus Spinner if you need a custom layout.",
  title: "LoadingButton",
  kicker: "Feedback",
  description: "Button that disables and shows a spinner while loading.",
  preview: (
    <Preview code={`<LoadingButton loading>Save</LoadingButton>`}>
      <LoadingButton loading>Save</LoadingButton>
    </Preview>
  ),
  a11y: "aria-busy when loading. Disabled while loading.",
  props: [{ name: "loading", type: "boolean", defaultValue: "false", description: "Busy state" }],
}
