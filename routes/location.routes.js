const router = require("express").Router()
const locationController = require("../controllers/location.controller")

router.post("/location", locationController.find)

module.exports = router
