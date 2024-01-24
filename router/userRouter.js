const express = require("express");
const {
  loginControler,
  getUser,
  getUsers,
  addUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controler/user/loginControler");
const validationHandler = require("../middlewares/common/validation");
const {
  loginUserValidation,
  adduserValidation,
  updateuserValidation,
} = require("../middlewares/user/userValidation");
const router = express.Router();
const authGurd = require("../middlewares/common/authGurd");

router.post("/", loginUserValidation, validationHandler, loginControler);
router.get("/", authGurd, getUser);
router.get("/single", authGurd, getSingleUser);
router.get("/all", authGurd, getUsers);

// add user
router.post("/add", authGurd, adduserValidation, validationHandler, addUser);

// update user
router.put(
  "/update",
  authGurd,
  updateuserValidation,
  validationHandler,
  updateUser
);

// delete user
router.delete("/delete", authGurd, deleteUser);

module.exports = router;
