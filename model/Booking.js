const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    id: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const bookingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  user:{type:String,required:true},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookingUser',
    required: true,
  },
  msg: { type: String },
  tag: [{ type: String }],
  date: {type:Date},
  dateLine: {type:String},
  periodo:{type:String},
  module:{type:String},
  bags:{type:String},
  carSize:{type:String},
  guestDetails: [
    {
      totDisc : {type:String},
      adult: { type: Number },
      child: { type: Number },
      childAge: [{ type: Number }],
      childDis : [{type:String}],
      adultPrice:[{type:Number}],
      board :{type:String},
      childInit : [{type:Number}]
    },
  ],
  tipi: {type:String},
  trasporto: { type: String },
  citta: { type: String },
  periodOfStay: { type: String },
  dates: [
    {
      checkIn : String,
      checkOut : String,
      start: String,
      end: String,
      price: Number,
      hotelName: String,
      offerName: String,
      actualName : String,
      actualOffer : offerSchema
    },
  ],
  boardType:{type: String},
},
{
  timestamps: true,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
