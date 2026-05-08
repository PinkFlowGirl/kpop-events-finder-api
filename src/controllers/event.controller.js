const eventService = require("../services/event.service");

async function createEvent(req, res, next) {
  try {
    const result = await eventService.createEvent(req.body);
    res.status(201).json(result);
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

module.exports = {
  createEvent,
  listEvents
};
