import React from "react"

type Props = {
  errorMessage: string
}

const Error = ({ errorMessage }: Props) => {
  return (
    <div className="notification">
      <h1 className="error">{errorMessage}</h1>
    </div>
  )
}

export default Error
