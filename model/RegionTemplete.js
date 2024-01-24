const mongoose = require("mongoose");

const regionTempleteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  carrency: { type: String, required: true, default: "€" },
  dates: [{ id: Number, region: String, city: String, price: String }],
});

const RegionTemplete = mongoose.model("RegionTemplete", regionTempleteSchema);

module.exports = RegionTemplete;
