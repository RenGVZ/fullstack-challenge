// server.js
// where your node app starts

// init project
const express = require("express")
const morgan = require("morgan")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(bodyParser())
app.use(morgan())
app.use(cors())

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html")
})

app.post("/api/wish", (request, response) => {
  const { name, wish } = request.body
  console.log("name:", name, "wish:", wish)
  if (!name || !wish) {
    response.status(400).json({ error: "Missing name or wish" })
  } else {
    response
      .status(200)
      .json({ data: `Hello ${name}, I hope your wish to ${wish} comes true!` })
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
