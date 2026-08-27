import { DateTime } from 'luxon'
import { toMilitaryFormat } from './parse'

export type ConvertedTime = {
  displayTime: DateTime
  localTime: DateTime
  dayDelta?: string
}

const calendarDay = (dt: DateTime) => DateTime.utc(dt.year, dt.month, dt.day)

/**
 * Takes a time string (any format parse.ts accepts) as "today" in `zone` and
 * converts it to `localZone` (the viewer's zone by default).
 */
export function convertTime (timeStr: string, zone: string, localZone = 'local'): ConvertedTime {
  const military = toMilitaryFormat(timeStr) ?? '0000'
  const displayTime = DateTime.fromFormat(military, 'HHmm', { zone })
  const localTime = displayTime.setZone(localZone)

  // Compare calendar dates, not day-of-month, so 31 Jan -> 1 Feb still reads as +1 day
  const days = calendarDay(localTime).diff(calendarDay(displayTime), 'days').days
  let dayDelta: string | undefined
  if (days === 1) {
    dayDelta = '(+1 day)'
  } else if (days === -1) {
    dayDelta = '(-1 day)'
  }

  return { displayTime, localTime, dayDelta }
}
