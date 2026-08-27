import type { DateTime } from 'luxon'

type Props = {
  displayTime: DateTime
}

export default function StaticTime ({ displayTime }: Props) {
  return (
    <div className="is-size-4 has-text-weight-bold">
      {displayTime.toFormat('hh:mm a')}
    </div>
  )
}
