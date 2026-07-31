import { SITE_NAME } from '@/config'

export default function Home () {
  return (
    <div className="home">
      <div>
        <p>Welcome to <code>{SITE_NAME}</code></p>
        <p>The no-nonsense website to convert time to other timezones.</p>
      </div>
    </div>
  )
}
