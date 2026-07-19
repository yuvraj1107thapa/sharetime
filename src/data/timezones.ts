import tzabbrmap from 'tzabbrmap'

export type TimeZone = {
  value: string
  text: string
  utc: string[]
}

export type TimezoneParams = {
  tz?: string
  continent?: string
  city?: string
}

export type TimezoneState = {
  displayTZ: string
  displayTZAbbr: string
  possibleTZs: TimeZone[]
  showAmbiguous: boolean
  showTZError: boolean
  showTime: boolean
}

const timezones = tzabbrmap as Record<string, TimeZone[]>

export function getDisplayTZ (tzAbbr: string): string | TimeZone[] | null {
  const possibleTZs = timezones[tzAbbr]
  if (possibleTZs === undefined || possibleTZs.length === 0) {
    return null
  } else if (possibleTZs.length === 1) {
    return possibleTZs[0].utc[0]
  } else {
    return possibleTZs
  }
}

export function checkValidTZ (tz: string): string | undefined {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
    return tz
  } catch {
    return undefined
  }
}

/**
 * Works out which timezone a route refers to. Abbreviation routes (/PST/...)
 * go through tzabbrmap; IANA routes (/Europe/Berlin/...) are checked with Intl.
 */
export function resolveTimezone (params: TimezoneParams): TimezoneState {
  let displayTZ = 'Asia/Kolkata'
  let displayTZAbbr = 'IST'
  let possibleTZs: TimeZone[] = []
  let showAmbiguous = false
  let showTZError = false

  if (params.continent && params.city) {
    displayTZ = `${params.continent}/${params.city}`
    const validTZ = checkValidTZ(displayTZ)
    if (validTZ === undefined) {
      showTZError = true
      displayTZAbbr = 'NA'
    } else {
      displayTZAbbr = validTZ
    }
  } else if (params.tz) {
    const result = getDisplayTZ(params.tz)
    if (typeof result === 'string') {
      displayTZ = result
      displayTZAbbr = params.tz
    } else if (result === null) {
      showTZError = true
      displayTZ = params.tz
    } else {
      showAmbiguous = true
      displayTZ = params.tz
      possibleTZs = result
    }
  }

  return {
    displayTZ,
    displayTZAbbr,
    possibleTZs,
    showAmbiguous,
    showTZError,
    showTime: !(showAmbiguous || showTZError)
  }
}
