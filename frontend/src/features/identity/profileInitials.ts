/** First Unicode letter in a string, uppercased; empty if none. */
function firstLetter(value: string): string {
  const trimmed = value.trim()
  for (const char of trimmed) {
    if (/\p{L}/u.test(char)) {
      return char.toLocaleUpperCase()
    }
  }
  return ''
}

/**
 * Initials from nombre + apellidos.
 * Compound apellidos use the first letter of the whole field (e.g. "De la Cruz" → D).
 */
export function getProfileInitials(
  firstName: string | null | undefined,
  lastName: string | null | undefined,
): string {
  const a = firstLetter(firstName ?? '')
  const b = firstLetter(lastName ?? '')
  if (a && b) {
    return `${a}${b}`
  }
  if (a || b) {
    return a || b
  }
  return '?'
}

export function getProfileFirstName(
  profile: {
    first_name?: string | null
    display_name?: string | null
    username?: string | null
  } | null,
): string {
  const first = (profile?.first_name ?? '').trim()
  if (first) {
    return first
  }
  const display = (profile?.display_name ?? '').trim()
  if (display) {
    return display.split(/\s+/)[0] ?? display
  }
  return (profile?.username ?? '').trim()
}
