import { Link } from 'react-router-dom'
import HowToUse from '@/components/HowToUse'
import { SITE_NAME, SITE_URL } from '@/config'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Home () {
  useDocumentTitle()
  return (
    <div className="home">
      <div>
        <p>Welcome to <code>{SITE_NAME}</code></p>
        <p>The no-nonsense website to convert time to other timezones.</p>
      </div>
      <div className="mt-5 content">
        <p className="has-text-weight-bold">How to use it:</p>
        <p>
          Imagine you're in San Francisco and want to set up a meeting with people
          in London and Singapore. You can send a message like:
        </p>
        <div className="box mt-3">
          <code>"I'm in SF right now, do you want to meet at [4pm my time]({SITE_URL}/PST/4pm)?"</code>
          <p>
            "I'm in SF right now, do you want to meet at <Link to="/PST/4pm">4pm my time</Link>?"
          </p>
        </div>
        <p>
          When your colleagues click the link, they'll see what time 4pm PST is in
          their own timezone. <br /> Click and try it out for yourself!
        </p>
      </div>
      <HowToUse />
    </div>
  )
}
