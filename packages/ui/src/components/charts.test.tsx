import { render, screen, within } from "@testing-library/react"
import type { ReactNode } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { AreaChart, DonutChart, StackedBarChart } from "./charts"

function part(name: string) {
  return ({ children, ...props }: { children?: ReactNode }) => (
    <g data-part={name} data-props={JSON.stringify(props)}>
      {children}
    </g>
  )
}

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children?: ReactNode }) => <svg aria-hidden>{children}</svg>,
  AreaChart: ({ children }: { children?: ReactNode }) => <svg aria-hidden>{children}</svg>,
  PieChart: ({ children }: { children?: ReactNode }) => <svg aria-hidden>{children}</svg>,
  Bar: part("bar"),
  Area: part("area"),
  Pie: part("pie"),
  Cell: part("cell"),
  CartesianGrid: part("grid"),
  XAxis: part("x"),
  YAxis: part("y"),
  Tooltip: () => null,
  Legend: () => null,
}))

const data = [
  { name: "Mon", deep: 2, shallow: 1, value: 3 },
  { name: "Tue", deep: 1, shallow: 2, value: 4 },
]

function propsOf(container: HTMLElement, name: string) {
  return [...container.querySelectorAll(`[data-part="${name}"]`)].map((node) =>
    JSON.parse(node.getAttribute("data-props") ?? "{}"),
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe("charts", () => {
  it("passes complete token colours instead of wrapping them in hsl()", () => {
    const { container } = render(
      <>
        <StackedBarChart data={data} series={[{ key: "deep" }, { key: "shallow" }]} />
        <AreaChart data={data} series={[{ key: "value", label: "Hours" }]} />
        <DonutChart data={data} />
      </>,
    )
    expect(container.innerHTML).not.toContain("hsl(")
    expect(propsOf(container, "grid")[0].stroke).toBe("var(--border)")
    expect(propsOf(container, "x")[0].tick.fill).toBe("var(--muted-foreground)")
    const [area] = propsOf(container, "area")
    expect(area.stroke).toBe("var(--foreground)")
    expect(area.fill).toBe("color-mix(in oklab, var(--foreground) 20%, transparent)")
  })

  it("exposes the plotted data as a hidden table", async () => {
    render(
      <>
        <StackedBarChart
          label="Focus by day"
          data={data}
          series={[{ key: "deep", label: "Deep" }, { key: "shallow" }]}
        />
        <AreaChart label="Hours by day" data={data} series={[]} />
        <DonutChart label="Split" data={data} />
      </>,
    )
    expect(screen.getByRole("img", { name: "Focus by day" })).toBeInTheDocument()
    const bars = screen.getByRole("table", { name: "Focus by day" })
    expect(bars).toHaveClass("sr-only")
    expect(within(bars).getByRole("columnheader", { name: "Deep" })).toBeInTheDocument()
    expect(within(bars).getByRole("columnheader", { name: "shallow" })).toBeInTheDocument()
    const mon = within(bars).getByRole("row", { name: /Mon/ })
    expect(
      within(mon)
        .getAllByRole("cell")
        .map((cell) => cell.textContent),
    ).toEqual(["2", "1"])
    const area = screen.getByRole("table", { name: "Hours by day" })
    expect(within(area).getByRole("columnheader", { name: "value" })).toBeInTheDocument()
    expect(within(area).getByRole("row", { name: /Tue/ })).toHaveTextContent("4")
    const donut = screen.getByRole("table", { name: "Split" })
    expect(within(donut).getByRole("row", { name: /Mon/ })).toHaveTextContent("3")
    await expectNoAxeViolations()
  })

  it("keys donut slices by position so repeated names keep every slice", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    const { container } = render(
      <DonutChart
        data={[
          { name: "Other", value: 1 },
          { name: "Other", value: 2 },
        ]}
      />,
    )
    expect(container.querySelectorAll('[data-part="cell"]')).toHaveLength(2)
    expect(error.mock.calls.flat().join(" ")).not.toContain("same key")
  })
})
