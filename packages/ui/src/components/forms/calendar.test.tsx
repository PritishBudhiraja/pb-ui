import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../../test/axe"
import { Calendar } from "./calendar"

function CalendarHarness() {
  const [month, setMonth] = useState(new Date(2026, 10, 1))
  return <Calendar month={month} value="2026-11-30" onMonthChange={setMonth} onSelect={() => {}} />
}

describe("Calendar", () => {
  it("selects an in-month day as ISO", async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <Calendar
        month={new Date(2026, 10, 1)}
        value="2026-11-01"
        onMonthChange={vi.fn()}
        onSelect={onSelect}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Thursday, November 26, 2026" }))
    expect(onSelect).toHaveBeenCalledWith("2026-11-26")
  })

  it("moves the month", async () => {
    const onMonthChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Calendar month={new Date(2026, 10, 1)} onMonthChange={onMonthChange} onSelect={vi.fn()} />,
    )
    await user.click(screen.getByRole("button", { name: "Next month" }))
    expect(onMonthChange).toHaveBeenCalled()
    await user.click(screen.getByRole("button", { name: "Previous month" }))
    expect(onMonthChange).toHaveBeenCalledTimes(2)
  })

  it("disables days outside min and max", async () => {
    render(
      <Calendar
        month={new Date(2026, 10, 1)}
        min="2026-11-10"
        max="2026-11-20"
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    expect(screen.getByRole("button", { name: "Sunday, November 1, 2026" })).toBeDisabled()
    await expectNoAxeViolations()
  })

  it("marks the selected day and today, with one tab stop", () => {
    const today = new Date()
    const { rerender } = render(
      <Calendar
        month={new Date(2026, 10, 1)}
        value="2026-11-12"
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    const selected = screen.getByRole("button", { name: "Thursday, November 12, 2026" })
    expect(selected).toHaveAttribute("aria-pressed", "true")
    expect(selected).toHaveAttribute("tabindex", "0")
    expect(screen.getAllByRole("button").filter((b) => b.tabIndex === 0)).toHaveLength(3)
    rerender(<Calendar month={today} onMonthChange={vi.fn()} onSelect={vi.fn()} />)
    const current = document.querySelector('[aria-current="date"]')
    expect(current).toHaveAttribute("tabindex", "0")
    rerender(<Calendar month={new Date(2001, 1, 1)} onMonthChange={vi.fn()} onSelect={vi.fn()} />)
    expect(screen.getByRole("button", { name: "Thursday, February 1, 2001" })).toHaveAttribute(
      "tabindex",
      "0",
    )
  })

  it("moves focus with arrow keys and crosses months", async () => {
    const user = userEvent.setup()
    render(<CalendarHarness />)
    screen.getByRole("button", { name: "Monday, November 30, 2026" }).focus()
    await user.keyboard("{ArrowLeft}")
    expect(screen.getByRole("button", { name: "Sunday, November 29, 2026" })).toHaveFocus()
    await user.keyboard("{ArrowUp}")
    expect(screen.getByRole("button", { name: "Sunday, November 22, 2026" })).toHaveFocus()
    await user.keyboard("{ArrowDown}{ArrowRight}{ArrowRight}")
    expect(screen.getByRole("button", { name: "Tuesday, December 1, 2026" })).toHaveFocus()
    await user.keyboard("a")
    expect(screen.getByRole("button", { name: "Tuesday, December 1, 2026" })).toHaveFocus()
  })

  it("renders the same markup on the server and when hydrating", async () => {
    const today = new Date()
    const ui = <Calendar month={today} onMonthChange={() => {}} onSelect={() => {}} />
    const html = renderToString(ui)
    expect(html).not.toContain('aria-current="date"')
    const container = document.createElement("div")
    container.innerHTML = html
    document.body.append(container)
    const errors = vi.spyOn(console, "error").mockImplementation(() => {})
    await act(async () => {
      hydrateRoot(container, ui)
    })
    expect(errors).not.toHaveBeenCalled()
    errors.mockRestore()
    expect(container.querySelector('[aria-current="date"]')).not.toBeNull()
    container.remove()
  })

  it("selects a date range, reversing and restarting", async () => {
    const onRangeChange = vi.fn()
    const user = userEvent.setup()
    const { rerender } = render(
      <Calendar
        mode="range"
        month={new Date(2026, 10, 1)}
        range={{}}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
        onRangeChange={onRangeChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Thursday, November 12, 2026" }))
    expect(onRangeChange).toHaveBeenCalledWith({ from: "2026-11-12", to: undefined })
    rerender(
      <Calendar
        mode="range"
        month={new Date(2026, 10, 1)}
        range={{ from: "2026-11-12" }}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
        onRangeChange={onRangeChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Monday, November 16, 2026" }))
    expect(onRangeChange).toHaveBeenCalledWith({ from: "2026-11-12", to: "2026-11-16" })
    rerender(
      <Calendar
        mode="range"
        month={new Date(2026, 10, 1)}
        range={{ from: "2026-11-16" }}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
        onRangeChange={onRangeChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Thursday, November 12, 2026" }))
    expect(onRangeChange).toHaveBeenCalledWith({ from: "2026-11-12", to: "2026-11-16" })
    rerender(
      <Calendar
        mode="range"
        month={new Date(2026, 10, 1)}
        range={{ from: "2026-11-12", to: "2026-11-16" }}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
        onRangeChange={onRangeChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Thursday, November 26, 2026" }))
    expect(onRangeChange).toHaveBeenLastCalledWith({ from: "2026-11-26", to: undefined })
  })

  it("selects a range day without a range callback", async () => {
    const user = userEvent.setup()
    render(
      <Calendar
        mode="range"
        month={new Date(2026, 10, 1)}
        range={{ from: "2026-11-12", to: "2026-11-16" }}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Monday, November 16, 2026" }))
  })

  it("announces every day in the range as pressed", async () => {
    render(
      <Calendar
        mode="range"
        month={new Date(2026, 10, 1)}
        range={{ from: "2026-11-12", to: "2026-11-16" }}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    for (const name of [
      "Thursday, November 12, 2026",
      "Saturday, November 14, 2026",
      "Monday, November 16, 2026",
    ]) {
      expect(screen.getByRole("button", { name })).toHaveAttribute("aria-pressed", "true")
    }
    expect(screen.getByRole("button", { name: "Tuesday, November 17, 2026" })).toHaveAttribute(
      "aria-pressed",
      "false",
    )
    await expectNoAxeViolations()
  })

  it("starts a range when no range value is passed", async () => {
    const onRangeChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Calendar
        mode="range"
        month={new Date(2026, 10, 1)}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
        onRangeChange={onRangeChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Thursday, November 12, 2026" }))
    expect(onRangeChange).toHaveBeenCalledWith({ from: "2026-11-12", to: undefined })
  })

  it("uses the locale's weekday names and a chosen first day", () => {
    render(
      <Calendar
        month={new Date(2026, 10, 1)}
        locale="de-DE"
        weekStartsOn={1}
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    const headers = [...document.querySelectorAll("span[title]")].map((node) =>
      node.getAttribute("title"),
    )
    expect(headers[0]).toBe("Montag")
    expect(headers[6]).toBe("Sonntag")
    const days = screen.getAllByRole("button").filter((node) => node.hasAttribute("aria-pressed"))
    expect(days[0]).toHaveAccessibleName("Montag, 26. Oktober 2026")
  })

  it("keeps Gregorian dates in locales with another default calendar", () => {
    render(
      <Calendar
        month={new Date(2026, 10, 1)}
        locale="fa-IR"
        onMonthChange={vi.fn()}
        onSelect={vi.fn()}
      />,
    )
    const day = document.querySelector('[data-iso="2026-11-26"]')
    const gregorian = new Intl.DateTimeFormat("fa-IR", { calendar: "gregory", dateStyle: "full" })
    expect(day).toHaveAttribute("aria-label", gregorian.format(new Date(2026, 10, 26)))
    expect(day?.getAttribute("aria-label")).toContain("۲۰۲۶")
  })
})
