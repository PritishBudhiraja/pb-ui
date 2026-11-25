import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Combobox } from "./combobox"

const items = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
]

describe("Combobox", () => {
  it("filters and selects an item", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<Combobox items={items} value="one" onValueChange={onValueChange} />)
    await user.click(screen.getByRole("combobox"))
    await user.type(screen.getByLabelText("Search…"), "tw")
    expect(screen.queryByRole("button", { name: "One" })).not.toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: "Two" }))
    expect(onValueChange).toHaveBeenCalledWith("two")
  })

  it("shows an empty state", async () => {
    const user = userEvent.setup()
    render(<Combobox items={items} />)
    await user.click(screen.getByRole("combobox"))
    await user.type(screen.getByLabelText("Search…"), "zzz")
    expect(screen.getByText("No matches")).toBeInTheDocument()
  })
})
