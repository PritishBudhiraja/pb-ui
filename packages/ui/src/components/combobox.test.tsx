import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Combobox } from "./combobox"

const items = [
  { value: "one", label: "One" },
  { value: "two", label: "Two" },
  { value: "three", label: "Three", disabled: true },
]

describe("Combobox", () => {
  it("filters and selects an option", async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<Combobox items={items} value="one" onValueChange={onValueChange} />)
    await user.click(screen.getByRole("button", { name: "One" }))
    expect(screen.getByRole("option", { name: "One" })).toHaveAttribute("aria-checked", "true")
    await user.type(screen.getByRole("combobox"), "tw")
    expect(screen.queryByRole("option", { name: "One" })).not.toBeInTheDocument()
    await user.click(screen.getByRole("option", { name: "Two" }))
    expect(onValueChange).toHaveBeenCalledWith("two")
  })

  it("selects with the keyboard when uncontrolled", async () => {
    const user = userEvent.setup()
    render(<Combobox items={items} defaultValue="one" aria-label="Number" />)
    await user.click(screen.getByRole("button", { name: "Number" }))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    await user.keyboard("{ArrowDown}{Enter}")
    expect(screen.getByRole("button", { name: "Number" })).toHaveTextContent("Two")
  })

  it("shows an empty state and clears the query on close", async () => {
    const user = userEvent.setup()
    render(<Combobox items={items} />)
    await user.click(screen.getByRole("button", { name: "Select…" }))
    await user.type(screen.getByRole("combobox"), "zzz")
    expect(screen.getByText("No matches")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    await user.click(screen.getByRole("button", { name: "Select…" }))
    expect(screen.getByRole("combobox")).toHaveValue("")
  })
})
