const mongoose = require("mongoose");
const Hotel = require("./Hotel");

const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
    },
    id: {
      type: String,
      required: true,
      trim: true,
    },
    templeteId: String,
    publish: {
      type: Boolean,
      default: false,
    },
    img: String,
    seoTitle: String,
    seoDescription: String,
    section1Title: String,
    section1Description: String,
    section1Video: String,
    section2Video1: String,
    section2Video2: String,
    section2Title: String,
    section2Desctiption: String,
    section3Title: String,
    section3Description: String,
    blog: [{ id: Number, title: String, img: String, url: String }],
    bottomDescription: String,
    fiexDate: [
      {
        id: Number,
        start: String,
        end: String,
        price: String,
        carrency: String,
        hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
        offer: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
      },
    ],
    fixtRegion: [
      {
        id: Number,
        region: String,
        city: String,
        carrency: String,
        price: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
