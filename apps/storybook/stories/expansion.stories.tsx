import {
  CountdownDisplay,
  DateRangePicker,
  DurationPicker,
  FileDropzone,
  MarkdownRenderer,
  MilestoneStepper,
  SortableList,
  StreamingText,
  TimeAllocationBar,
  WeekCalendar,
} from "@pritish.budhiraja/ui"
import { AreaChart, DonutChart, StackedBarChart } from "@pritish.budhiraja/ui/charts"
import type { Meta, StoryObj } from "@storybook/react"

function ExpansionPreview() {
  const data = [
    { name: "Mon", deep: 2, shallow: 1, value: 3 },
    { name: "Tue", deep: 1, shallow: 2, value: 3 },
  ]
  return (
    <div className="grid max-w-3xl gap-8">
      <DateRangePicker defaultValue={{ from: "2026-11-12", to: "2026-11-16" }} />
      <DurationPicker defaultValue={90} />
      <WeekCalendar
        weekStart="2026-11-22"
        events={[{ id: "1", start: "2026-11-23T09:00", end: "2026-11-23T10:00", label: "Focus" }]}
      />
      <SortableList
        defaultItems={[
          { id: "a", label: "Alpha" },
          { id: "b", label: "Beta" },
        ]}
      />
      <MarkdownRenderer markdown="## Note\n\nHatch markdown." />
      <StreamingText text="Streaming…" streaming />
      <MilestoneStepper
        current={1}
        steps={[
          { id: "1", label: "Start" },
          { id: "2", label: "Ship" },
        ]}
      />
      <TimeAllocationBar
        segments={[
          { label: "Deep", value: 3 },
          { label: "Shallow", value: 1 },
        ]}
      />
      <CountdownDisplay remainingSeconds={1500} />
      <FileDropzone onFiles={() => {}} />
      <StackedBarChart data={data} series={[{ key: "deep" }, { key: "shallow" }]} />
      <AreaChart data={data} series={[{ key: "value" }]} />
      <DonutChart data={data} />
    </div>
  )
}

const meta: Meta<typeof ExpansionPreview> = {
  title: "Catalogue/Expansion",
  component: ExpansionPreview,
}

export default meta
type Story = StoryObj<typeof ExpansionPreview>
export const Default: Story = {}
