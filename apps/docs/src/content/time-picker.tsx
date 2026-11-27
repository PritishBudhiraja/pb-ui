import { TimePicker } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "time-picker",
  name: "TimePicker",
  when: "Pick a clock time.",
  title: "TimePicker",
  kicker: "Form",
  description: "Popover hours and minutes on Hatch tokens. Value is HH:mm. No native time picker.",
  preview: (
    <Preview code={`<TimePicker defaultValue="09:30" />`} className="min-h-96 items-start">
      <TimePicker className="w-56" defaultValue="09:30" aria-label="Time" />
    </Preview>
  ),
  a11y: "Trigger is a button. Hour, minute, and period are listboxes. Choosing a minute commits. Provide a Label or aria-label.",
  props: [
    { name: "value", type: "string", description: "HH:mm" },
    { name: "locale", type: "string", description: "Formats the shown time" },
    {
      name: "minuteStep",
      type: "1 | 5 | 10 | 15",
      defaultValue: "5",
      description: "Minute interval",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Empty string clears",
    },
  ],
}
