const router = require("express").Router()
const fingerprintController = require("../controllers/fingerprint.controller")
const middleware = require("../middleware/jwt.middleware")

router.get("/fingerprint/:id", fingerprintController.getById)
router.get("/fingerprint/lantai/:lantai", fingerprintController.getByLantai)
router.get("/fingerprint", fingerprintController.get)
router.post("/fingerprint", middleware, fingerprintController.create)
router.patch("/fingerprint/:id", middleware, fingerprintController.update)
router.delete(
  "/fingerprint/:id",
  middleware,
  fingerprintController.deleteFingerprint
)

module.exports = router
