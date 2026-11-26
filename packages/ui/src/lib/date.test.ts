import { describe, expect, it } from "vitest"
import {
  addMonths,
  calendarWeeks,
  compareISODate,
  isISODateInRange,
  isSameDay,
  parseCivilDateTime,
  parseISODate,
  startOfWeek,
  toCivilDateTime,
  toISODate,
  weekDays,
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

  it("builds a week and civil date-times", () => {
    const start = startOfWeek(new Date(2026, 10, 26), 0)
    expect(toISODate(start)).toBe("2026-11-22")
    expect(weekDays(start)).toHaveLength(7)
    expect(isISODateInRange("2026-11-24", "2026-11-23", "2026-11-25")).toBe(true)
    expect(isISODateInRange("2026-11-22", "2026-11-23", "2026-11-25")).toBe(false)
    expect(isISODateInRange("2026-11-26", "2026-11-23", "2026-11-25")).toBe(false)
    expect(isISODateInRange("2026-11-22")).toBe(false)
    expect(parseCivilDateTime("2026-11-26T09:30")).toMatchObject({
      isoDate: "2026-11-26",
      hours: 9,
      minutes: 30,
    })
    expect(parseCivilDateTime("nope")).toBeUndefined()
    expect(parseCivilDateTime("2026-02-31T09:00")).toBeUndefined()
    expect(parseCivilDateTime("2026-11-26T24:00")).toBeUndefined()
    expect(toCivilDateTime("2026-11-26", 9, 5)).toBe("2026-11-26T09:05")
  })
})
