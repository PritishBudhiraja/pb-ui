export function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function parseISODate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return undefined
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return undefined
  }
  return date
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1)
}

export function addDays(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + count)
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function compareISODate(a: string, b: string) {
  return a.localeCompare(b)
}

export function startOfWeek(date: Date, weekStartsOn = 0) {
  const offset = (date.getDay() - weekStartsOn + 7) % 7
  return addDays(date, -offset)
}

export function weekDays(weekStart: Date) {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
}

export function isISODateInRange(iso: string, from?: string, to?: string) {
  if (from && iso < from) return false
  if (to && iso > to) return false
  return Boolean(from || to)
}

export function parseCivilDateTime(value: string) {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/.exec(value)
  if (!match?.[1] || !match[2]) return undefined
  const date = parseISODate(match[1])
  if (!date) return undefined
  const [hours, minutes] = match[2].split(":").map(Number) as [number, number]
  if (hours > 23 || minutes > 59) return undefined
  return { date, isoDate: match[1], hours, minutes }
}

export function toCivilDateTime(isoDate: string, hours: number, minutes: number) {
  return `${isoDate}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

export function calendarWeeks(month: Date, weekStartsOn = 0) {
  const first = startOfMonth(month)
  const startOffset = (first.getDay() - weekStartsOn + 7) % 7
  const days: Date[] = []
  for (let index = 0; index < 42; index++) {
    days.push(new Date(first.getFullYear(), first.getMonth(), 1 - startOffset + index))
  }
  const weeks: Date[][] = []
  for (let index = 0; index < 6; index++) {
    weeks.push(days.slice(index * 7, index * 7 + 7))
  }
  return weeks
}
