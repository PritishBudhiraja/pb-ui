import { describe, expect, it } from "vitest"
import { type HeatmapDay, weeksFromDays } from "./calendar-heatmap"

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
})
