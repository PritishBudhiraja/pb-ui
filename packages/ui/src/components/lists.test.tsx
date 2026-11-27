import type { DragEndEvent } from "@dnd-kit/core"
import { act, render, screen } from "@testing-library/react"
import type { ComponentProps } from "react"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { SortableList } from "./sortable-list"
import { MilestoneStepper, WorkflowStepper } from "./stepper"
import { StreamingText } from "./streaming-text"
import { VirtualList } from "./virtual-list"

const dnd = vi.hoisted(() => ({
  onDragEnd: undefined as ((event: DragEndEvent) => void) | undefined,
}))

vi.mock("@dnd-kit/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@dnd-kit/core")>()
  return {
    ...actual,
    DndContext: (props: ComponentProps<typeof actual.DndContext>) => {
      dnd.onDragEnd = props.onDragEnd
      return <actual.DndContext {...props} />
    },
  }
})

const items = [
  { id: "a", label: "Alpha" },
  { id: "b", label: "Beta" },
]

function dragEnd(active: string, over: string | null) {
  act(() =>
    dnd.onDragEnd?.({
      active: { id: active },
      over: over ? { id: over } : null,
    } as unknown as DragEndEvent),
  )
}

describe("SortableList", () => {
  it("hydrates without an id mismatch after another list rendered", async () => {
    render(<SortableList defaultItems={items} />)
    const html = renderToString(<SortableList defaultItems={items} />)
    const container = document.createElement("div")
    container.innerHTML = html
    document.body.append(container)
    const onRecoverableError = vi.fn()
    const errors = vi.spyOn(console, "error").mockImplementation(() => {})
    await act(async () => {
      hydrateRoot(container, <SortableList defaultItems={items} />, { onRecoverableError })
    })
    expect(onRecoverableError).not.toHaveBeenCalled()
    expect(errors).not.toHaveBeenCalled()
    errors.mockRestore()
    container.remove()
  })

  it("skips onReorder when an item is dropped on itself or nowhere", async () => {
    const onReorder = vi.fn()
    render(<SortableList defaultItems={items} onReorder={onReorder} />)
    dragEnd("a", "a")
    dragEnd("a", null)
    expect(onReorder).not.toHaveBeenCalled()
    dragEnd("a", "b")
    expect(onReorder.mock.calls[0]?.[0].map((item: { id: string }) => item.id)).toEqual(["b", "a"])
    await expectNoAxeViolations()
  })
})

describe("VirtualList", () => {
  it("tells assistive tech the full size and position of each item", async () => {
    const all = Array.from({ length: 500 }, (_, index) => `Item ${index}`)
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(240)
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300)
    render(<VirtualList items={all} renderItem={(item) => <span>{item}</span>} />)
    const rows = screen.getAllByRole("listitem")
    expect(rows.length).toBeLessThan(all.length)
    expect(rows[0]).toHaveAttribute("aria-setsize", "500")
    expect(rows[0]).toHaveAttribute("aria-posinset", "1")
    expect(rows[1]).toHaveAttribute("aria-posinset", "2")
    vi.restoreAllMocks()
    await expectNoAxeViolations()
  })
})

describe("Stepper", () => {
  it("marks the current step on the list item and names every status", async () => {
    render(
      <>
        <MilestoneStepper
          current={1}
          steps={[
            { id: "m1", label: "Draft" },
            { id: "m2", label: "Review" },
            { id: "m3", label: "Ship" },
            { id: "m4", label: "Audit", status: "error" },
          ]}
        />
        <WorkflowStepper current={0} steps={[{ id: "w1", label: "Plan" }]} />
      </>,
    )
    const milestones = screen.getAllByRole("listitem").slice(0, 4)
    expect(milestones[1]).toHaveAttribute("aria-current", "step")
    expect(milestones[0]).not.toHaveAttribute("aria-current")
    expect(milestones.map((item) => item.textContent)).toEqual([
      "1CompletedDraft",
      "2Current stepReview",
      "3Not startedShip",
      "4ErrorAudit",
    ])
    const workflow = screen.getByRole("list", { name: "Workflow" })
    expect(workflow.querySelector("[aria-current]")?.tagName).toBe("LI")
    await expectNoAxeViolations()
  })
})

describe("StreamingText", () => {
  it("holds announcements while streaming", async () => {
    const { rerender } = render(<StreamingText text="Hel" streaming />)
    const region = screen.getByText("Hel")
    expect(region).toHaveAttribute("aria-busy", "true")
    rerender(<StreamingText text="Hello" />)
    expect(region).toHaveAttribute("aria-busy", "false")
    expect(region).toHaveAttribute("aria-live", "polite")
    await expectNoAxeViolations()
  })
})
