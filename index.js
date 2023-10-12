require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")

// const candidateRoutes = require("./routes/candidate.routes")

const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.use(xss())
app.use(cors())

// app.use(candidateRoutes)

app.get("/", (req, res) => {
  res.send("API For Indoor Positioning App!")
})

app.listen(port, () => {
  console.log(`Indoor Positioning API listening at http://localhost:${port}`)
})
