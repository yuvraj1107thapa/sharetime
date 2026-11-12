import { Outlet } from 'react-router-dom'
import NavBar from '@/components/NavBar'

export default function DefaultLayout () {
  return (
    <div>
      <a className="skip-link" href="#content">Skip to content</a>
      <NavBar />
      <main id="content" className="container is-fluid" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  )
}
