import { useState, SyntheticEvent } from "react"
import { postWish } from "../api"

const WishForm = () => {
  const [name, setName] = useState("")
  const [wish, setWish] = useState("")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const res = await postWish(name, wish)
      console.log("res:", res)
    } catch (err) {
      console.log("err:", err)
    }
  }

  return (
    <main>
      <p className="bold">Ho ho ho, what you want for Christmas?</p>
      who are you?
      <form onSubmit={(e: SyntheticEvent) => handleSubmit(e)}>
        <input
          name="userid"
          placeholder="charlie.brown"
          onChange={(e) => setName(e.target.value)}
        />
        what do you want for christmas?
        <textarea
          name="wish"
          onChange={(e) => setWish(e.target.value)}
          rows={10}
          cols={45}
          maxLength={100}
          placeholder="Gifts!"
        ></textarea>
        <br />
        <button type="submit" id="submit-letter">
          Send
        </button>
      </form>
    </main>
  )
}

export default WishForm
