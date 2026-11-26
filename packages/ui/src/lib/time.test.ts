import { describe, expect, it, vi } from "vitest"
import {
  displayTime,
  formatIsoDuration,
  formatTime,
  fromClockParts,
  minutesToTime,
  nowTime,
  parseTime,
  timeToMinutes,
  toClockParts,
} from "./time"

describe("time helpers", () => {
  it("round-trips HH:mm", () => {
    expect(parseTime("09:05")).toEqual({ hours: 9, minutes: 5 })
    expect(formatTime(9, 5)).toBe("09:05")
  })

  it("rejects invalid times", () => {
    expect(parseTime("24:00")).toBeUndefined()
    expect(parseTime("12:60")).toBeUndefined()
  })

  it("converts 12-hour clock parts", () => {
    expect(toClockParts(0, 5)).toEqual({ hour12: 12, minutes: 5, period: "AM" })
    expect(toClockParts(14, 30)).toEqual({ hour12: 2, minutes: 30, period: "PM" })
    expect(fromClockParts(12, 0, "AM")).toEqual({ hours: 0, minutes: 0 })
    expect(fromClockParts(2, 30, "PM")).toEqual({ hours: 14, minutes: 30 })
  })

  it("snaps now to the minute step", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 26, 14, 37, 0))
    expect(nowTime(5)).toBe("14:35")
    vi.useRealTimers()
  })

  it("formats a 12-hour display string", () => {
    expect(displayTime("not-a-time")).toBe("")
    expect(displayTime("09:30")).toMatch(/9:30/i)
  })

  it("converts minutes and ISO durations", () => {
    expect(timeToMinutes("09:30")).toBe(570)
    expect(timeToMinutes("nope")).toBeUndefined()
    expect(minutesToTime(90)).toBe("01:30")
    expect(minutesToTime(-5)).toBe("00:00")
    expect(formatIsoDuration(90)).toBe("PT1H30M")
  })
})
