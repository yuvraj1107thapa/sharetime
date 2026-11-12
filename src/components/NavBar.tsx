import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE_NAME } from '@/config'

export default function NavBar () {
  const [expanded, setExpanded] = useState(false)
  const close = () => setExpanded(false)

  return (
    <nav className="navbar" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item has-text-primary-dark has-text-weight-bold" onClick={close}>
          \ {SITE_NAME} \
        </Link>
        <button
          type="button"
          className={`navbar-burger${expanded ? ' is-active' : ''}`}
          aria-label={expanded ? 'Close menu' : 'Open menu'}
          aria-expanded={expanded}
          aria-controls="navMenu"
          onClick={() => setExpanded(value => !value)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div id="navMenu" className={`navbar-menu${expanded ? ' is-active' : ''}`}>
        <div className="navbar-start">
          <Link to="/" className="navbar-item" onClick={close}>Home</Link>
        </div>
      </div>
    </nav>
  )
}
