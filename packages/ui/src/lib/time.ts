export function parseTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value)
  if (!match) return undefined
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) return undefined
  return { hours, minutes }
}

export function formatTime(hours: number, minutes: number) {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

export function currentTime(minuteStep = 5) {
  const now = new Date()
  const raw = now.getMinutes()
  const minutes = Math.min(59 - (59 % minuteStep), Math.floor(raw / minuteStep) * minuteStep)
  return { hours: now.getHours(), minutes }
}

export function nowTime(minuteStep = 5) {
  const { hours, minutes } = currentTime(minuteStep)
  return formatTime(hours, minutes)
}

export function displayTime(value: string, locale?: string) {
  const parsed = parseTime(value)
  if (!parsed) return ""
  const date = new Date()
  date.setHours(parsed.hours, parsed.minutes, 0, 0)
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

export function toClockParts(hours: number, minutes: number) {
  const period: "AM" | "PM" = hours >= 12 ? "PM" : "AM"
  const hour12 = hours % 12 === 0 ? 12 : hours % 12
  return { hour12, minutes, period }
}

export function fromClockParts(hour12: number, minutes: number, period: "AM" | "PM") {
  const normalized = hour12 === 12 ? 0 : hour12
  const hours = period === "PM" ? normalized + 12 : normalized
  return { hours, minutes }
}
