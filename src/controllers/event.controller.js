const eventService = require("../services/event.service");

async function createEvent(req, res, next) {
  try {
    const result = await eventService.createEvent(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function getEventById(req, res, next) {
  try {
    const result = await eventService.getEventById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


async function updateEvent(req, res, next) {
  try {
    const result = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


async function listEvents(req, res, next) {
  try {
    const result = await eventService.listEvents();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteEvent(req, res, next) {
  try {
    await eventService.deleteEvent(req.params.id);
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEvent,
  getEventById,
  listEvents,
  updateEvent,
  deleteEvent
};
