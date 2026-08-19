const TZ_ABBR_PATTERN = /([A-Z]{2,4})/

export function isValidTZAbbrParam (tz: string | undefined): boolean {
  return tz !== undefined && TZ_ABBR_PATTERN.test(tz)
}
