import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useEditor } from "@tiptap/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

const editor = {
  isActive: (name: string) => name === "bold" || name === "italic" || name === "bulletList",
  getHTML: () => "<p>Hi</p>",
  commands: { setContent: vi.fn() },
  chain: () => ({
    focus: () => ({
      toggleBold: () => ({ run: vi.fn() }),
      toggleItalic: () => ({ run: vi.fn() }),
      toggleBulletList: () => ({ run: vi.fn() }),
    }),
  }),
}

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children?: unknown }) => <div>{children as never}</div>,
  BarChart: ({ children }: { children?: unknown }) => <svg>{children as never}</svg>,
  Bar: () => null,
  AreaChart: ({ children }: { children?: unknown }) => <svg>{children as never}</svg>,
  Area: () => null,
  PieChart: ({ children }: { children?: unknown }) => <svg>{children as never}</svg>,
  Pie: ({ children }: { children?: unknown }) => <g>{children as never}</g>,
  Cell: () => null,
  CartesianGrid: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  Legend: () => null,
}))

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: (options: {
    estimateSize: () => number
    getItemKey?: (index: number) => unknown
    getScrollElement?: () => unknown
  }) => {
    options.estimateSize()
    options.getScrollElement?.()
    options.getItemKey?.(0)
    options.getItemKey?.(99)
    return {
      getTotalSize: () => 72,
      getVirtualItems: () => [
        { index: 0, key: "0", size: 36, start: 0 },
        { index: 1, key: "1", size: 36, start: 36 },
      ],
    }
  },
}))

vi.mock("@tiptap/react", () => ({
  useEditor: vi.fn(),
  EditorContent: () => <div />,
}))

vi.mock("@dnd-kit/sortable", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@dnd-kit/sortable")>()
  return {
    ...actual,
    useSortable: (options: { id: string }) => ({
      ...actual.useSortable(options),
      isDragging: true,
    }),
  }
})

vi.mock("@dnd-kit/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@dnd-kit/core")>()
  return {
    ...actual,
    DndContext: ({
      children,
      onDragEnd,
    }: {
      children?: unknown
      onDragEnd?: (event: { active: { id: string }; over: { id: string } | null }) => void
    }) => (
      <div>
        <button
          type="button"
          onClick={() => onDragEnd?.({ active: { id: "a" }, over: { id: "b" } })}
        >
          Simulate drag
        </button>
        <button type="button" onClick={() => onDragEnd?.({ active: { id: "a" }, over: null })}>
          Simulate cancel
        </button>
        {children as never}
      </div>
    ),
  }
})

import { ActivityTimeline } from "./activity-timeline"
import { AIExecutionStatus } from "./ai-execution-status"
import { AppShell } from "./app-shell"
import { AreaChart, DonutChart, StackedBarChart } from "./charts"
import { CodeBlock } from "./code-block"
import { CountdownDisplay } from "./countdown-display"
import { DateRangePicker } from "./date-range-picker"
import { DurationPicker } from "./duration-picker"
import { FileDropzone } from "./file-dropzone"
import { InspectorPanel } from "./inspector-panel"
import { MarkdownRenderer } from "./markdown-renderer"
import { RichTextEditor } from "./rich-text-editor"
import { CollapsibleSidebar, Sidebar, SidebarItem } from "./sidebar"
import { handleSortEnd, moveItems, SortableList } from "./sortable-list"
import { SplitWorkspace } from "./split-workspace"
import { MilestoneStepper, WorkflowStepper } from "./stepper"
import { StreamingText } from "./streaming-text"
import { TimeAllocationBar } from "./time-allocation-bar"
import { isValidTimeRange, TimeRangePicker } from "./time-range-picker"
import { VirtualList } from "./virtual-list"
import { WeekCalendar } from "./week-calendar"
import { WeeklyActivityGrid } from "./weekly-activity-grid"

describe("expansion components", () => {
  beforeEach(() => {
    vi.mocked(useEditor).mockImplementation((options) => {
      options?.onUpdate?.({ editor } as never)
      return editor as never
    })
  })

  it("picks a date range and clears it", async () => {
    const user = userEvent.setup()
    render(
      <DateRangePicker defaultValue={{ from: "2026-11-12", to: "2026-11-16" }} locale="en-US" />,
    )
    expect(screen.getByRole("button", { name: /12/ })).toHaveTextContent(/16/)
    cleanup()
    render(<DateRangePicker defaultValue={{ from: "2026-11-12" }} locale="en-US" />)
    await user.click(screen.getByRole("button", { name: /12/ }))
    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(screen.getByRole("button", { name: /pick a range/i })).toBeInTheDocument()
  })

  it("opens the range picker onto the selected month", async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)
    await user.click(screen.getByRole("button", { name: /pick a range/i }))
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: /pick a range/i }))
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument()
    const inMonth = document.querySelector('[data-iso="2026-11-12"]')
    if (!(inMonth instanceof HTMLElement)) throw new Error("missing day")
    await user.click(inMonth)
  })

  it("changes duration hours and off-step minutes", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <DurationPicker defaultValue={30} minuteStep={15} onValueChange={onValueChange} id="dur" />,
    )
    await user.click(screen.getByRole("combobox", { name: "Hours" }))
    await user.click(screen.getByRole("option", { name: "2" }))
    expect(onValueChange).toHaveBeenCalledWith(150)
    await user.click(screen.getByRole("combobox", { name: "Minutes" }))
    await user.click(screen.getByRole("option", { name: "45" }))
    expect(onValueChange).toHaveBeenCalledWith(165)
    cleanup()
    render(<DurationPicker defaultValue={67} minuteStep={15} id="dur2" disabled />)
    expect(screen.getByRole("combobox", { name: "Hours" })).toBeDisabled()
    cleanup()
    render(<DurationPicker defaultValue={90} />)
    expect(screen.getByRole("combobox", { name: "Hours" })).toBeInTheDocument()
  })

  it("flags an inverted time range", async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker defaultValue={{ start: "14:00", end: "09:00" }} />)
    expect(screen.getByText(/end must be after start/i)).toBeInTheDocument()
    cleanup()
    render(<TimeRangePicker defaultValue={{ start: "09:00", end: "11:00" }} />)
    expect(screen.queryByText(/end must be after start/i)).not.toBeInTheDocument()
    expect(isValidTimeRange({ start: "", end: "" })).toBe(true)
    expect(isValidTimeRange({ start: "nope", end: "09:00" })).toBe(false)
    await user.click(screen.getByRole("button", { name: "Start" }))
    await user.click(screen.getByRole("button", { name: "Clear" }))
    cleanup()
    render(<TimeRangePicker defaultValue={{ start: "09:00", end: "11:00" }} />)
    await user.click(screen.getByRole("button", { name: "End" }))
    await user.click(screen.getByRole("option", { name: "30" }))
  })

  it("renders a week event and ignores invalid ones", async () => {
    const onEventSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <>
        <WeekCalendar weekStart="nope" events={[]} />
        <WeekCalendar
          weekStart="2026-11-22"
          onEventSelect={onEventSelect}
          events={[
            { id: "a", start: "2026-11-23T09:00", end: "2026-11-23T10:30", label: "Focus" },
            { id: "bad", start: "nope", end: "nope", label: "Bad" },
            { id: "out", start: "2026-01-01T09:00", end: "2026-01-01T10:00", label: "Out" },
          ]}
        />
      </>,
    )
    await user.click(screen.getByRole("button", { name: /Focus/ }))
    expect(onEventSelect).toHaveBeenCalledWith("a")
  })

  it("reorders a sortable list with buttons", async () => {
    const user = userEvent.setup()
    const onReorder = vi.fn()
    render(
      <SortableList
        defaultItems={[
          { id: "a", label: "Alpha" },
          { id: "b", label: "Beta" },
        ]}
        onReorder={onReorder}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Move Alpha down" }))
    expect(onReorder.mock.calls.at(-1)?.[0].map((item: { id: string }) => item.id)).toEqual([
      "b",
      "a",
    ])
    await user.click(screen.getByRole("button", { name: "Move Alpha up" }))
    expect(screen.getByRole("button", { name: "Move Alpha up" })).toBeDisabled()
    await user.click(screen.getByRole("button", { name: "Move Beta down" }))
    await user.click(screen.getByRole("button", { name: "Simulate drag" }))
    await user.click(screen.getByRole("button", { name: "Simulate cancel" }))
    const items = [
      { id: "a", label: "A" },
      { id: "b", label: "B" },
    ]
    expect(handleSortEnd(items, "a", "b").map((item) => item.id)).toEqual(["b", "a"])
    expect(handleSortEnd(items, "a", "a")).toEqual(items)
    expect(handleSortEnd(items, "a", null)).toEqual(items)
    expect(handleSortEnd(items, "z", "b")).toEqual(items)
    expect(handleSortEnd(items, "a", "z")).toEqual(items)
    expect(moveItems(items, 0, 1).map((item) => item.id)).toEqual(["b", "a"])
    expect(moveItems(items, 0, -1)).toEqual(items)
    expect(moveItems(items, 0, 9)).toEqual(items)
  })

  it("renders markdown, code, stream, and countdown", () => {
    render(
      <>
        <MarkdownRenderer
          markdown={
            "# Title\n\n## Sub\n\n### Small\n\nA [link](/x) and `code`.\n\n```js\nblock\n```\n\n- item\n\n1. one"
          }
        />
        <CodeBlock code="const x = 1" />
        <StreamingText text="Hello" streaming />
        <StreamingText text="Done" />
        <CountdownDisplay remainingSeconds={-3} />
        <CountdownDisplay remainingSeconds={3661} />
      </>,
    )
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "link" })).toHaveAttribute("href", "/x")
    expect(screen.getByRole("timer", { name: /00:00:00/ })).toBeInTheDocument()
    expect(screen.getByRole("timer", { name: /01:01:01/ })).toBeInTheDocument()
  })

  it("renders status, allocation, activity, and steppers", () => {
    render(
      <>
        <AIExecutionStatus
          steps={[
            { id: "1", label: "Plan", status: "done", detail: "ok" },
            { id: "2", label: "Run", status: "running" },
            { id: "3", label: "Fail", status: "error" },
            { id: "4", label: "Wait", status: "pending" },
          ]}
        />
        <MilestoneStepper
          current={1}
          steps={[
            { id: "m1", label: "One", description: "start" },
            { id: "m2", label: "Two" },
          ]}
        />
        <WorkflowStepper
          current={1}
          steps={[
            { id: "w1", label: "Draft", status: "error" },
            { id: "w2", label: "Ship" },
          ]}
        />
        <WorkflowStepper
          current={1}
          steps={[
            { id: "d1", label: "Done" },
            { id: "d2", label: "Now" },
            { id: "d3", label: "Later" },
          ]}
        />
        <TimeAllocationBar
          segments={[
            { label: "Deep", value: 3 },
            { label: "Shallow", value: 1 },
          ]}
        />
        <TimeAllocationBar segments={[{ label: "None", value: 0 }]} />
        <WeeklyActivityGrid
          cells={[
            { day: 1, hour: 9, value: 0 },
            { day: 1, hour: 10, value: 1 },
            { day: 1, hour: 11, value: 3 },
            { day: 1, hour: 12, value: 5 },
            { day: 1, hour: 13, value: 8 },
          ]}
          startHour={9}
          endHour={14}
        />
        <ActivityTimeline
          items={[{ id: "t", title: "Shipped", meta: "today", description: "ok" }]}
        />
      </>,
    )
    expect(screen.getByText("Plan")).toBeInTheDocument()
    expect(screen.getByText("Shipped")).toBeInTheDocument()
  })

  it("renders layout chrome", () => {
    render(
      <AppShell
        sidebar={
          <CollapsibleSidebar collapsed>
            <SidebarItem>Home</SidebarItem>
          </CollapsibleSidebar>
        }
        inspector={<InspectorPanel title="Inspector">Meta</InspectorPanel>}
      >
        <SplitWorkspace nav={<Sidebar>Nav</Sidebar>} main={<p>Main</p>} inspector={<p>Side</p>} />
      </AppShell>,
    )
    expect(screen.getByText("Inspector")).toBeInTheDocument()
    expect(screen.getByText("Main")).toBeInTheDocument()
    render(<SplitWorkspace main={<p>Only</p>} />)
    expect(screen.getByText("Only")).toBeInTheDocument()
  })

  it("drops and selects files", async () => {
    const onFiles = vi.fn()
    const user = userEvent.setup()
    const file = new File(["hi"], "note.txt", { type: "text/plain" })
    render(<FileDropzone onFiles={onFiles} />)
    const input = document.querySelector('input[type="file"]')
    expect(input).toBeTruthy()
    if (!(input instanceof HTMLInputElement)) throw new Error("missing file input")
    await user.upload(input, file)
    expect(onFiles).toHaveBeenCalled()
    await user.click(screen.getByRole("button", { name: "Browse" }))
    const zone = screen.getByText(/drop files/i)
    fireEvent.dragOver(zone)
    fireEvent.dragLeave(zone)
    fireEvent.drop(zone, { dataTransfer: { files: [file] } })
    expect(onFiles).toHaveBeenCalled()
    render(<FileDropzone onFiles={onFiles} disabled />)
    const disabledZone = screen.getAllByText(/drop files/i)[1] as HTMLElement
    fireEvent.dragOver(disabledZone)
    fireEvent.drop(disabledZone, { dataTransfer: { files: [file] } })
    fireEvent.change(input, { target: { files: null } })
  })

  it("virtualizes a list", () => {
    render(
      <VirtualList
        items={["a", "b"]}
        renderItem={(item) => <span>{item}</span>}
        getItemKey={(item) => item}
      />,
    )
    expect(screen.getByText("a")).toBeInTheDocument()
    cleanup()
    render(<VirtualList items={["a"]} renderItem={(item) => <span>{item}</span>} />)
    expect(screen.getByText("a")).toBeInTheDocument()
  })

  it("renders charts", () => {
    const data = [
      { name: "Mon", deep: 2, shallow: 1, value: 3 },
      { name: "Tue", deep: 1, shallow: 2, value: 3 },
    ]
    render(
      <>
        <StackedBarChart data={data} series={[{ key: "deep" }, { key: "shallow" }]} />
        <AreaChart data={data} series={[{ key: "value", label: "Hours" }]} />
        <AreaChart data={data} series={[]} />
        <DonutChart data={data} />
      </>,
    )
    expect(screen.getByRole("img", { name: "Stacked bar chart" })).toBeInTheDocument()
  })

  it("mounts a rich text editor toolbar", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    vi.mocked(useEditor).mockReturnValueOnce(null as never)
    render(<RichTextEditor className="empty" />)
    expect(document.querySelector(".empty")).toBeInTheDocument()
    cleanup()
    render(<RichTextEditor value="<p>Hi</p>" onValueChange={onValueChange} />)
    expect(onValueChange).toHaveBeenCalledWith("<p>Hi</p>")
    cleanup()
    render(<RichTextEditor value="<p>Later</p>" />)
    await user.click(screen.getByRole("button", { name: "Bold" }))
    await user.click(screen.getByRole("button", { name: "Italic" }))
    await user.click(screen.getByRole("button", { name: "List" }))
    cleanup()
    vi.mocked(useEditor).mockImplementation((options) => {
      options?.onUpdate?.({ editor: { ...editor, isActive: () => false } } as never)
      return { ...editor, isActive: () => false } as never
    })
    render(<RichTextEditor />)
    await user.click(screen.getByRole("button", { name: "Italic" }))
  })
})
