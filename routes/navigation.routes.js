const router = require("express").Router()
const navigationController = require("../controllers/navigation.controller")
const middleware = require("../middleware/jwt.middleware")

router.get("/navigation/:id", navigationController.getById)
router.get("/navigation/lantai/:lantai", navigationController.getByLantai)
router.get("/navigation", navigationController.get)
router.post("/navigation", middleware, navigationController.create)
router.post("/navigation/find", navigationController.getNavigation)
router.patch("/navigation/:id", middleware, navigationController.update)
router.delete(
  "/navigation/:id",
  middleware,
  navigationController.deleteNavigation
)

module.exports = router
