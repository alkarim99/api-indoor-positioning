const router = require("express").Router()
const usersController = require("../controllers/users.controller")
const middleware = require("../middleware/jwt.middleware")

router.get("/users/:id", middleware, usersController.getById)
router.get("/users", middleware, usersController.get)
router.post("/users", usersController.create)
router.patch("/users", middleware, usersController.update)
router.delete("/users", middleware, usersController.deleteUser)

module.exports = router
