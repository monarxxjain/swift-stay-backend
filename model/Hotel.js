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
      type: Number,
    },
    maxStay: {
      type: Number,
    },
    packages: {
      type: String,
    },
    omaggi: {
      type: String,
    },
    beverageAvailability: {
      type: String,
    },
    tags: [String],
    supplement: [
      {
        name: String,
        price: Number,
        currency: String,
      },
    ],
    breakdown: [
      {
        breakdownId: Number,
        name: String,
        priceType: Number,
        currency: String,
        price: Number,
      },
    ],
    ageReduction: [
      {
        reductionId: Number,
        boardType: String,
        agelimit: Number,
        discount: Number,
      },
    ],
    noUpdateXML: {
      type: Boolean,
      default: false,
    },
    // publish: {
    //   type: Boolean,
    //   default: false,
    // },
    lowestOfferPrice: Number,
  },
  {
    timestamps: true,
  }
);

const hotelSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        src: String,
      },
    ],
    morganaId: {
      type: String,
      required: false,
    },
    hotelWebsite: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    hotelXMLurl: {
      type: String,
    },
    priority: {
      type: String,
    },
    hotelDescription: {
      type: String,
    },
    summaryDescription: {
      type: String,
    },
    roomsDescription: {
      type: String,
    },
    roomsTitle: String,
    spaTitle: String,
    restaurantTitle: String,
    spaDescription: {
      type: String,
    },
    restaurantDescription: {
      type: String,
    },
    rating: {
      type: Number,
    },
    serviceDetails: String,
    services: [String],
    strengths: [String],
    ageDeductions: [
      {
        id: {
          type: Number,
          default: 1,
        },
        items: [
          {
            id: {
              type: Number,
              default: 1,
            },
            label: String,
            value: Number,
          },
          {
            id: {
              type: Number,
              default: 2,
            },
            label: String,
            value: Number,
          },
        ],
      },
    ],
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    address: {
      type: String,
    },
    coordinate: {
      type: String,
    },
    distance: [
      {
        id: Number,
        isEdit: Boolean,
        label: String,
        scale: String,
        distance: Number,
      },
    ],
    offers: [offerSchema],
    publish: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
