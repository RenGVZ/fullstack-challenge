const wishesRouter = require("express").Router()
const { combineUsers, determineIsValid } = require("../helpers/index.js")

wishesRouter.post("/", async (request, response) => {
  const { name, wish } = request.body
  if (!name || !wish)
    return response.status(400).json({ error: "Missing name or wish" })

  try {
    const usersComplete = await combineUsers()
    const isValid = determineIsValid(usersComplete, name)

    switch (isValid) {
      case "pass":
        return response.status(200).json({
          data: `Hello ${name}, I hope your wish to ${wish} comes true!`,
        })
      case "too old":
        return response
          .status(400)
          .json({ error: "You are too old to make a wish" })
      case "no user exists":
        return response
          .status(400)
          .json({ error: "No user exists with that name" })
      default:
        return response.status(500).json({ error: "Internal server error" })
    }
  } catch (error) {
    console.log("error:", error)
    response.status(500).json({ error: "Internal server error" })
  }
})

module.exports = wishesRouter
