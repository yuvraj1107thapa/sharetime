/**
 * Plain-text responses for cURL clients. Runtime agnostic (only uses Intl), so the
 * same code runs in Netlify Edge Functions (Deno), Vercel Middleware and Vitest.
 * Keep imports relative with explicit .ts extensions so Deno can resolve them.
 */
import { isValidTimeString, toMilitaryFormat } from '../time/parse.ts'

export type TimeZoneEntry = {
  value: string
  text: string
  utc: string[]
}

export type TimezoneMap = Record<string, TimeZoneEntry[]>

export type CurlResult = {
  status: number
  body: string
}

type DateParts = { year: number, month: number, day: number, hour: number, minute: number }

export function isCurlRequest (userAgent: string | null): boolean {
  return userAgent?.toLowerCase().includes('curl') ?? false
}

function partsIn (zone: string, instant: number): DateParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).formatToParts(new Date(instant))
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value)
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') }
}

function offsetMs (zone: string, instant: number): number {
  const p = partsIn(zone, instant)
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute) - Math.floor(instant / 60000) * 60000
}

/** The instant at which the wall clock in `zone` shows hour:minute on today's date there. */
function instantFor (zone: string, hour: number, minute: number, now: number): number {
  const today = partsIn(zone, now)
  const wall = Date.UTC(today.year, today.month - 1, today.day, hour, minute)
  const firstGuess = wall - offsetMs(zone, wall)
  return wall - offsetMs(zone, firstGuess)
}

export function formatClock (zone: string, instant: number): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date(instant))
}

export function isValidZone (zone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: zone })
    return true
  } catch {
    return false
  }
}

function dayDelta (fromZone: string, toZone: string, instant: number): string {
  const a = partsIn(fromZone, instant)
  const b = partsIn(toZone, instant)
  const days = (Date.UTC(b.year, b.month - 1, b.day) - Date.UTC(a.year, a.month - 1, a.day)) / 86400000
  if (days === 1) { return '(+1 day)' }
  if (days === -1) { return '(-1 day)' }
  return ''
}

function nowLine (label: string, zone: string, now: number): string {
  return `Time right now in (${label}) ${zone} is ${formatClock(zone, now)} \n`
}

function timeLine (label: string, zone: string, timeStr: string, clientTZ: string, now: number): string {
  const military = toMilitaryFormat(timeStr) ?? '0000'
  const instant = instantFor(zone, Number(military.slice(0, 2)), Number(military.slice(2)), now)
  const delta = dayDelta(zone, clientTZ, instant)
  return `${timeStr} in (${label}) ${zone} at your timezone will be ${formatClock(clientTZ, instant)}${delta ? ' ' + delta : ''} \n`
}

export function usage (host: string): string {
  return [
    'sharetime - share a time in any timezone',
    '',
    `  curl ${host}/PST/now              current time in PST`,
    `  curl ${host}/IST/6pm              6pm IST in your timezone`,
    `  curl ${host}/Europe/Berlin/18:30  18:30 in Berlin in your timezone`,
    ''
  ].join('\n')
}

/**
 * Returns the response for a cURL request, or null when the request should be
 * passed through untouched (static files).
 */
export function curlResponse (
  pathname: string,
  clientTZ: string,
  timezones: TimezoneMap,
  host: string,
  now: number = Date.now()
): CurlResult | null {
  const segments = decodeURIComponent(pathname).split('/').filter(Boolean)

  if (segments.length === 0) {
    return { status: 200, body: usage(host) }
  }
  if (segments[segments.length - 1].includes('.') && !/^\d/.test(segments[segments.length - 1])) {
    return null
  }
  if (!clientTZ || !isValidZone(clientTZ)) {
    return { status: 400, body: 'Cannot decipher client timezone, sorry\n' }
  }

  const header = `Your timezone detected is ${clientTZ}\n`
  const timeArg = segments[segments.length - 1]

  if (timeArg !== 'now' && !isValidTimeString(timeArg)) {
    return { status: 400, body: `${timeArg} is not a valid time. Try 1800, 18:00, 6pm or 6:30pm\n` }
  }

  const render = (label: string, zone: string) =>
    timeArg === 'now' ? nowLine(label, zone, now) : timeLine(label, zone, timeArg, clientTZ, now)

  if (segments.length === 2) {
    const abbr = segments[0]
    const candidates = timezones[abbr] ?? []
    if (candidates.length === 0) {
      return { status: 404, body: `${abbr} is not a valid timezone\n` }
    }
    if (candidates.length === 1) {
      return { status: 200, body: header + render(abbr, candidates[0].utc[0]) }
    }
    const lines = candidates.map(c => render(c.value, c.utc[0])).join('')
    return { status: 200, body: `${header}Multiple timezones found for (${abbr}) \n${lines}` }
  }

  if (segments.length === 3) {
    const zone = `${segments[0]}/${segments[1]}`
    if (!isValidZone(zone)) {
      return { status: 404, body: `${zone} is not a valid timezone\n` }
    }
    return { status: 200, body: header + render(zone, zone) }
  }

  return { status: 404, body: usage(host) }
}
