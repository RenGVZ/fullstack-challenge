import React from "react"
import { useLocation, Link } from "react-router-dom"

const Success = () => {
  const location = useLocation()

  return (
    <div className="success">
      <h1 className="h1">{location.state.message}</h1>

      <Link to="/" className="button">
        Back to home page
      </Link>
    </div>
  )
}

export default Success
