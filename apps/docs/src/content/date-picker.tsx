import { DatePicker } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "date-picker",
  name: "DatePicker",
  when: "Pick a calendar day.",
  title: "DatePicker",
  kicker: "Form",
  description: "Popover calendar on Hatch tokens. Value is an ISO date string. No DayPicker.",
  preview: (
    <Preview code={`<DatePicker defaultValue="2026-11-26" />`} className="min-h-96 items-start">
      <DatePicker className="w-56" defaultValue="2026-11-26" aria-label="Date" />
    </Preview>
  ),
  a11y: "Trigger is a button. Grid is buttons. Arrow through the month with the header controls. Provide aria-label or a Label.",
  props: [
    { name: "value", type: "string", description: "ISO date YYYY-MM-DD" },
    {
      name: "locale",
      type: "string",
      description: "Formats the date, month and weekdays. Pass it when server rendering",
    },
    {
      name: "weekStartsOn",
      type: "0–6",
      description: "First day of the week. Default 0 (Sunday)",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Empty string clears",
    },
    { name: "min / max", type: "string", description: "Inclusive ISO bounds" },
  ],
}
