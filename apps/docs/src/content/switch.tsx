import { Switch } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "switch",
  name: "Switch",
  when: "Immediate on/off, not a form submit.",
  title: "Switch",
  kicker: "Form",
  description:
    "Boolean toggle. Prefer Checkbox for forms that submit on/off fields with visible labels as text.",
  preview: (
    <Preview code={`<Switch />`}>
      <Switch aria-label="Notifications" />
    </Preview>
  ),
  a11y: "Space toggles. Provide aria-label or a Label.",
  props: [{ name: "checked", type: "boolean", description: "Controlled state" }],
}
