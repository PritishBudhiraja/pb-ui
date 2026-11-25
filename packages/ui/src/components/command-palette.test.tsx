import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
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
    await user.keyboard("{Escape}")
    await user.keyboard("{Meta>}k{/Meta}")
    await user.keyboard("{Control>}k{/Control}")
  })
})
