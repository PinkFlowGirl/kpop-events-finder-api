const { Router } = require("express");
const authRoutes = require("./auth.routes");
const eventRoutes = require("./event.routes");
const { healthCheck } = require("../controllers/health.controller");
const { authenticate } = require("../middleware/auth.middleware");

const router = Router();

router.get("/health", healthCheck);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/events", authenticate, eventRoutes);

module.exports = router;
