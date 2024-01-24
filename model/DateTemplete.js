const mongoose = require("mongoose");

const dateOfferSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  carrency: { type: String, required: true, default: "€" },
  dates: [
    {
      start: String,
      end: String,
      price: Number,
      id: Number,
      hotelName: String,
      offerName: String,
    },
  ],
});

const DateTemplete = mongoose.model("DateTemplete", dateOfferSchema);

module.exports = DateTemplete;
