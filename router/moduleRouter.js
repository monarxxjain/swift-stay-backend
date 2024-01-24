const express = require("express");
const authGurd = require("../middlewares/common/authGurd");
const {
  addModuleValidator,
  addDateTempleteValidator,
} = require("../middlewares/module/moduleValidator");
const { validationResult } = require("express-validator");
const { validate } = require("../model/Module");
const validationHandler = require("../middlewares/common/validation");
const {
  addModule,
  getModules,
  getModule,
  editModule,
  deleteModule,
  addTemplete,
  getTempletes,
  getTemplete,
  deleteTemplete,
  editTemplete,
} = require("../controler/module/moduleController");
const {
  addDateTemplete,
  getDateTempletes,
  deleteDateTempletes,
  addRegionTemplete,
  getRegionTempletes,
  deleteRegionTempletes,
} = require("../controler/module/offerControler");

const router = express.Router();

//add module
router.post("/", authGurd, addModuleValidator, validationHandler, addModule);

// get modules
router.get("/", getModules);
router.get("/single", getModule);
router.put("/", authGurd, editModule);
router.delete("/", authGurd, deleteModule);

// add templete
router.post("/templete", authGurd, addTemplete);
router.get("/templetes", getTempletes);
router.get("/templete", getTemplete);
router.put("/templete", authGurd, editTemplete);
router.delete("/templete", authGurd, deleteTemplete);

// dete templete
router.post(
  "/dateTemplete",
  authGurd,
  addDateTempleteValidator,
  validationHandler,
  addDateTemplete
);

router.get("/dateTempletes", getDateTempletes);
router.delete("/dateTemplete", authGurd, deleteDateTempletes);

// region templete
router.post(
  "/regionTemplete",
  authGurd,
  addDateTempleteValidator,
  validationHandler,
  addRegionTemplete
);

router.get("/regionTempletes", getRegionTempletes);
router.delete("/regionTemplete", authGurd, deleteRegionTempletes);

module.exports = router;
