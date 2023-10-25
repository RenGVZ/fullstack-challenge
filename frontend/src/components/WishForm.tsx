import { useState, SyntheticEvent, useEffect } from "react"
import { postWish, postProgress } from "../api"
import Error from "./Error"
import { useNavigate } from "react-router-dom"

const WishForm = () => {
  const [name, setName] = useState("")
  const [wish, setWish] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!name || isEmpty(wish)) {
      setErrorMessage("Please enter your name and wish.")
      setError(true)
      return
    }
    setIsLoading(true)
    try {
      const res = await postWish(name, wish)
      setIsLoading(false)
      navigate("/success", { state: { message: res.message } })
    } catch (err) {
      let message = null
      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        message = err.message as string
      } else {
        message = "Something went wrong, please try again later."
      }
      setErrorMessage(message)
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // if both name and wish are not filled out, a progress-post will not be sent
    if (!name || !wish) return
    const interval = setInterval(() => {
      postProgress(name, wish)
    }, 15000)

    return () => clearInterval(interval)
  }, [name, wish])

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setError(false)
      setErrorMessage("")
    }, 5000)

    return () => clearTimeout(errorTimeout)
  }, [error, errorMessage])

  const isEmpty = (str: string) => {
    const trimmed = str.trim()
    if(!str || trimmed.length === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <main>
      {error && <Error errorMessage={errorMessage} />}
      <p className="bold">Ho ho ho, what you want for Christmas?</p>
      who are you?
      <form onSubmit={(e: SyntheticEvent) => handleSubmit(e)}>
        <input
          value={name}
          name="userid"
          placeholder="charlie.brown"
          onChange={(e) => setName(e.target.value.trim())}
        />
        what do you want for christmas?
        <textarea
          value={wish}
          name="wish"
          onChange={(e) => setWish(e.target.value)}
          rows={10}
          cols={45}
          maxLength={100}
          placeholder="Gifts!"
        ></textarea>
        <br />
        <button type="submit" id="submit-letter" disabled={isLoading}>
          Send
        </button>
      </form>
    </main>
  )
}

export default WishForm
