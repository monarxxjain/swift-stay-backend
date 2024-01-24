const express = require("express");
const {
  getHotels,
  addHotel,
  getHotel,
  updateHotel,
  addNewOffer,
  updateOffer,
  deleteHotel,
} = require("../controler/hotel/hotelControler");
const authGurd = require("../middlewares/common/authGurd");
const { addHotelValidation } = require("../middlewares/hotel/hotelValidation");
const validationHandler = require("../middlewares/common/validation");

const router = express.Router();

// get all hotel
router.get("/", getHotels);

// add a hole
router.post("/", authGurd, addHotelValidation, validationHandler, addHotel);

// update hotel
router.put("/", authGurd, addHotelValidation, validationHandler, updateHotel);

// add new offer
router.post("/offer", authGurd, addNewOffer);

// add new offer
router.put("/offer", authGurd, updateOffer);

// get single hotel
router.get("/single/:id", getHotel);

// delete hotel
router.delete("/:id", authGurd, deleteHotel);

module.exports = router;
