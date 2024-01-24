const express = require("express");
const { getBookingByKey, addNewBooking, updateBookingById, getTagsByBookingId, addTagToBookings, addTagToBooking } = require("../controler/booking/bookingControler");
const { addNewUser, getUserByKey,getUserByEmail, updateUserById, getUserTags, addTagToUser,updateUserByPhone } = require("../controler/booking/userControler");

const router = express.Router();

router.get("/", getBookingByKey);

router.get("/user", getUserByKey);

router.get("/userByEmail/:phone", getUserByEmail);

router.get("/bookingTag/:bookingId",getTagsByBookingId);

router.get("/userTags/:id",getUserTags);

router.put("/", updateBookingById);

router.put("/bookingTags",addTagToBookings)

router.put("/bookingTag",addTagToBooking)

router.put("/userTags",addTagToUser)

router.put("/user", updateUserById);

router.post("/", addNewBooking);

router.post("/user", addNewUser);

router.put("/updating/:phone",updateUserByPhone);

module.exports = router;
