import { parseCivilDateTime, parseISODate, toCivilDateTime, toISODate } from "./date"

export const HOUR_HEIGHT_PX = 48
export const DEFAULT_SNAP_MINUTES = 15

export interface WeekLayoutEvent {
  id: string
  start: string
  end: string
  label: string
}

export interface EventSegment {
  id: string
  label: string
  start: string
  end: string
  dayIndex: number
  startMin: number
  endMin: number
  col: number
  colCount: number
}

export function civilAbsMinutes(isoDate: string, hours: number, minutes: number) {
  const date = parseISODate(isoDate)
  if (!date) return undefined
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes) / 60_000
}

export function absToCivil(abs: number) {
  const date = new Date(abs * 60_000)
  const isoDate = [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-")
  return toCivilDateTime(isoDate, date.getUTCHours(), date.getUTCMinutes())
}

export function addCivilMinutes(value: string, delta: number) {
  const parsed = parseCivilDateTime(value)
  if (!parsed) return undefined
  const abs = civilAbsMinutes(parsed.isoDate, parsed.hours, parsed.minutes) as number
  return absToCivil(abs + delta)
}

export function shiftInterval(start: string, end: string, delta: number) {
  const nextStart = addCivilMinutes(start, delta)
  const nextEnd = addCivilMinutes(end, delta)
  if (!nextStart || !nextEnd) return undefined
  return { start: nextStart, end: nextEnd }
}

export function resizeIntervalEnd(start: string, end: string, delta: number) {
  const nextEnd = addCivilMinutes(end, delta)
  if (!nextEnd) return undefined
  const startParsed = parseCivilDateTime(start)
  const endParsed = parseCivilDateTime(nextEnd)
  if (!startParsed || !endParsed) return undefined
  const startAbs = civilAbsMinutes(
    startParsed.isoDate,
    startParsed.hours,
    startParsed.minutes,
  ) as number
  const endAbs = civilAbsMinutes(endParsed.isoDate, endParsed.hours, endParsed.minutes) as number
  if (endAbs <= startAbs) return undefined
  return { start, end: nextEnd }
}

export function layoutWeekEvents(
  events: WeekLayoutEvent[],
  days: Date[],
  startHour: number,
  endHour: number,
): EventSegment[] {
  const totalMinutes = (endHour - startHour) * 60
  if (totalMinutes <= 0 || days.length === 0) return []
  const dayIsos = days.map((day) => toISODate(day))
  const raw: Omit<EventSegment, "col" | "colCount">[] = []

  for (const event of events) {
    const start = parseCivilDateTime(event.start)
    const end = parseCivilDateTime(event.end)
    if (!start || !end) continue
    const startAbs = civilAbsMinutes(start.isoDate, start.hours, start.minutes) as number
    const endAbs = civilAbsMinutes(end.isoDate, end.hours, end.minutes) as number
    if (endAbs <= startAbs) continue

    for (const [dayIndex, iso] of dayIsos.entries()) {
      const visStart = civilAbsMinutes(iso, startHour, 0)
      const visEnd = civilAbsMinutes(iso, endHour, 0)
      if (visStart === undefined || visEnd === undefined) continue
      const segStart = Math.max(startAbs, visStart)
      const segEnd = Math.min(endAbs, visEnd)
      if (segEnd <= segStart) continue
      raw.push({
        id: event.id,
        label: event.label,
        start: event.start,
        end: event.end,
        dayIndex,
        startMin: segStart - visStart,
        endMin: segEnd - visStart,
      })
    }
  }

  return packSegments(raw, days.length)
}

function packSegments(raw: Omit<EventSegment, "col" | "colCount">[], dayCount: number) {
  const result: EventSegment[] = []
  for (let dayIndex = 0; dayIndex < dayCount; dayIndex++) {
    const items = raw
      .filter((item) => item.dayIndex === dayIndex)
      .sort((a, b) => {
        const startDiff = a.startMin - b.startMin
        if (startDiff !== 0) return startDiff
        return a.id.localeCompare(b.id)
      })
    const colEnds: number[] = []
    const withCol = items.map((item) => {
      let col = colEnds.findIndex((end) => end <= item.startMin)
      if (col < 0) {
        col = colEnds.length
        colEnds.push(item.endMin)
      } else {
        colEnds[col] = item.endMin
      }
      return { ...item, col }
    })
    const overlaps = (left: (typeof withCol)[number], right: (typeof withCol)[number]) =>
      left.startMin < right.endMin && right.startMin < left.endMin
    const colCount = new Array<number>(withCol.length)
    const visited = new Array<boolean>(withCol.length).fill(false)
    for (let seed = 0; seed < withCol.length; seed++) {
      if (visited[seed]) continue
      const cluster: number[] = []
      const stack = [seed]
      visited[seed] = true
      while (stack.length > 0) {
        const currentIndex = stack.pop() as number
        cluster.push(currentIndex)
        const current = withCol[currentIndex] as (typeof withCol)[number]
        for (let otherIndex = 0; otherIndex < withCol.length; otherIndex++) {
          if (visited[otherIndex]) continue
          const other = withCol[otherIndex] as (typeof withCol)[number]
          if (overlaps(current, other)) {
            visited[otherIndex] = true
            stack.push(otherIndex)
          }
        }
      }
      let width = 1
      for (const index of cluster) {
        const member = withCol[index] as (typeof withCol)[number]
        width = Math.max(width, member.col + 1)
      }
      for (const index of cluster) {
        colCount[index] = width
      }
    }
    withCol.forEach((item, index) => {
      result.push({ ...item, colCount: colCount[index] as number })
    })
  }
  return result
}

export function segmentStyle(segment: EventSegment, dayCount: number, totalMinutes: number) {
  const dayWidth = 100 / dayCount
  return {
    top: `${(segment.startMin / totalMinutes) * 100}%`,
    height: `${((segment.endMin - segment.startMin) / totalMinutes) * 100}%`,
    left: `${(segment.dayIndex + segment.col / segment.colCount) * dayWidth}%`,
    width: `${dayWidth / segment.colCount}%`,
  }
}

export function nowIndicatorTop(now: string, days: Date[], startHour: number, endHour: number) {
  const parsed = parseCivilDateTime(now)
  if (!parsed) return undefined
  const dayIndex = days.findIndex((day) => toISODate(day) === parsed.isoDate)
  if (dayIndex < 0) return undefined
  const minutes = parsed.hours * 60 + parsed.minutes - startHour * 60
  const total = (endHour - startHour) * 60
  if (total <= 0 || minutes < 0 || minutes > total) return undefined
  return { dayIndex, top: `${(minutes / total) * 100}%` }
}

export function snapDelta(px: number, snap = DEFAULT_SNAP_MINUTES) {
  const minutes = px / (HOUR_HEIGHT_PX / 60)
  return Math.round(minutes / snap) * snap
}

export function toNowCivil(date: Date) {
  return toCivilDateTime(toISODate(date), date.getHours(), date.getMinutes())
}

export function slotEnd(isoDate: string, hour: number) {
  if (hour >= 23) {
    const date = parseISODate(isoDate)
    if (!date) return toCivilDateTime(isoDate, 23, 59)
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    return toCivilDateTime(toISODate(next), 0, 0)
  }
  return toCivilDateTime(isoDate, hour + 1, 0)
}
