import { Link, useParams } from 'react-router-dom'
import type { TimeZone } from '@/data/timezones'

type Props = {
  possibleTZs: TimeZone[]
}

export default function DisambiguateTZ ({ possibleTZs }: Props) {
  const { tz, time } = useParams()

  return (
    <div className="about has-text-centered">
      <div className="my-4">
        <div className="has-text-weight-bold has-text-info is-size-5">{tz}</div>
        could mean multiple timezones
        <br />
        please pick one
      </div>
      {possibleTZs.map(option => (
        <div className="my-1" key={option.value}>
          <Link to={`/${option.utc[0]}/${time ?? 'now'}`}>▶ {option.value}</Link>
        </div>
      ))}
    </div>
  )
}
