import { describe, expect, it } from "vitest"
import { weekDays } from "./date"
import {
  absToCivil,
  addCivilMinutes,
  civilAbsMinutes,
  layoutWeekEvents,
  nowIndicatorTop,
  resizeIntervalEnd,
  segmentStyle,
  shiftInterval,
  slotEnd,
  snapDelta,
  toNowCivil,
} from "./week-event-layout"

const week = weekDays(new Date(2026, 10, 22))

describe("week event layout", () => {
  it("packs a chain of three overlapping events", () => {
    const laid = layoutWeekEvents(
      [
        { id: "a", start: "2026-11-23T09:00", end: "2026-11-23T11:00", label: "A" },
        { id: "b", start: "2026-11-23T10:00", end: "2026-11-23T12:00", label: "B" },
        { id: "c", start: "2026-11-23T11:00", end: "2026-11-23T13:00", label: "C" },
      ],
      week,
      8,
      18,
    )
    expect(laid.every((item) => item.colCount >= 2)).toBe(true)
  })

  it("packs overlapping events into columns", () => {
    const laid = layoutWeekEvents(
      [
        { id: "z", start: "2026-11-23T09:00", end: "2026-11-23T10:00", label: "Z" },
        { id: "a", start: "2026-11-23T09:00", end: "2026-11-23T11:00", label: "A" },
        { id: "b", start: "2026-11-23T10:00", end: "2026-11-23T12:00", label: "B" },
      ],
      week,
      8,
      18,
    )
    expect(laid).toHaveLength(3)
    expect(new Set(laid.map((item) => item.col)).size).toBe(2)
    expect(laid[0]?.colCount).toBe(2)
    const first = laid[0]
    if (!first) throw new Error("expected a segment")
    const style = segmentStyle(first, 7, 10 * 60)
    expect(style.width).toContain("%")
  })

  it("splits cross-midnight and multi-day events and clips hours", () => {
    const laid = layoutWeekEvents(
      [
        { id: "night", start: "2026-11-23T22:00", end: "2026-11-24T02:00", label: "Night" },
        { id: "span", start: "2026-11-23T16:00", end: "2026-11-25T10:00", label: "Span" },
        { id: "edge", start: "2026-11-23T17:00", end: "2026-11-23T20:00", label: "Edge" },
      ],
      week,
      8,
      18,
    )
    expect(laid.filter((item) => item.id === "night")).toHaveLength(0)
    expect(laid.filter((item) => item.id === "span").length).toBeGreaterThan(1)
    const edge = laid.find((item) => item.id === "edge")
    expect(edge?.endMin).toBe(10 * 60)
  })

  it("drops invalid and zero-length intervals", () => {
    expect(
      layoutWeekEvents(
        [
          { id: "bad", start: "nope", end: "nope", label: "Bad" },
          { id: "zero", start: "2026-11-23T09:00", end: "2026-11-23T09:00", label: "Zero" },
          { id: "back", start: "2026-11-23T11:00", end: "2026-11-23T09:00", label: "Back" },
          { id: "out", start: "2026-01-01T09:00", end: "2026-01-01T10:00", label: "Out" },
        ],
        week,
        8,
        18,
      ),
    ).toEqual([])
    expect(layoutWeekEvents([], week, 18, 8)).toEqual([])
    expect(layoutWeekEvents([], [], 8, 18)).toEqual([])
    expect(
      layoutWeekEvents(
        [{ id: "ok", start: "2026-11-23T09:00", end: "2026-11-23T10:00", label: "Ok" }],
        [new Date("invalid")],
        8,
        18,
      ),
    ).toEqual([])
  })

  it("places the now indicator and snaps pointer deltas", () => {
    expect(nowIndicatorTop("2026-11-23T12:00", week, 8, 18)?.dayIndex).toBe(1)
    expect(nowIndicatorTop("2026-11-23T07:00", week, 8, 18)).toBeUndefined()
    expect(nowIndicatorTop("nope", week, 8, 18)).toBeUndefined()
    expect(nowIndicatorTop("2026-11-23T12:00", week, 18, 8)).toBeUndefined()
    expect(nowIndicatorTop("2026-01-01T12:00", week, 8, 18)).toBeUndefined()
    expect(snapDelta(48)).toBe(60)
    expect(snapDelta(4)).toBe(0)
    expect(toNowCivil(new Date(2026, 10, 23, 9, 5))).toBe("2026-11-23T09:05")
    expect(slotEnd("2026-11-23", 9)).toBe("2026-11-23T10:00")
    expect(slotEnd("2026-11-23", 23)).toBe("2026-11-24T00:00")
    expect(slotEnd("nope", 23)).toBe("nopeT23:59")
  })

  it("shifts and resizes civil intervals", () => {
    expect(shiftInterval("2026-11-23T09:00", "2026-11-23T10:00", 60)).toEqual({
      start: "2026-11-23T10:00",
      end: "2026-11-23T11:00",
    })
    expect(resizeIntervalEnd("2026-11-23T09:00", "2026-11-23T10:00", 30)?.end).toBe(
      "2026-11-23T10:30",
    )
    expect(resizeIntervalEnd("2026-11-23T09:00", "2026-11-23T10:00", -120)).toBeUndefined()
    expect(shiftInterval("nope", "2026-11-23T10:00", 15)).toBeUndefined()
    expect(shiftInterval("2026-11-23T09:00", "nope", 15)).toBeUndefined()
    expect(resizeIntervalEnd("nope", "2026-11-23T10:00", 15)).toBeUndefined()
    expect(addCivilMinutes("nope", 15)).toBeUndefined()
    expect(civilAbsMinutes("2026-02-31", 0, 0)).toBeUndefined()
    expect(absToCivil(civilAbsMinutes("2026-11-23", 9, 0) ?? 0)).toBe("2026-11-23T09:00")
  })

  it("uses separate columns only while events overlap", () => {
    const laid = layoutWeekEvents(
      [
        { id: "a", start: "2026-11-23T09:00", end: "2026-11-23T10:00", label: "A" },
        { id: "b", start: "2026-11-23T10:00", end: "2026-11-23T11:00", label: "B" },
      ],
      week,
      8,
      18,
    )
    expect(laid.every((item) => item.col === 0)).toBe(true)
    expect(laid.every((item) => item.colCount === 1)).toBe(true)
  })
})
