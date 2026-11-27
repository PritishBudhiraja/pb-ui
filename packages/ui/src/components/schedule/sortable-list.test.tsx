import type { DragEndEvent } from "@dnd-kit/core"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ComponentProps } from "react"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { handleSortEnd, moveItems, SortableList } from "./sortable-list"

// `simulate` swaps DndContext for buttons that fire onDragEnd and marks items as dragging;
// otherwise the real DndContext renders and its onDragEnd is captured for dragEnd().
const dnd = vi.hoisted(() => ({
  simulate: false,
  onDragEnd: undefined as ((event: DragEndEvent) => void) | undefined,
}))

vi.mock("@dnd-kit/sortable", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@dnd-kit/sortable")>()
  return {
    ...actual,
    useSortable: (options: Parameters<typeof actual.useSortable>[0]) => {
      const sortable = actual.useSortable(options)
      return dnd.simulate ? { ...sortable, isDragging: true } : sortable
    },
  }
})

vi.mock("@dnd-kit/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@dnd-kit/core")>()
  return {
    ...actual,
    DndContext: (props: ComponentProps<typeof actual.DndContext>) => {
      if (!dnd.simulate) {
        dnd.onDragEnd = props.onDragEnd
        return <actual.DndContext {...props} />
      }
      const onDragEnd = props.onDragEnd as
        | ((event: { active: { id: string }; over: { id: string } | null }) => void)
        | undefined
      return (
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
          {props.children}
        </div>
      )
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

  describe("with a simulated drag context", () => {
    beforeEach(() => {
      dnd.simulate = true
    })

    afterEach(() => {
      dnd.simulate = false
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
  })
})
