function healthCheck(req, res) {
  res.status(200).json({
    status: "ok",
    service: "kpop-events-finder-api",
    timestamp: new Date().toISOString()
  });
}

module.exports = { healthCheck };
