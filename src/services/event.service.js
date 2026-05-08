const Event = require("../models/event.model");

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createEvent({ name, artist, date, venue, country }) {
  if (!name || !artist || !date || !venue || !country) {
    throw createHttpError(400, "Name, artist, date, venue, and country are required.");
  }

  if (!/^[A-Z]{2}$/.test(country)) {
    throw createHttpError(400, "Country must be a valid ISO 3166-1 alpha-2 code (e.g. BR, US, KR).");
  }

  const eventDate = new Date(date);

  if (Number.isNaN(eventDate.getTime()) || eventDate <= new Date()) {
    throw createHttpError(422, "Event date must be in the future.");
  }

  const existingEvent = await Event.findOne({ name, artist, date });

  if (existingEvent) {
    throw createHttpError(409, "Event already exists.");
  }

  return Event.create({
    name,
    artist,
    date,
    venue,
    country
  });
}

async function listEvents() {
  return Event.find({ date: { $gte: new Date() } }).sort({ date: 1 });
}

module.exports = {
  createEvent,
  listEvents
};
