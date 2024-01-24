const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    name: String,
    transportId: String,
    city: String,
    state: String,
    zip: String,
    address: String,
    vehicleType: String,
    vehicleBrand: String,
    date: [
      {
        start: String,
        end: String,
      },
    ],
    hours: [
      {
        isEdit: Boolean,
        value: String,
      },
    ],
    days: [String],
    pricing: [
      {
        itemId: Number,
        name: String,
        cost: Number,
        discount: Number,
        age: Number,
        maxWeight: Number,
        carency: String,
        count: Number,
        unit: String,
        disclaimer: String,
        dimensioneAuto: String,
      },
    ],
    timing: [
      {
        id: Number,
        start: String,
        end: String,
        cost: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Transport = mongoose.model("Transport", transportSchema);

module.exports = Transport;
