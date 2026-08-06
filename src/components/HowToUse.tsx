import { Link } from 'react-router-dom'
import { SITE_HOST, SITE_NAME } from '@/config'

type Example = {
  path: string
  description: React.ReactNode
}

const shareExamples: Example[] = [
  {
    path: '/PST/1500',
    description: <>Share the time <code>3:00PM</code> of <code>PST (Pacific Standard Time)</code></>
  },
  {
    path: '/Europe/Berlin/1100',
    description: <>Share the time <code>11:00AM</code> of <code>Europe/Berlin</code></>
  },
  {
    path: '/PST/3pm',
    description: <>Share the time <code>3:00PM</code> of <code>PST</code> (12-hour)</>
  },
  {
    path: '/Europe/Berlin/4:45pm',
    description: <>Share the time <code>4:45PM</code> of <code>Europe/Berlin</code> (12-hour)</>
  }
]

const nowExamples: Example[] = [
  {
    path: '/PST/now',
    description: <>See the time <b><i>right now</i></b> in <code>PST (Pacific Standard Time)</code></>
  },
  {
    path: '/Europe/Berlin/now',
    description: <>See the time <b><i>right now</i></b> in <code>Europe/Berlin</code> timezone</>
  }
]

function ExampleList ({ examples }: { examples: Example[] }) {
  return (
    <ul>
      {examples.map(example => (
        <li className="my-2" key={example.path}>
          {example.description}
          <br />
          <Link to={example.path}>{SITE_HOST}{example.path}</Link>
        </li>
      ))}
    </ul>
  )
}

export default function HowToUse () {
  return (
    <main>
      <section>
        <h1 className="title is-size-4 p-3 mt-4">
          How does <code>{SITE_NAME}</code> work?
        </h1>
        <div className="container is-fluid">
          <p>There are 2 things you can do with <code>{SITE_NAME}</code>:</p>
          <ol>
            <li><em>Share time in particular timezone</em></li>
            <li><em>See current time in a particular timezone</em></li>
          </ol>
        </div>
      </section>

      <section className="p-2 mt-2">
        <h2 className="title is-4">Sharing time in particular timezone</h2>
        <h6 className="subtitle is-6">
          When opened by anyone they will see the time translated to their local timezone
        </h6>
        <div>
          <p className="has-text-weight-bold">Examples</p>
          <p>
            Supported formats: 24-hour (e.g. <code>/PST/1500</code>) or 12-hour
            with <code>am</code>/<code>pm</code> (e.g. <code>/PST/3pm</code>, <code>/Europe/Berlin/4:45pm</code>).
          </p>
          <ExampleList examples={shareExamples} />
        </div>
      </section>

      <section className="p-2 mt-2">
        <h2 className="title is-4">Show current time in particular timezone</h2>
        <div>
          <p className="has-text-weight-bold">Examples</p>
          <ExampleList examples={nowExamples} />
        </div>
      </section>
    </main>
  )
}
