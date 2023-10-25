import { useState, SyntheticEvent, useEffect } from "react"
import { postWish, postProgress } from "../api"
import Error from "./Error"
import Success from "./Success"

const WishForm = () => {
  const [name, setName] = useState("")
  const [wish, setWish] = useState("")
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!name || !wish) {
      setErrorMessage("Please enter your name and wish.")
      setError(true)
      return
    }
    setIsLoading(true)
    try {
      const res = await postWish(name, wish)
      setSuccess(true)
      setSuccessMessage(res.message)
      setName("")
      setWish("")
      setIsLoading(false)
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

  useEffect(() => {
    const successTimeout = setTimeout(() => {
      setSuccess(false)
      setSuccessMessage("")
    }, 5000)

    return () => clearTimeout(successTimeout)
  }, [success])

  return (
    <main>
      {success && <Success message={successMessage} />}
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
