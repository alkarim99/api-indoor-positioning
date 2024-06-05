require("dotenv").config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")

const fingerprintRoutes = require("./routes/fingerprint.routes")
const locationRoutes = require("./routes/location.routes")
const weightRoutes = require("./routes/weight.routes")
const navigationRoutes = require("./routes/navigation.routes")
const usersRoutes = require("./routes/users.routes")
const authRoutes = require("./routes/auth.routes")

const port = 8000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.use(xss())
app.use(cors())

app.use(fingerprintRoutes)
app.use(locationRoutes)
app.use(navigationRoutes)
app.use(weightRoutes)
app.use(usersRoutes)
app.use(authRoutes)

app.get("/", (req, res) => {
  res.send("API For Indoor Positioning App!")
})

app.listen(port, () => {
  console.log(`Indoor Positioning API listening at http://localhost:${port}`)
})
