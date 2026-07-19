import { checkValidTZ, getDisplayTZ, resolveTimezone } from '@/data/timezones'

describe('getDisplayTZ', () => {
  it('returns the IANA zone for an unambiguous abbreviation', () => {
    expect(getDisplayTZ('PST')).toBe('America/Los_Angeles')
    expect(getDisplayTZ('IST')).toBe('Asia/Kolkata')
  })

  it('returns every candidate for an ambiguous abbreviation', () => {
    const result = getDisplayTZ('KST')
    expect(Array.isArray(result)).toBe(true)
    expect((result as unknown[]).length).toBeGreaterThan(1)
  })

  it('returns null for an unknown abbreviation', () => {
    expect(getDisplayTZ('XYZQ')).toBeNull()
  })
})

describe('checkValidTZ', () => {
  it('accepts IANA zones and rejects garbage', () => {
    expect(checkValidTZ('Europe/Berlin')).toBe('Europe/Berlin')
    expect(checkValidTZ('Mars/Olympus')).toBeUndefined()
  })
})

describe('resolveTimezone', () => {
  it('resolves abbreviation routes', () => {
    const state = resolveTimezone({ tz: 'PST' })
    expect(state).toMatchObject({ displayTZ: 'America/Los_Angeles', displayTZAbbr: 'PST', showTime: true })
  })

  it('flags ambiguous abbreviations', () => {
    const state = resolveTimezone({ tz: 'KST' })
    expect(state.showAmbiguous).toBe(true)
    expect(state.showTime).toBe(false)
    expect(state.possibleTZs.length).toBeGreaterThan(1)
  })

  it('flags unknown abbreviations', () => {
    const state = resolveTimezone({ tz: 'XYZQ' })
    expect(state).toMatchObject({ displayTZ: 'XYZQ', showTZError: true, showTime: false })
  })

  it('resolves IANA routes', () => {
    const state = resolveTimezone({ continent: 'Europe', city: 'Berlin' })
    expect(state).toMatchObject({ displayTZ: 'Europe/Berlin', displayTZAbbr: 'Europe/Berlin', showTime: true })
  })

  it('flags invalid IANA routes', () => {
    const state = resolveTimezone({ continent: 'Mars', city: 'Olympus' })
    expect(state).toMatchObject({ displayTZ: 'Mars/Olympus', displayTZAbbr: 'NA', showTZError: true })
  })
})
