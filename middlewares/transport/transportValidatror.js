const { check } = require("express-validator");

// add transport validation
const addTransportValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Template name is required")
    .trim(),
  check("transportId")
    .isLength({ min: 5 })
    .withMessage("Transport ID is required"),
];

module.exports = { addTransportValidator };
