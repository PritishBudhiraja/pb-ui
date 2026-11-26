import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { CalendarEvent, WeekCalendar } from "./week-calendar"

const focus = {
  id: "a",
  start: "2026-11-23T09:00",
  end: "2026-11-23T10:30",
  label: "Focus",
}

describe("WeekCalendar", () => {
  it("selects events and empty slots, and shows now", async () => {
    const onEventSelect = vi.fn()
    const onSlotSelect = vi.fn()
    const user = userEvent.setup()
    render(
      <WeekCalendar
        weekStart="2026-11-22"
        now="2026-11-23T12:00"
        onEventSelect={onEventSelect}
        onSlotSelect={onSlotSelect}
        events={[focus]}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Focus, 09:00–10:30" }))
    fireEvent.pointerDown(screen.getByRole("button", { name: "Focus, 09:00–10:30" }), {
      clientY: 20,
    })
    expect(onEventSelect).toHaveBeenCalledWith("a")
    await user.click(screen.getByRole("button", { name: /Monday, November 23, 2026, 11:00/ }))
    expect(onSlotSelect).toHaveBeenCalledWith({
      start: "2026-11-23T11:00",
      end: "2026-11-23T12:00",
    })
    expect(document.querySelector("[data-now]")).not.toBeNull()
  })

  it("hides now, ignores invalid week starts, and skips invalid events", () => {
    render(
      <>
        <WeekCalendar weekStart="nope" showNow={false} events={[]} />
        <WeekCalendar
          weekStart="2026-11-22"
          showNow={false}
          events={[
            { id: "bad", start: "x", end: "y", label: "Bad" },
            { id: "zero", start: "2026-11-23T09:00", end: "2026-11-23T09:00", label: "Zero" },
          ]}
        />
      </>,
    )
    expect(screen.queryByRole("button", { name: /Bad/ })).toBeNull()
    expect(document.querySelector("[data-now]")).toBeNull()
  })

  it("ignores keyboard moves that cannot be applied", async () => {
    const onEventChange = vi.fn()
    const user = userEvent.setup()
    render(
      <CalendarEvent id="z" start="nope" end="nope" label="Broken" onEventChange={onEventChange} />,
    )
    screen.getByRole("button", { name: "Broken" }).focus()
    await user.keyboard("{ArrowUp}{Shift>}{ArrowDown}{/Shift}")
    expect(onEventChange).not.toHaveBeenCalled()
  })

  it("moves and resizes events from the keyboard", async () => {
    const onEventChange = vi.fn()
    const user = userEvent.setup()
    render(
      <WeekCalendar
        weekStart="2026-11-22"
        showNow={false}
        onEventChange={onEventChange}
        events={[focus]}
      />,
    )
    const chip = screen.getByRole("button", { name: "Focus, 09:00–10:30" })
    chip.focus()
    await user.keyboard("{ArrowUp}")
    expect(onEventChange).toHaveBeenCalledWith("a", {
      start: "2026-11-23T08:45",
      end: "2026-11-23T10:15",
    })
    await user.keyboard("{ArrowDown}")
    await user.keyboard("{Shift>}{ArrowDown}{/Shift}")
    await user.keyboard("{Shift>}{ArrowUp}{/Shift}")
    await user.keyboard("{ArrowLeft}")
    await user.keyboard("{ArrowRight}")
    expect(onEventChange).toHaveBeenCalled()
  })

  it("drags and resizes with a pointer", () => {
    const onEventChange = vi.fn()
    render(
      <WeekCalendar
        weekStart="2026-11-22"
        showNow={false}
        onEventChange={onEventChange}
        events={[focus]}
      />,
    )
    fireEvent.pointerDown(screen.getByRole("button", { name: "Focus, 09:00–10:30" }), {
      clientY: 100,
    })
    fireEvent.pointerMove(window, { clientY: 148 })
    fireEvent.pointerUp(window)
    expect(onEventChange).toHaveBeenCalledWith("a", {
      start: "2026-11-23T10:00",
      end: "2026-11-23T11:30",
    })
    onEventChange.mockClear()
    fireEvent.pointerDown(screen.getByRole("button", { name: "Resize Focus" }), { clientY: 200 })
    fireEvent.pointerMove(window, { clientY: 248 })
    fireEvent.pointerUp(window)
    expect(onEventChange).toHaveBeenCalledWith("a", {
      start: "2026-11-23T09:00",
      end: "2026-11-23T11:30",
    })
  })

  it("ignores tiny pointer movement and standalone event labels", async () => {
    const onEventChange = vi.fn()
    const user = userEvent.setup()
    render(
      <>
        <CalendarEvent id="x" start="broken" end="broken" label="Loose" onSelect={vi.fn()} />
        <WeekCalendar
          weekStart="2026-11-22"
          showNow={false}
          onEventChange={onEventChange}
          events={[focus]}
        />
      </>,
    )
    fireEvent.pointerDown(screen.getByRole("button", { name: "Focus, 09:00–10:30" }), {
      clientY: 100,
    })
    fireEvent.pointerMove(window, { clientY: 101 })
    fireEvent.pointerUp(window)
    expect(onEventChange).not.toHaveBeenCalled()
    await user.click(screen.getByRole("button", { name: "Loose" }))
    screen.getByRole("button", { name: "Loose" }).focus()
    await user.keyboard("{ArrowUp}")
    fireEvent.pointerDown(screen.getByRole("button", { name: "Focus, 09:00–10:30" }), {
      clientY: 100,
    })
    fireEvent.pointerMove(window, { clientY: -200 })
    fireEvent.pointerUp(window)
  })

  it("draws now from the clock when the week contains today", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 23, 12, 0, 0))
    render(<WeekCalendar weekStart="2026-11-22" events={[]} />)
    expect(document.querySelector("[data-now]")).not.toBeNull()
    vi.useRealTimers()
  })
})
