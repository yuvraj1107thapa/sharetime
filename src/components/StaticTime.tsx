import type { DateTime } from 'luxon'

type Props = {
  displayTime: DateTime
}

export default function StaticTime ({ displayTime }: Props) {
  return (
    <time className="is-block is-size-4 has-text-weight-bold" dateTime={displayTime.toISO() ?? undefined}>
      {displayTime.toFormat('hh:mm a')}
    </time>
  )
}
