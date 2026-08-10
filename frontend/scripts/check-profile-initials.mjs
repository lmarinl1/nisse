import assert from 'node:assert/strict'

function firstLetter(value) {
  const trimmed = String(value ?? '').trim()
  for (const char of trimmed) {
    if (/\p{L}/u.test(char)) {
      return char.toLocaleUpperCase()
    }
  }
  return ''
}

function getProfileInitials(firstName, lastName) {
  const a = firstLetter(firstName)
  const b = firstLetter(lastName)
  if (a && b) return `${a}${b}`
  if (a || b) return a || b
  return '?'
}

assert.equal(getProfileInitials('Miguel', 'García López'), 'MG')
assert.equal(getProfileInitials('Miguel', 'De la Cruz'), 'MD')
assert.equal(getProfileInitials('ana', 'pérez'), 'AP')
assert.equal(getProfileInitials('Miguel', ''), 'M')
assert.equal(getProfileInitials('', 'García'), 'G')
assert.equal(getProfileInitials('', ''), '?')
assert.equal(getProfileInitials(null, undefined), '?')
assert.equal(getProfileInitials('  Élodie  ', ' Ñuñez '), 'ÉÑ')

console.log('profileInitials check: ok')
