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
    <div className="is-size-4 has-text-weight-bold">
      {displayTime.toFormat('hh:mm:ss a')}
    </div>
  )
}
