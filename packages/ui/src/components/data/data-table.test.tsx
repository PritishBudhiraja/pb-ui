import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { DataTable, type DataTableColumn } from "./data-table"

interface Run {
  id: string
  name: string
  steps: number
}

const rows: Run[] = [
  { id: "a", name: "Checkout 10", steps: 12 },
  { id: "b", name: "Checkout 9", steps: 3 },
  { id: "c", name: "Login", steps: 7 },
]

const columns: DataTableColumn<Run>[] = [
  { key: "name", header: "Name", cell: (row) => row.name, sortValue: (row) => row.name },
  { key: "steps", header: "Steps", cell: (row) => row.steps, sortValue: (row) => row.steps },
  { key: "id", header: "ID", cell: (row) => row.id },
]

function firstColumn() {
  return screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[0]?.textContent)
}

describe("DataTable", () => {
  it("cycles a column through ascending, descending and unsorted", async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        onSortChange={onSortChange}
      />,
    )
    const header = screen.getByRole("columnheader", { name: "Name" })
    expect(header).toHaveAttribute("aria-sort", "none")
    expect(screen.getByRole("columnheader", { name: "ID" })).not.toHaveAttribute("aria-sort")

    await user.click(within(header).getByRole("button"))
    expect(header).toHaveAttribute("aria-sort", "ascending")
    expect(firstColumn()).toEqual(["Checkout 9", "Checkout 10", "Login"])

    await user.click(within(header).getByRole("button"))
    expect(header).toHaveAttribute("aria-sort", "descending")
    expect(firstColumn()).toEqual(["Login", "Checkout 10", "Checkout 9"])

    await user.click(within(header).getByRole("button"))
    expect(header).toHaveAttribute("aria-sort", "none")
    expect(firstColumn()).toEqual(["Checkout 10", "Checkout 9", "Login"])
    expect(onSortChange).toHaveBeenLastCalledWith(null)
  })

  it("sorts numbers and switches columns", async () => {
    const user = userEvent.setup()
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        defaultSort={{ key: "name", direction: "desc" }}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Steps" }))
    expect(firstColumn()).toEqual(["Checkout 9", "Login", "Checkout 10"])
  })

  it("leaves rows alone for manual sorting or an unknown key", () => {
    const { rerender } = render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        sort={{ key: "steps", direction: "asc" }}
        manualSort
      />,
    )
    expect(screen.getByRole("columnheader", { name: "Steps" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    )
    expect(firstColumn()).toEqual(["Checkout 10", "Checkout 9", "Login"])
    rerender(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        sort={{ key: "gone", direction: "asc" }}
      />,
    )
    expect(firstColumn()).toEqual(["Checkout 10", "Checkout 9", "Login"])
  })

  it("shows the empty text across every column", () => {
    render(<DataTable columns={columns} rows={[]} getRowId={(row) => row.id} caption="Runs" />)
    expect(screen.getByRole("cell", { name: "No rows to show" })).toHaveAttribute("colspan", "3")
    expect(screen.getByRole("table")).not.toHaveAttribute("aria-busy")
  })

  it("shows placeholder rows while loading", () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        loading
        loadingRows={2}
      />,
    )
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true")
    expect(screen.getAllByRole("row")).toHaveLength(3)
    expect(screen.queryByText("Login")).not.toBeInTheDocument()
  })
})
