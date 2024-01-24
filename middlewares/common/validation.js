const { validationResult } = require("express-validator");

const validationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.status(422).json(mappedError);
  }
};

module.exports = validationHandler;
