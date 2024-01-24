const mongoose = require("mongoose");

const bookingUserSchema = new mongoose.Schema({
  id: {
    type: Number,
    trim: true,
  },
  fName: { type: String, trim: true },
  lName: { type: String, trim: true },
  email: { type: String},
  phone: { type: String },
  lastQuoteSent:{ type: Date},
  quoteSent: {type:Number},
  tag: [{ type: String }],
});

const BookingUser = mongoose.model("BookingUser", bookingUserSchema);

module.exports = BookingUser;
