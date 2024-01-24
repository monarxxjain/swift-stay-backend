const Hotel = require("../../model/Hotel");
const Booking = require("../../model/Booking");
const BookingUser = require("../../model/BookingUser");
const cron = require("node-cron");

require("dotenv").config();

const getBookingByKey = async function (req, res) {
  try {
    const result = await Booking.find();

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};


const addNewBooking = async function (req, res) {
  const {
    userId,
    msg,
    tag,
    date,
    dateLine,
    periodo,
    module,
    guestDetails,
    trasporto,
    citta,
    periodOfStay,
    dates,
    boardType,
    id,
    bags,
    carSize
  } = req.body;
  try {
    var adu = 0;
    var chil = 0;
    for(let i=0;i<guestDetails.length;i++){
      adu+=Number(guestDetails[i].adult);
      chil+=Number(guestDetails[i].child);
    }
    const newBooking = new Booking({
      id,
      userId,
      msg,
      tag,
      date,
      dateLine,
      periodo,
      module,
      guestDetails,
      trasporto,
      tipi: `${adu} Adults, ${chil} Children`,
      citta,
      periodOfStay,
      dates,
      boardType,
      bags,
      carSize
    });

    BookingUser.findById(userId).exec()
      .then((foundUser) => {
        if (foundUser) {
          // console.log('Found user:', foundUser); // Check the structure of foundUser
          newBooking.user = `${foundUser.fName} ${foundUser.lName}`;
          // console.log('User assigned:', newBooking.user); // Check the assigned user
          // Continue with any other logic related to newBooking here
          // For example, save the newBooking to the database
          return newBooking.save();
        } else {
          console.log('User not found.');
        }
      })
      .then((savedBooking) => {
        if (savedBooking) {
          // console.log('Booking saved successfully:', savedBooking);
          res.status(200).json(savedBooking); // Send the saved booking as the response
        } else {
          console.log('Booking not saved.');
          res.status(500).json({ error: 'Booking not saved' });
        }
      })
      .catch((err) => {
        console.error('Error finding User or saving Booking:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};


async function addTagToBookings(req,res) {
  const { userId, tag }=req.body
  try {
    const result = await Booking.updateMany(
      { userId: userId },
      { $addToSet: { tag: tag } }
    );

    res.status(200).json({result:"Bookings updated"});
  } catch (error) {
    console.error('Error updating bookings:', error.message);
  }
}
async function addTagToBooking(req, res) {
  const { Id, tag } = req.body
  try {
    const result = await Booking.updateOne(
      { _id: Id },
      { $addToSet: { tag: tag } }
    );

    res.status(200).json({ result: "Bookings updated" });
  } catch (error) {
    console.error('Error updating bookings:', error.message);
  }
}


async function getTagsByBookingId(req,res) {
  const {bookingId}=req.params
  try {
    const booking = await Booking.findOne({_id:bookingId});

    if (!booking) {
      // Handle the case where no booking is found with the given _id
      return null;
    }
    res.status(200).json(booking.tag);
   
  } catch (error) {
    // Handle any errors that occur during the query
    console.error('Error retrieving tags:', error.message);
    throw error; // You can handle or throw the error as needed
  }
}
// update booking handler
const updateBookingById = async function (req, res) {
  const { _id } = req.body;
  try {
    const result = await Booking.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(_id) },
      {
        $set: { ...req.body },
      }
    );

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(200).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

module.exports = { getBookingByKey, addNewBooking, updateBookingById,addTagToBookings,getTagsByBookingId,addTagToBooking};
