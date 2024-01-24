const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ["admin", "manager", "base"],
      default: "admin",
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      default: "Marco",
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      default: "S",
    },
    img: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    },
  },
  {
    timestamps: true,
  }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
