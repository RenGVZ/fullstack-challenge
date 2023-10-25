// server.js
// where your node app starts

// init project
const express = require("express")
const morgan = require("morgan")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const wishesRouter = require("./controllers/wishes")

app.use(bodyParser())
app.use(morgan())
app.use(cors())

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"))


// http://expressjs.com/en/starter/basic-routing.html


app.use("/api/wish", wishesRouter)


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port)
})
