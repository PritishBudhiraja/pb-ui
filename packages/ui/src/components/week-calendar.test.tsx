import { act, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { hydrateRoot } from "react-dom/client"
import { renderToString } from "react-dom/server"
import { describe, expect, it, vi } from "vitest"
import { expectNoAxeViolations } from "../test/axe"
import { CalendarEvent, type CalendarEventData, WeekCalendar } from "./week-calendar"

const focus: CalendarEventData = {
  id: "a",
  start: "2026-11-23T09:00",
  end: "2026-11-23T10:30",
  label: "Focus",
}

function resizeHandle() {
  const handle = document.querySelector<HTMLButtonElement>("[data-resize-handle]")
  if (!handle) throw new Error("No resize handle")
  return handle
}

function SavingCalendar({
  onEventChange,
  onEventSelect,
}: {
  onEventChange: (id: string, next: { start: string; end: string }) => void
  onEventSelect: (id: string) => void
}) {
  const [events, setEvents] = useState([focus])
  return (
    <WeekCalendar
      weekStart="2026-11-22"
      showNow={false}
      events={events}
      onEventSelect={onEventSelect}
      onEventChange={(id, next) => {
        onEventChange(id, next)
        setEvents((current) =>
          current.map((item) => (item.id === id ? { ...item, ...next } : item)),
        )
      }}
    />
  )
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
    fireEvent.pointerDown(resizeHandle(), { clientY: 200 })
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

  it("moves from where the drag began while the parent saves each change", async () => {
    const onEventChange = vi.fn()
    const onEventSelect = vi.fn()
    render(<SavingCalendar onEventChange={onEventChange} onEventSelect={onEventSelect} />)
    const chip = () => screen.getByRole("button", { name: /^Focus/ })
    fireEvent.pointerDown(chip(), { clientY: 100 })
    fireEvent.pointerMove(window, { clientY: 105 })
    fireEvent.pointerMove(window, { clientY: 110 })
    fireEvent.pointerMove(window, { clientY: 115 })
    expect(onEventChange).toHaveBeenCalledTimes(1)
    expect(onEventChange).toHaveBeenLastCalledWith("a", {
      start: "2026-11-23T09:15",
      end: "2026-11-23T10:45",
    })
    fireEvent.pointerMove(window, { clientY: 124 })
    fireEvent.pointerMove(window, { clientY: 115 })
    fireEvent.pointerUp(window)
    expect(onEventChange.mock.calls).toEqual([
      ["a", { start: "2026-11-23T09:15", end: "2026-11-23T10:45" }],
      ["a", { start: "2026-11-23T09:30", end: "2026-11-23T11:00" }],
      ["a", { start: "2026-11-23T09:15", end: "2026-11-23T10:45" }],
    ])
    fireEvent.click(chip())
    expect(onEventSelect).not.toHaveBeenCalled()
    fireEvent.click(chip())
    expect(onEventSelect).toHaveBeenCalledWith("a")

    onEventChange.mockClear()
    fireEvent.pointerDown(resizeHandle(), { clientY: 100 })
    fireEvent.pointerMove(window, { clientY: 124 })
    fireEvent.pointerMove(window, { clientY: 100 })
    fireEvent.pointerMove(window, { clientY: -500 })
    fireEvent.pointerUp(window)
    expect(onEventChange.mock.calls).toEqual([
      ["a", { start: "2026-11-23T09:15", end: "2026-11-23T11:15" }],
      ["a", { start: "2026-11-23T09:15", end: "2026-11-23T10:45" }],
    ])
    await expectNoAxeViolations()
  })

  it("ends a drag on pointercancel and keeps clicks after a drag that did not move", async () => {
    const onEventChange = vi.fn()
    const onEventSelect = vi.fn()
    const user = userEvent.setup()
    render(<SavingCalendar onEventChange={onEventChange} onEventSelect={onEventSelect} />)
    const chip = () => screen.getByRole("button", { name: /^Focus/ })
    fireEvent.pointerDown(chip(), { clientY: 100 })
    fireEvent.pointerCancel(window)
    fireEvent.pointerMove(window, { clientY: 160 })
    expect(onEventChange).not.toHaveBeenCalled()

    fireEvent.pointerDown(chip(), { clientY: 100 })
    fireEvent.pointerMove(window, { clientY: 102 })
    fireEvent.pointerUp(window)
    fireEvent.click(chip())
    expect(onEventSelect).toHaveBeenCalledTimes(1)

    fireEvent.pointerDown(chip(), { clientY: 100 })
    fireEvent.pointerMove(window, { clientY: 160 })
    fireEvent.pointerUp(window)
    chip().focus()
    await user.keyboard("{Enter}")
    expect(onEventSelect).toHaveBeenCalledTimes(2)
  })

  it("describes the keyboard moves only when events can change", () => {
    render(
      <>
        <CalendarEvent {...focus} onEventChange={vi.fn()} />
        <CalendarEvent {...focus} id="b" label="Still" />
      </>,
    )
    expect(screen.getByRole("button", { name: /^Focus/ })).toHaveAccessibleDescription(
      "Arrow Up and Arrow Down move by 15 minutes. Arrow Left and Arrow Right move by a day. Shift with Arrow Up or Arrow Down changes the end time.",
    )
    expect(screen.getByRole("button", { name: /^Still/ })).not.toHaveAttribute("aria-describedby")
    expect(resizeHandle()).toHaveAttribute("tabindex", "-1")
    expect(resizeHandle()).toHaveAttribute("aria-hidden", "true")
  })

  it("renders the same markup on the server and draws now after hydrating", async () => {
    const ui = <WeekCalendar weekStart="nope" startHour={0} endHour={24} events={[]} />
    const html = renderToString(ui)
    expect(html).not.toContain("data-now")
    const container = document.createElement("div")
    container.innerHTML = html
    document.body.append(container)
    const errors = vi.spyOn(console, "error").mockImplementation(() => {})
    await act(async () => {
      hydrateRoot(container, ui)
    })
    expect(errors).not.toHaveBeenCalled()
    errors.mockRestore()
    expect(container.querySelector("[data-now]")).not.toBeNull()
    container.remove()
  })

  it("moves the now line every minute and stops on unmount", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 23, 12, 0, 0))
    const clear = vi.spyOn(globalThis, "clearInterval")
    const { unmount } = render(<WeekCalendar weekStart="2026-11-22" events={[]} />)
    const top = () => document.querySelector<HTMLElement>("[data-now]")?.style.top
    expect(top()).toBe("40%")
    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1000)
    })
    expect(top()).toBe("50%")
    unmount()
    expect(clear).toHaveBeenCalled()
    clear.mockRestore()
    vi.useRealTimers()
  })

  it("does not tick when now is passed", () => {
    const set = vi.spyOn(globalThis, "setInterval")
    render(<WeekCalendar weekStart="2026-11-22" now="2026-11-23T12:00" events={[]} />)
    expect(set).not.toHaveBeenCalled()
    set.mockRestore()
  })
})
