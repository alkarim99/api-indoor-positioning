require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")

const fingerprintRoutes = require("./routes/fingerprint.routes")

const port = 3100

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.use(xss())
app.use(cors())

app.use(fingerprintRoutes)

app.get("/", (req, res) => {
  res.send("API For Indoor Positioning App!")
})

app.listen(port, () => {
  console.log(`Indoor Positioning API listening at http://localhost:${port}`)
})
