import { describe, expect, it } from "vitest"
import {
  addMonths,
  calendarWeeks,
  compareISODate,
  isSameDay,
  parseISODate,
  toISODate,
} from "./date"

describe("date helpers", () => {
  it("round-trips a local ISO date", () => {
    const parsed = parseISODate("2026-11-26")
    expect(parsed).toBeDefined()
    if (!parsed) return
    expect(toISODate(parsed)).toBe("2026-11-26")
  })

  it("rejects impossible days", () => {
    expect(parseISODate("2026-02-31")).toBeUndefined()
    expect(parseISODate("nope")).toBeUndefined()
  })

  it("builds six week rows", () => {
    expect(calendarWeeks(new Date(2026, 10, 1))).toHaveLength(6)
  })

  it("compares and shifts days", () => {
    const day = new Date(2026, 10, 26)
    expect(isSameDay(day, new Date(2026, 10, 26))).toBe(true)
    expect(isSameDay(day, new Date(2026, 9, 26))).toBe(false)
    expect(addMonths(day, 1).getMonth()).toBe(11)
    expect(compareISODate("2026-01-02", "2026-01-01")).toBeGreaterThan(0)
  })
})
