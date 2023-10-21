const router = require("express").Router()
const weightController = require("../controllers/weight.controller")

router.get("/weight/active", weightController.getActive)
router.get("/weight/:id", weightController.getById)
router.get("/weight", weightController.get)
router.post("/weight", weightController.create)
router.patch("/weight/:id", weightController.update)
router.patch("/weight/activate/:id", weightController.activate)
router.delete("/weight/:id", weightController.deleteWeight)

module.exports = router
