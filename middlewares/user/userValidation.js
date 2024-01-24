const { check } = require("express-validator");

const loginUserValidation = [
  check("email")
    .isLength({ min: 1 })
    .withMessage("Inserisci il Email!")
    .isEmail()
    .withMessage("Inserisci il Email")
    .trim(),
  check("password").isLength({ min: 1 }).withMessage("Crea una password"),
];

const adduserValidation = [
  check("firstName").isLength({ min: 1 }).withMessage("Inserisci il nome"),
  check("lastName").isLength({ min: 1 }).withMessage("Inserisci il cognome"),
  check("email")
    .isLength({ min: 1 })
    .withMessage("Inserisci il Email")
    .isEmail()
    .withMessage("Inserisci l’email")
    .trim(),
  check("password").isLength({ min: 1 }).withMessage("Crea una password"),
  check("role").isLength({ min: 1 }).withMessage("Role is required"),
];
const updateuserValidation = [
  check("firstName").isLength({ min: 1 }).withMessage("Inserisci il nome"),
  check("lastName").isLength({ min: 1 }).withMessage("Inserisci il cognome"),
  check("email")
    .isLength({ min: 1 })
    .withMessage("Inserisci il Email")
    .isEmail()
    .withMessage("Inserisci il Email")
    .trim(),
  check("role").isLength({ min: 1 }).withMessage("Role is required"),
];
module.exports = {
  loginUserValidation,
  adduserValidation,
  updateuserValidation,
};
