const wishesRouter = require("express").Router()
const { combineUsers, determineIsValid } = require("../helpers/index.js")
const nodemailer = require("nodemailer")

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
          message: `Hello ${name}, I hope your wish for ${wish} comes true!`,
        })
      case "too old":
        return response
          .status(400)
          .json({ message: "You are too old to make a wish" })
      case "no user exists":
        return response
          .status(400)
          .json({ message: "No user exists with that name" })
      default:
        return response.status(500).json({ message: "Internal server error" })
    }
  } catch (error) {
    console.log("error:", error)
    response.status(500).json({ message: "Internal server error" })
  }
})

wishesRouter.post("/progress", async (request, response) => {
  const { name, wish } = request.body

  try {
    const usersComplete = await combineUsers()
    const user = usersComplete.find((user) => user.username === name)
    if (!user) {
      // if the user doesn't exist, no email will be sent
      return response.status(400).json({ message: "No user exists with that name" })
    }
    let message = {
      from: " do_not_reply@northpole.com",
      to: "santa@northpole.com",
      subject: `Wish in progress from ${name ?? "Anonymous"}`,
      text: `From: ${name ?? "Anonymous"}\nWish: ${
        wish ?? "No wish provided"
      }\n Address: ${user.address ?? "No address provided"}`,
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "spencer.mraz@ethereal.email",
        pass: "b1cPD4rx7NBWd7V13v",
      },
    })

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("error:", error)
        response.status(500).json({ message: "Internal server error" })
      } else {
        console.log("Email sent: " + info.response)
        response.status(200).json({ data: "Email sent" })
      }
    })
  } catch (error) {
    console.log("error:", error)
    response.status(500).json({ message: "Internal server error" })
  }
})

module.exports = wishesRouter
