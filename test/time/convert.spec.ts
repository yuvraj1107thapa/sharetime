import { convertTime } from '@/time/convert'

describe('convertTime', () => {
  it('converts a time between zones', () => {
    const { displayTime, localTime } = convertTime('6pm', 'America/Los_Angeles', 'America/New_York')
    expect(displayTime.toFormat('HH:mm')).toBe('18:00')
    expect(localTime.toFormat('HH:mm')).toBe('21:00')
    expect(localTime.toMillis()).toBe(displayTime.toMillis())
  })

  it('reports a day delta when the date changes', () => {
    expect(convertTime('2200', 'America/Los_Angeles', 'Asia/Kolkata').dayDelta).toBe('(+1 day)')
    expect(convertTime('0100', 'Asia/Kolkata', 'America/Los_Angeles').dayDelta).toBe('(-1 day)')
    expect(convertTime('1200', 'Europe/Berlin', 'Europe/Paris').dayDelta).toBeUndefined()
  })

  it('uses calendar dates across a month boundary', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-31T12:00:00Z'))
    try {
      expect(convertTime('2300', 'America/Los_Angeles', 'Asia/Tokyo').dayDelta).toBe('(+1 day)')
    } finally {
      vi.useRealTimers()
    }
  })
})
