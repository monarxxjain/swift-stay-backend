const express = require("express");
const {
  addTransport,
  getTransport,
  updateTransport,
  deleteTransport,
  getTransportByDate,
  getTransportByDate2,
  getTransportByDate3
} = require("../controler/transport/TransportControler");
const authGurd = require("../middlewares/common/authGurd");
const {
  addTransportValidator,
} = require("../middlewares/transport/transportValidatror");
const { validationResult } = require("express-validator");
const validationHandler = require("../middlewares/common/validation");
const {
  addVehicale,
  getVahicales,
  deleteVahicale,
} = require("../controler/transport/vahicaleControler");
const {
  addCity,
  getCitys,
  deleteCity,
} = require("../controler/transport/cityControler");

const router = express.Router();

// add transport
router.post(
  "/",
  authGurd,
  addTransportValidator,
  validationHandler,
  addTransport
);

router.put(
  "/",
  authGurd,
  addTransportValidator,
  validationHandler,
  updateTransport
);

router.get("/", authGurd, getTransport);
router.get("/getTransport/:inputDate",getTransportByDate);
router.get("/getTransport2/:inputDate",getTransportByDate2);
router.get("/getTransport3/:inputDate/:vehicleType",getTransportByDate3);

// vehicale
router.post("/vahicale", addVehicale);
router.get("/vahicale", getVahicales);
router.delete("/vahicale", deleteVahicale);

// city
router.post("/city", addCity);
router.get("/city", getCitys);
router.delete("/city", deleteCity);

// delete transport
router.delete("/", authGurd, deleteTransport);
module.exports = router;
