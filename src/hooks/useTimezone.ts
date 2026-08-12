import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { resolveTimezone, type TimezoneState } from '@/data/timezones'

export function useTimezone (): TimezoneState {
  const { tz, continent, city } = useParams()
  return useMemo(() => resolveTimezone({ tz, continent, city }), [tz, continent, city])
}
