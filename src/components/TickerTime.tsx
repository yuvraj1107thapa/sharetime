import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

type Props = {
  displayTZ: string
}

const nowIn = (zone: string) => DateTime.now().setZone(zone)

export default function TickerTime ({ displayTZ }: Props) {
  const [displayTime, setDisplayTime] = useState(() => nowIn(displayTZ))

  useEffect(() => {
    setDisplayTime(nowIn(displayTZ))
    const ticker = setInterval(() => setDisplayTime(nowIn(displayTZ)), 1000)
    return () => clearInterval(ticker)
  }, [displayTZ])

  return (
    // Updates every second, so keep it out of the live region to avoid flooding screen readers
    <time className="is-block is-size-4 has-text-weight-bold" aria-live="off" dateTime={displayTime.toISO() ?? undefined}>
      {displayTime.toFormat('hh:mm:ss a')}
    </time>
  )
}
