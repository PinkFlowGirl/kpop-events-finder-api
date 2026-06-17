const { Router } = require("express");
const eventController = require("../controllers/event.controller");

const router = Router();

router.post("/", eventController.createEvent);
router.get("/", eventController.listEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
