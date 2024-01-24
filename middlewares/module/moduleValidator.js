const { check } = require("express-validator");
const Module = require("../../model/Module");

const addModuleValidator = [
  check("name").isLength({ min: 1 }).withMessage("Name is required").trim(),
  check("id")
    .isLength({ min: 1 })
    .withMessage("Id is required")
    .custom(async (id) => {
      try {
        const result = await Module.findOne({ id });

        if (result) {
          throw new Error("Id already exist!");
        }

        return true;
      } catch (err) {
        throw new Error("Id already exist");
      }
    }),
];

const addDateTempleteValidator = [
  check("name").isLength({ min: 1 }).withMessage("Name is required").trim(),
];

module.exports = { addModuleValidator, addDateTempleteValidator };
