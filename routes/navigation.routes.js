const router = require("express").Router()
const navigationController = require("../controllers/navigation.controller")

router.get("/navigation/:id", navigationController.getById)
router.get("/navigation/lantai/:lantai", navigationController.getByLantai)
router.get("/navigation", navigationController.get)
router.post("/navigation", navigationController.create)
router.post("/navigation/find", navigationController.getNavigation)
router.patch("/navigation/:id", navigationController.update)
router.delete("/navigation/:id", navigationController.deleteNavigation)

module.exports = router
