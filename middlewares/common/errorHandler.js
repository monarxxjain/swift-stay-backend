const createHttpError = require("http-errors");

const notFoundHandler = function (req, res, next) {
  next(createHttpError(404, "Your requested content was not found!"));
};

const errorHandler = function (err, req, res, next) {
  res.status(err.status || 500).json(err.message);
};

module.exports = { notFoundHandler, errorHandler };
