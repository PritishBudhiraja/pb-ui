import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { CommandPalette } from "./command-palette"

describe("CommandPalette", () => {
  it("selects an item from the open dialog", async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <CommandPalette
        open
        onOpenChange={vi.fn()}
        onSelect={onSelect}
        items={[{ id: "button", label: "Button", group: "Primitives" }]}
      />,
    )
    await user.click(screen.getByRole("option", { name: /Button/ }))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "button" }))
  })

  it("opens from the trigger and shortcut", async () => {
    const user = userEvent.setup()
    render(
      <CommandPalette
        onSelect={vi.fn()}
        items={[{ id: "x", label: "Extra", keywords: "k", icon: <span>i</span> }]}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Search" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    await expectNoAxeViolations()
    await user.keyboard("{Escape}")
    await user.keyboard("{Meta>}k{/Meta}")
    await user.keyboard("{Control>}k{/Control}")
  })

  it("opens and reports changes when only onOpenChange is passed", async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(<CommandPalette onSelect={vi.fn()} onOpenChange={onOpenChange} items={[]} />)
    await user.click(screen.getByRole("button", { name: "Search" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(true)
    await user.keyboard("{Control>}k{/Control}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
  })

  it("lets two palettes share the page and turns the shortcut off", async () => {
    const user = userEvent.setup()
    const first = vi.fn()
    const second = vi.fn()
    const { rerender } = render(
      <>
        <CommandPalette items={[]} onSelect={vi.fn()} onOpenChange={first} />
        <CommandPalette items={[]} onSelect={vi.fn()} onOpenChange={second} triggerLabel="Other" />
      </>,
    )
    await user.keyboard("{Control>}k{/Control}")
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).not.toHaveBeenCalled()
    await user.keyboard("{Escape}")
    rerender(
      <>
        <CommandPalette items={[]} onSelect={vi.fn()} onOpenChange={first} shortcut={false} />
        <CommandPalette items={[]} onSelect={vi.fn()} onOpenChange={second} triggerLabel="Other" />
      </>,
    )
    first.mockClear()
    await user.keyboard("{Control>}k{/Control}")
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledWith(true)
  })
})
