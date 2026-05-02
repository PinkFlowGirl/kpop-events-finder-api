const { Router } = require("express");
const authRoutes = require("./auth.routes");
const { healthCheck } = require("../controllers/health.controller");

const router = Router();

router.get("/health", healthCheck);
router.use("/api/v1/auth", authRoutes);

module.exports = router;
