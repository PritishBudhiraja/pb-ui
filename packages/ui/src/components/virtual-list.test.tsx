import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { VirtualList } from "./virtual-list"

// `fake` swaps the virtualizer for a fixed two-row window; otherwise the real one runs.
const virtual = vi.hoisted(() => ({ fake: false }))

function fixedWindow(options: {
  estimateSize: () => number
  getItemKey?: (index: number) => unknown
  getScrollElement?: () => unknown
}) {
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
  } as never
}

vi.mock("@tanstack/react-virtual", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-virtual")>()
  return {
    ...actual,
    useVirtualizer: (options: Parameters<typeof actual.useVirtualizer>[0]) =>
      (virtual.fake
        ? (fixedWindow as unknown as typeof actual.useVirtualizer)
        : actual.useVirtualizer)(options),
  }
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

  describe("with a fixed virtual window", () => {
    beforeEach(() => {
      virtual.fake = true
    })

    afterEach(() => {
      virtual.fake = false
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
  })
})
