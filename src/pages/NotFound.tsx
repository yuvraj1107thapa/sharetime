import { Link } from 'react-router-dom'

export default function NotFound () {
  return (
    <div className="has-text-centered mt-6">
      <h1 className="title is-3">404</h1>
      <p className="mb-4">This page could not be found.</p>
      <Link to="/">Go back home</Link>
    </div>
  )
}
