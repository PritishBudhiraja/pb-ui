import {
  ActivityTimeline,
  AIExecutionStatus,
  Button,
  CodeBlock,
  CountdownDisplay,
  DateRangePicker,
  DurationPicker,
  FileDropzone,
  InspectorPanel,
  MarkdownRenderer,
  MilestoneStepper,
  RichTextEditor,
  Sidebar,
  SidebarItem,
  SortableList,
  SplitWorkspace,
  StreamingText,
  TimeAllocationBar,
  TimeRangePicker,
  VirtualList,
  WeekCalendar,
  WeeklyActivityGrid,
  WorkflowStepper,
} from "@pritish.budhiraja/ui"
import { AreaChart, DonutChart, StackedBarChart } from "@pritish.budhiraja/ui/charts"
import { useState } from "react"
import { Preview } from "../ui/preview"
import type { ExtraDoc } from "./extra-docs"

const EVENTS = [{ id: "1", start: "2026-11-23T09:00", end: "2026-11-23T10:00", label: "Focus" }]
const CHART = [
  { name: "Mon", deep: 2, shallow: 1, value: 3 },
  { name: "Tue", deep: 1, shallow: 2, value: 3 },
  { name: "Wed", deep: 3, shallow: 1, value: 4 },
]

function CollapsedSidebarPreview() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Preview code={`<Sidebar collapsed={collapsed}>…</Sidebar>`}>
      <div className="flex w-full items-start gap-3">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setCollapsed((value) => !value)}
        >
          {collapsed ? "Expand" : "Collapse"}
        </Button>
        <Sidebar collapsed={collapsed}>
          <SidebarItem current>{collapsed ? "In" : "Inbox"}</SidebarItem>
          <SidebarItem>{collapsed ? "Set" : "Settings"}</SidebarItem>
        </Sidebar>
      </div>
    </Preview>
  )
}

export const EXPANSION_DOCS: Record<string, ExtraDoc> = {
  "date-range-picker": {
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
  },
  "duration-picker": {
    title: "DurationPicker",
    kicker: "Form",
    description: "Hours and minutes. Value is total minutes.",
    preview: (
      <Preview code={`<DurationPicker defaultValue={90} />`}>
        <DurationPicker defaultValue={90} />
      </Preview>
    ),
    a11y: "Two labelled selects in a group.",
    props: [{ name: "value", type: "number", description: "Total minutes" }],
  },
  "time-range-picker": {
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
  },
  "week-calendar": {
    title: "WeekCalendar",
    kicker: "Schedule",
    description:
      "Week columns × hour rows. Civil YYYY-MM-DDTHH:mm only. Overlaps pack into columns; events clip to visible hours and split across midnight. Host owns timezone and persistence.",
    preview: (
      <Preview code={`<WeekCalendar weekStart="2026-11-22" events={…} />`}>
        <WeekCalendar weekStart="2026-11-22" events={EVENTS} className="w-full" />
      </Preview>
    ),
    a11y: "Events and optional empty slots are buttons. Arrow keys move, Shift+Arrow resizes when onEventChange is set.",
    related: [
      { slug: "time-grid", name: "TimeGrid" },
      { slug: "calendar-event", name: "CalendarEvent" },
    ],
    props: [
      { name: "events", type: "CalendarEventData[]", description: "Slots in the week" },
      { name: "onSlotSelect", type: "(slot) => void", description: "Empty hour cell" },
      {
        name: "onEventChange",
        type: "(id, next) => void",
        description: "Move or resize; host saves",
      },
    ],
  },
  "time-grid": {
    title: "TimeGrid",
    kicker: "Schedule",
    description: "Same grid as WeekCalendar. Use either name.",
    preview: (
      <Preview code={`<WeekCalendar weekStart="2026-11-22" />`}>
        <WeekCalendar weekStart="2026-11-22" events={EVENTS} />
      </Preview>
    ),
    a11y: "Same as WeekCalendar.",
    props: [{ name: "weekStart", type: "string", description: "ISO date in the week" }],
  },
  "calendar-event": {
    title: "CalendarEvent",
    kicker: "Schedule",
    description: "Event chip used inside TimeGrid.",
    preview: (
      <Preview code={`<WeekCalendar … />`}>
        <WeekCalendar weekStart="2026-11-22" events={EVENTS} />
      </Preview>
    ),
    a11y: "Button.",
    props: [{ name: "label", type: "string", description: "Visible title" }],
  },
  "sortable-list": {
    title: "SortableList",
    kicker: "List",
    description: "Drag and keyboard reorder. Up/down buttons always work.",
    preview: (
      <Preview code={`<SortableList defaultItems={[{ id: "a", label: "Alpha" }]} />`}>
        <SortableList
          className="w-72"
          defaultItems={[
            { id: "a", label: "Alpha" },
            { id: "b", label: "Beta" },
          ]}
        />
      </Preview>
    ),
    a11y: "Move up/down buttons. Drag handle is labelled.",
    props: [{ name: "onReorder", type: "(items) => void", description: "New order" }],
  },
  "split-workspace": {
    title: "SplitWorkspace",
    kicker: "Layout",
    description: "Nav | main | inspector with resizable panes.",
    preview: (
      <Preview code={`<SplitWorkspace nav={…} main={…} inspector={…} />`}>
        <SplitWorkspace
          className="h-48 border border-dashed border-border"
          nav={<p className="p-2 text-sm">Nav</p>}
          main={<p className="p-2 text-sm">Main</p>}
          inspector={<InspectorPanel title="Detail">Meta</InspectorPanel>}
        />
      </Preview>
    ),
    a11y: "Separators are keyboard-resizable.",
    related: [
      { slug: "resizable-panel", name: "ResizablePanel" },
      { slug: "inspector-panel", name: "InspectorPanel" },
    ],
    props: [{ name: "main", type: "ReactNode", description: "Center pane" }],
  },
  "resizable-panel": {
    title: "ResizablePanel",
    kicker: "Layout",
    description: "Pane inside SplitPane / SplitWorkspace.",
    preview: (
      <Preview code={`<SplitWorkspace main={…} />`}>
        <SplitWorkspace className="h-32" main={<p className="p-2 text-sm">Only</p>} />
      </Preview>
    ),
    a11y: "Use with Group separators.",
    props: [
      { name: "defaultSize", type: "string | number", description: "Percent string or pixels" },
    ],
  },
  "collapsible-sidebar": {
    title: "CollapsibleSidebar",
    kicker: "Navigation",
    description: "Sidebar with collapsed. Alias of Sidebar.",
    preview: <CollapsedSidebarPreview />,
    a11y: "Host should label the toggle.",
    props: [
      { name: "collapsed", type: "boolean", defaultValue: "false", description: "Narrow rail" },
    ],
  },
  "inspector-panel": {
    title: "InspectorPanel",
    kicker: "Layout",
    description: "Titled surface for a third column.",
    preview: (
      <Preview code={`<InspectorPanel title="Detail">…</InspectorPanel>`}>
        <InspectorPanel title="Detail" className="w-56">
          Notes
        </InspectorPanel>
      </Preview>
    ),
    a11y: "Heading names the panel.",
    props: [{ name: "title", type: "string", description: "Heading" }],
  },
  "code-block": {
    title: "CodeBlock",
    kicker: "Content",
    description: "Dashed pre with CopyButton. No toast in the library.",
    preview: (
      <Preview code={`<CodeBlock code="pnpm add @pritish.budhiraja/ui" />`}>
        <CodeBlock className="w-full" code="pnpm add @pritish.budhiraja/ui" />
      </Preview>
    ),
    a11y: "Copy control is labelled.",
    props: [{ name: "code", type: "string", description: "Plain text" }],
  },
  "markdown-renderer": {
    title: "MarkdownRenderer",
    kicker: "Content",
    description:
      "react-markdown plus GFM tables and strikethrough. No raw HTML. Images are omitted unless allowImages is set, and then only https URLs render.",
    preview: (
      <Preview code={`<MarkdownRenderer markdown="# Note" />`}>
        <MarkdownRenderer markdown={"## Note\n\nEditorial markdown."} />
      </Preview>
    ),
    a11y: "Semantic headings and lists.",
    props: [
      { name: "markdown", type: "string", description: "Source" },
      { name: "allowImages", type: "boolean", description: "Default false; https only" },
    ],
  },
  "streaming-text": {
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
  },
  "rich-text-editor": {
    title: "RichTextEditor",
    kicker: "Content",
    description:
      'TipTap StarterKit. HTML in and out. Clearing value to "" empties the document. placeholder is shown while empty. No journal schema.',
    preview: (
      <Preview code={`<RichTextEditor value="<p>Hello</p>" />`}>
        <RichTextEditor className="w-full" value="<p>Hello from Hatch.</p>" />
      </Preview>
    ),
    a11y: "Toolbar buttons plus labelled editor. Toolbar is disabled when editable is false.",
    props: [
      { name: "value", type: "string", description: "HTML" },
      { name: "placeholder", type: "string", description: "Shown when empty" },
      { name: "editable", type: "boolean", description: "Default true" },
    ],
  },
  "ai-execution-status": {
    title: "AIExecutionStatus",
    kicker: "Status",
    description: "Stage list. Host owns the machine.",
    preview: (
      <Preview code={`<AIExecutionStatus steps={…} />`}>
        <AIExecutionStatus
          steps={[
            { id: "1", label: "Plan", status: "done" },
            { id: "2", label: "Run", status: "running" },
          ]}
        />
      </Preview>
    ),
    a11y: "List of stages with status text.",
    props: [{ name: "steps", type: "ExecutionStep[]", description: "pending/running/done/error" }],
  },
  "workflow-stepper": {
    title: "WorkflowStepper",
    kicker: "Status",
    description: "Named stages.",
    preview: (
      <Preview code={`<WorkflowStepper steps={…} current={0} />`}>
        <WorkflowStepper
          current={0}
          steps={[
            { id: "1", label: "Draft" },
            { id: "2", label: "Review" },
          ]}
        />
      </Preview>
    ),
    a11y: "Ordered list. Current has aria-current=step.",
    props: [{ name: "current", type: "number", description: "Zero-based index" }],
  },
  "milestone-stepper": {
    title: "MilestoneStepper",
    kicker: "Status",
    description: "Numbered stages. Shares Stepper internals.",
    preview: (
      <Preview code={`<MilestoneStepper steps={…} current={1} />`}>
        <MilestoneStepper
          current={1}
          steps={[
            { id: "1", label: "Start" },
            { id: "2", label: "Ship" },
          ]}
        />
      </Preview>
    ),
    a11y: "Numbered ordered list.",
    props: [{ name: "steps", type: "StepItem[]", description: "Milestones" }],
  },
  "time-allocation-bar": {
    title: "TimeAllocationBar",
    kicker: "Viz",
    description: "Share of a whole. Semantic grayscale only.",
    preview: (
      <Preview code={`<TimeAllocationBar segments={…} />`}>
        <TimeAllocationBar
          className="w-full"
          segments={[
            { label: "Deep", value: 3 },
            { label: "Shallow", value: 1 },
          ]}
        />
      </Preview>
    ),
    a11y: "role=img plus a text legend.",
    props: [{ name: "segments", type: "{ label, value }[]", description: "Shares" }],
  },
  "weekly-activity-grid": {
    title: "WeeklyActivityGrid",
    kicker: "Viz",
    description: "Hour × day intensity. Not CalendarHeatmap.",
    preview: (
      <Preview code={`<WeeklyActivityGrid cells={…} />`}>
        <WeeklyActivityGrid
          startHour={8}
          endHour={12}
          cells={[
            { day: 1, hour: 9, value: 4 },
            { day: 2, hour: 10, value: 2 },
          ]}
        />
      </Preview>
    ),
    a11y: "Text summary is visually hidden.",
    props: [{ name: "cells", type: "ActivityCell[]", description: "day 0–6, hour, value" }],
  },
  "activity-timeline": {
    title: "ActivityTimeline",
    kicker: "Viz",
    description: "Items onto Timeline.",
    preview: (
      <Preview code={`<ActivityTimeline items={…} />`}>
        <ActivityTimeline items={[{ id: "1", title: "Shipped", meta: "today" }]} />
      </Preview>
    ),
    a11y: "List.",
    props: [{ name: "items", type: "ActivityItem[]", description: "Events" }],
  },
  "countdown-display": {
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
  },
  "stacked-bar-chart": {
    title: "StackedBarChart",
    kicker: "Charts",
    description: "Import from @pritish.budhiraja/ui/charts. Semantic fills.",
    preview: (
      <Preview code={`import { StackedBarChart } from "@pritish.budhiraja/ui/charts"`}>
        <StackedBarChart
          className="h-48"
          data={CHART}
          series={[{ key: "deep" }, { key: "shallow" }]}
        />
      </Preview>
    ),
    a11y: "role=img with a label.",
    props: [{ name: "series", type: "ChartSeries[]", description: "Stacked keys" }],
  },
  "area-chart": {
    title: "AreaChart",
    kicker: "Charts",
    description: "Optional /charts entry.",
    preview: (
      <Preview code={`import { AreaChart } from "@pritish.budhiraja/ui/charts"`}>
        <AreaChart className="h-48" data={CHART} series={[{ key: "value", label: "Hours" }]} />
      </Preview>
    ),
    a11y: "role=img.",
    props: [{ name: "data", type: "ChartDatum[]", description: "Points" }],
  },
  "donut-chart": {
    title: "DonutChart",
    kicker: "Charts",
    description: "Optional /charts entry.",
    preview: (
      <Preview code={`import { DonutChart } from "@pritish.budhiraja/ui/charts"`}>
        <DonutChart className="h-48" data={CHART} />
      </Preview>
    ),
    a11y: "role=img.",
    props: [{ name: "dataKey", type: "string", defaultValue: "value", description: "Numeric key" }],
  },
  "file-dropzone": {
    title: "FileDropzone",
    kicker: "Utility",
    description: "Native drop + file input.",
    preview: (
      <Preview code={`<FileDropzone onFiles={console.log} />`}>
        <FileDropzone onFiles={() => {}} className="w-full" />
      </Preview>
    ),
    a11y: "Hidden file input inside a label.",
    props: [{ name: "onFiles", type: "(files: File[]) => void", description: "Chosen files" }],
  },
  "virtual-list": {
    title: "VirtualList",
    kicker: "Utility",
    description: "TanStack Virtual. Host renders each row.",
    preview: (
      <Preview code={`<VirtualList items={…} renderItem={…} />`}>
        <VirtualList
          className="w-full"
          height={160}
          items={["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"]}
          renderItem={(item) => <p className="px-2 py-1.5 text-sm">{item}</p>}
        />
      </Preview>
    ),
    a11y: "role=list / listitem.",
    props: [{ name: "renderItem", type: "(item, index) => ReactNode", description: "Row" }],
  },
}
