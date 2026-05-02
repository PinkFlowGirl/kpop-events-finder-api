function notFoundHandler(req, res) {
  res.status(404).json({
    message: "Resource not found.",
    path: req.originalUrl
  });
}

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || "Internal server error."
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
