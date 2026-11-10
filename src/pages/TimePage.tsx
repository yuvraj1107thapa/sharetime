import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import DisambiguateTZ from '@/components/DisambiguateTZ'
import InvalidTZError from '@/components/InvalidTZError'
import StaticTime from '@/components/StaticTime'
import { isValidTZAbbrParam } from '@/data/routes'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useTimezone } from '@/hooks/useTimezone'
import { convertTime } from '@/time/convert'
import { isValidTimeString } from '@/time/parse'
import NotFound from './NotFound'

export default function TimePage () {
  const { tz, time = '' } = useParams()
  const { displayTZ, displayTZAbbr, showTime, showTZError, showAmbiguous, possibleTZs } = useTimezone()
  const converted = useMemo(() => convertTime(time, displayTZ), [time, displayTZ])
  useDocumentTitle(`${time} ${tz ?? displayTZ} in your timezone`)

  const validTZ = tz === undefined || isValidTZAbbrParam(tz)
  if (!validTZ || !isValidTimeString(time)) {
    return <NotFound />
  }

  return (
    <div>
      {showTime && (
        <div className="column is-centered has-text-centered">
          <StaticTime displayTime={converted.displayTime} />
          in the timezone
          <div className="has-text-weight-bold">({displayTZAbbr}) {displayTZ}</div>
          at your place is
          <StaticTime displayTime={converted.localTime} />
          {converted.dayDelta && <span> {converted.dayDelta} </span>}
        </div>
      )}
      {showTZError && <InvalidTZError displayTZ={displayTZ} />}
      {showAmbiguous && <DisambiguateTZ possibleTZs={possibleTZs} />}
    </div>
  )
}
