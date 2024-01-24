const { check } = require("express-validator");

const addHotelValidation = [
  check("id").isLength({ min: 5 }).withMessage("ID is required").trim(),
  check("name").isLength({ min: 1 }).withMessage("Name is required").trim(),
  check("type").isLength({ min: 1 }).withMessage("Type is required").trim(),
];

module.exports = { addHotelValidation };
