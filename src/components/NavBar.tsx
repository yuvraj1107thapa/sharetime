import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE_NAME } from '@/config'

export default function NavBar () {
  const [expanded, setExpanded] = useState(false)
  const toggle = () => setExpanded(value => !value)

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        <span className="navbar-item has-text-primary-dark has-text-weight-bold">\ {SITE_NAME} \</span>
        <a
          role="button"
          className={`navbar-burger${expanded ? ' is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
          onClick={toggle}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div
        id="navMenu"
        className={`navbar-menu${expanded ? ' is-active' : ''}`}
        onClick={toggle}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home</Link>
        </div>
      </div>
    </nav>
  )
}
