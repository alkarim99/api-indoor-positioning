const router = require("express").Router()
const routeController = require("../controllers/route.controller")

router.get("/route/:id", routeController.getById)
router.get("/route", routeController.get)
router.post("/route", routeController.create)
router.post("/route/find", routeController.getRoute)
router.patch("/route/:id", routeController.update)
router.delete("/route/:id", routeController.deleteRoute)

module.exports = router
