const router = require("express").Router()
const weightController = require("../controllers/weight.controller")
const middleware = require("../middleware/jwt.middleware")

router.get("/weight/active", weightController.getActive)
router.get("/weight/:id", weightController.getById)
router.get("/weight", weightController.get)
router.post("/weight", middleware, weightController.create)
router.patch("/weight/:id", middleware, weightController.update)
router.patch("/weight/activate/:id", middleware, weightController.activate)
router.delete("/weight/:id", middleware, weightController.deleteWeight)

module.exports = router
