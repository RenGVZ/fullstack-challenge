import React from "react"

type Props = {
  message: string
}

const Success = ({ message }: Props) => {
  return (
    <div className="notification">
      <div className="success">{message}</div>
    </div>
  )
}

export default Success
