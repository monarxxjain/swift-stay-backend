const express = require("express");
const { getHotels, getHotel } = require("../controler/app/appControler");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("app router");
});

// get hotels
router.get("/hotels", getHotels);

// get single hotel
router.get("/hotel", getHotel);

module.exports = router;
