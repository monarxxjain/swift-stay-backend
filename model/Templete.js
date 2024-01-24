const mongoose = require("mongoose");

const templeteShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
        hotelName: String,
        offerName: String,
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

const Templete = mongoose.model("Templete", templeteShema);

module.exports = Templete;
