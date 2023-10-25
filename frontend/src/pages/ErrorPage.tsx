import React from "react"
import { useLocation, Link } from "react-router-dom"

const ErrorPage = () => {
  const location = useLocation()

  return (
    <div className="notification">
      <h1 className="error-page">{location.state.message}</h1>

      <Link to="/" className="button">
        Back to home page
      </Link>
    </div>
  )
}

export default ErrorPage
