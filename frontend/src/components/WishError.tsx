import React from "react"

type Props = {
  errorMessage: string
}

const WishError = ({ errorMessage }: Props) => {
  return (
    <div className="error">
      <h1>{errorMessage}</h1>
    </div>
  )
}

export default WishError
