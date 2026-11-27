import { TimeRangePicker } from "@pritish.budhiraja/ui"
import { Preview } from "../ui/preview"
import type { ComponentDoc } from "./types"

export const doc: ComponentDoc = {
  slug: "time-range-picker",
  name: "TimeRangePicker",
  when: "Start and end HH:mm.",
  title: "TimeRangePicker",
  kicker: "Form",
  description: "Start and end HH:mm. Warns when end is not after start.",
  preview: (
    <Preview code={`<TimeRangePicker defaultValue={{ start: "09:00", end: "11:00" }} />`}>
      <TimeRangePicker defaultValue={{ start: "09:00", end: "11:00" }} />
    </Preview>
  ),
  a11y: "Two TimePickers. Error text when inverted.",
  props: [{ name: "value", type: "{ start: string; end: string }", description: "HH:mm" }],
}
