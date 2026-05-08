const { Router } = require("express");
const eventController = require("../controllers/event.controller");

const router = Router();

router.post("/", eventController.createEvent);
router.get("/", eventController.listEvents);

module.exports = router;
