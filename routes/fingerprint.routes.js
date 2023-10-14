const router = require("express").Router()
const fingerprintController = require("../controllers/fingerprint.controller")

router.get("/fingerprint/:id", fingerprintController.getById)
router.get("/fingerprint", fingerprintController.get)
router.post("/fingerprint", fingerprintController.create)
router.patch("/fingerprint/:id", fingerprintController.update)
router.delete("/fingerprint/:id", fingerprintController.deleteFingerprint)

module.exports = router
