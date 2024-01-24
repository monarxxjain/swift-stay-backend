const { default: mongoose } = require("mongoose");

const citySchecma = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    zip: String,
    region: String,
    hotel: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model("City", citySchecma);

module.exports = City;
