const Hotel = require("../../model/Hotel");
const Booking = require("../../model/Booking");
const BookingUser = require("../../model/BookingUser");
const { v4: uuidv4 } = require('uuid');
const cron = require("node-cron");

require("dotenv").config();

const getUserByKey = async function (req, res) {
  try {
    const result = await BookingUser.find();

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
const getUserByEmail = async function (req, res) {
  try {
    const {phone} = req.params
    const result = await BookingUser.findOne({phone:phone});
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
let id ;
const addNewUser = async function (req, res) {
  const {
    fName,
    lName,
    email,
    phone,
    lastQuoteSent,
    quoteSent,
    tag,
  } = req.body;
  try {
    BookingUser.countDocuments({})
      .then((count) => {
        id = count + 1;
      })
      .catch((error) => {
        console.error('Error counting Bookings:', error);
        // Handle the error as needed
      });
    const newUser = new BookingUser({
      id: id,
      fName,
      lName,
      email,
      phone,
      lastQuoteSent,
      quoteSent,
      tag,
    });

    const result = await newUser.save();
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
const getUserTags=async(req,res)=>{
  try {
    const { id } = req.params
    const result = await BookingUser.findOne({ _id: id });
    if (!result) {
      // Handle the case where no booking is found with the given _id
      res.status(200).json(null);
    }
    res.status(200).json(result?.tag);

  } catch (error) {
    // Handle any errors that occur during the query
    console.error('Error retrieving tags:', error.message);
    throw error; // You can handle or throw the error as needed
  }
 
}

const addTagToUser =async(req,res)=>{
    const {userId,tag}=req.body
  try {
    let result = await BookingUser.findOne(
      { _id: userId},
    );

     result.tag=[...result.tag,tag]
     result.save();
    res.status(200).json({result:"Updated"});
  } catch (err) {
    console.log(err);
    res.status(200).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
}
// update bookingUser handler
const updateUserById = async function (req, res) {
  const { _id } = req.body;
  try {
    const result = await BookingUser.findByIdAndUpdate(
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

const updateUserByPhone = async function (req, res) {
  try {
    const { phone } = req.params;
    if (!phone) {
      return res.status(400).json({
        errors: {
          msg: "Phone number is required",
        },
      });
    }

    // Find and update the user based on the phone number
    const result = await BookingUser.findOneAndUpdate(
      { phone: phone },
      {
        $set: {
          email: req.body.email,
          fName: req.body.fName,
          lName: req.body.lName,
          lastQuoteSent: new Date(), // Set to current date
        },
        $inc: { quoteSent: 1 }, // Increment quoteSent by 1
      },
      { new: true } // Return the updated document
    );

    // Handle case where no user is found
    if (!result) {
      return res.status(404).json({
        errors: {
          msg: "User not found",
        },
      });
    }

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


module.exports = { getUserByKey, addNewUser, updateUserById ,getUserByEmail,getUserTags,addTagToUser,updateUserByPhone};
