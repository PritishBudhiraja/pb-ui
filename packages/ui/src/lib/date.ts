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

export function calendarWeeks(month: Date) {
  const first = startOfMonth(month)
  const startOffset = first.getDay()
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
