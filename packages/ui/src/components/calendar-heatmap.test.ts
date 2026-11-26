import { describe, expect, it } from "vitest"
import { type HeatmapDay, monthLabels, toHeatmapLevel, weeksFromDays } from "./calendar-heatmap"

describe("weeksFromDays", () => {
  it("returns empty weeks for empty input", () => {
    expect(weeksFromDays([])).toEqual([])
  })

  it("fills missing dates between first and last", () => {
    const days: HeatmapDay[] = [
      { date: "2026-01-01", count: 1, level: 1 },
      { date: "2026-01-03", count: 2, level: 2 },
    ]
    const weeks = weeksFromDays(days)
    const flattened = weeks.flat().filter(Boolean)
    expect(flattened).toHaveLength(3)
    expect(flattened[1]?.date).toBe("2026-01-02")
    expect(flattened[1]?.count).toBe(0)
  })

  it("returns empty weeks for invalid dates", () => {
    expect(weeksFromDays([{ date: "nope", count: 0, level: 0 }])).toEqual([])
  })

  it("pads a partial last week", () => {
    const weeks = weeksFromDays([
      { date: "2026-01-01", count: 1, level: 1 },
      { date: "2026-01-02", count: 1, level: 1 },
    ])
    expect(weeks.at(-1)).toHaveLength(7)
  })

  it("clamps heatmap levels", () => {
    expect(toHeatmapLevel(-1)).toBe(0)
    expect(toHeatmapLevel(9)).toBe(4)
  })

  it("builds month labels including empty and invalid weeks", () => {
    expect(monthLabels([[null, null, null, null, null, null, null]])).toEqual([])
    expect(
      monthLabels([
        [{ date: "not-a-date", count: 0, level: 0 }],
        [{ date: "2026-01-05", count: 1, level: 1 }],
        [{ date: "2026-01-12", count: 1, level: 1 }],
        [{ date: "2026-02-02", count: 1, level: 1 }],
      ]),
    ).toEqual([
      { index: 0, label: "Jan" },
      { index: 1, label: "Jan" },
      { index: 3, label: "Feb" },
    ])
  })

  it("handles days given out of order", () => {
    const weeks = weeksFromDays([
      { date: "2026-01-03", count: 2, level: 2 },
      { date: "2026-01-01", count: 1, level: 1 },
    ])
    const dates = weeks
      .flat()
      .filter(Boolean)
      .map((day) => day?.date)
    expect(dates).toEqual(["2026-01-01", "2026-01-02", "2026-01-03"])
  })
})
