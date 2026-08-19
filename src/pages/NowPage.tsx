import { useParams } from 'react-router-dom'
import DisambiguateTZ from '@/components/DisambiguateTZ'
import InvalidTZError from '@/components/InvalidTZError'
import TickerTime from '@/components/TickerTime'
import { isValidTZAbbrParam } from '@/data/routes'
import { useTimezone } from '@/hooks/useTimezone'
import NotFound from './NotFound'

export default function NowPage () {
  const { tz } = useParams()
  const { displayTZ, displayTZAbbr, showTime, showTZError, showAmbiguous, possibleTZs } = useTimezone()

  if (tz !== undefined && !isValidTZAbbrParam(tz)) {
    return <NotFound />
  }

  return (
    <div>
      {showTime && (
        <div className="has-text-centered">
          right now at
          <div className="has-text-weight-bold">({displayTZAbbr}) {displayTZ}</div>
          the time is
          <TickerTime displayTZ={displayTZ} />
        </div>
      )}
      {showTZError && <InvalidTZError displayTZ={displayTZ} />}
      {showAmbiguous && <DisambiguateTZ possibleTZs={possibleTZs} />}
    </div>
  )
}
