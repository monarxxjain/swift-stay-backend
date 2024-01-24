const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    minStay: {
      type: String,
    },
    maxStay: {
      type: String,
    },
    availability: {
      type: String,
    },
    maxPeople: {
      type: String,
    },
    tags: [String],
    breakdown: [
      {
        name: String,
        priceType: String,
        currency: String,
      },
    ],
    publish: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
