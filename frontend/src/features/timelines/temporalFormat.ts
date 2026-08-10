/** Signed year: -500 = 500 a.C.; positive = era común. Year 0 is invalid. */

export function formatYear(year: number): string {
  if (year === 0) {
    return '—'
  }
  if (year < 0) {
    return `${Math.abs(year)} a.C.`
  }
  return String(year)
}

export function formatTemporalDate(
  year: number,
  month?: number | null,
  day?: number | null,
): string {
  const base = formatYear(year)
  if (month == null) {
    return base
  }
  const mm = String(month).padStart(2, '0')
  if (day == null) {
    return `${mm}/${base}`
  }
  const dd = String(day).padStart(2, '0')
  return `${dd}/${mm}/${base}`
}

export type YearInput = {
  year: number
  isBce: boolean
}

export function parseYearInput(raw: string, isBce: boolean): number | null {
  const trimmed = raw.trim().replace(/\s*a\.?\s*c\.?/i, '')
  const n = Number.parseInt(trimmed, 10)
  if (!Number.isFinite(n) || n === 0) {
    return null
  }
  const abs = Math.abs(n)
  return isBce ? -abs : abs
}

export function yearToInput(year: number): YearInput {
  return {
    year: Math.abs(year),
    isBce: year < 0,
  }
}

export function currentCalendarYear(): number {
  return new Date().getFullYear()
}
