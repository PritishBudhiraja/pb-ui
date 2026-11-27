import { DateRangePicker } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "date-range-picker",
  name: "DateRangePicker",
  when: "Pick from and to ISO dates.",
  title: "DateRangePicker",
  kicker: "Form",
  description: "ISO from/to on the Hatch calendar. No DayPicker.",
  preview: (
    <Preview code={`<DateRangePicker defaultValue={{ from: "2026-11-12", to: "2026-11-16" }} />`}>
      <DateRangePicker className="w-72" defaultValue={{ from: "2026-11-12", to: "2026-11-16" }} />
    </Preview>
  ),
  a11y: "Trigger is a button. Range days are pressed. Provide aria-label.",
  props: [{ name: "value", type: "{ from?: string; to?: string }", description: "ISO dates" }],
}
