const Hotel = require("../../model/Hotel");
const mongoose = require("mongoose");
const cron = require("node-cron");

// Define the cron schedule (e.g., run at 2:00 AM every day)
cron.schedule("0 2 * * *", async () => {
  try {
    await Hotel.deleteMany({ publish: { $ne: true } });
    console.log("DELETE HOTEL");
  } catch (err) {
    console.error(err);
  }
});

// get hotels
const getHotels = async function (req, res) {
  const perPage = 10;
  const { page, search, week } = req.query;
  const start = (page - 1) * perPage;
  const end = page * [perPage];

  const searchValue = search.replace("$", "");

  let query = {
    $or: [
      {
        name: {
          $regex: new RegExp(search, "i"),
        },
      },
      {
        "offers.name": {
          $regex: new RegExp((search[0] === "$" && searchValue) || search, "i"),
        },
      },
    ],
    publish: true,
  };

  if (week === "true") {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    query.createdAt = {
      $gte: oneWeekAgo,
      $lt: today,
    };
    query.publish = true;
  }

  if (week === "Disabilita") {
    delete query.createdAt;
    query.disabled = true;
  }
  try {
    const result = await Hotel.find(query)
      .skip(start)
      .limit(end - start);
    const count = await Hotel.countDocuments(query);
    res.status(200).json({ count, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

const addHotel = async function (req, res) {
  const { name, id, type } = req.body;
  const hotelObject = {
    name,
    id,
    type,
  };

  try {
    const rs = await Hotel.findOne({ id });

    if (!rs) {
      const hotel = new Hotel(hotelObject);
      try {
        const result = await hotel.save();
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({
          errors: {
            msg: "Internal server errors",
          },
        });
      }
    } else {
      res.status(400).json({
        id: {
          msg: "Inserire un altro Hotel ID",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

//get single hotel
const getHotel = async function (req, res) {
  try {
    const { id } = req.params;
    // const objectId = new mongoose.Types.ObjectId(id);
    const result = await Hotel.findOne({ id: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

// update hotel handler
const updateHotel = async function (req, res) {
  const { _id } = req.body;
  try {
    const result = await Hotel.findByIdAndUpdate(
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

const addNewOffer = async function (req, res) {
  const { newOffer, hotelId } = req.body;

  try {
    const result = await Hotel.updateOne(
      { _id: hotelId },
      { $addToSet: { offers: newOffer } }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

const updateOffer = async function (req, res) {
  const { updatedOffer, hotelId, offerId } = req.body;
  // console.log(updatedOffer);
  const offerToUpdate = {};
  for (const prop in updatedOffer) {
    offerToUpdate[`offers.$.${prop}`] = updatedOffer[prop];
  }
  try {
    const result = await Hotel.updateOne(
      { _id: hotelId, "offers._id": offerId },
      { $set: offerToUpdate }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        msg: "Internal server error",
      },
    });
  }
};

// Delete Hotel
const deleteHotel = async function (req, res) {
  try {
    const { id } = req.params;
    const result = await Hotel.findOneAndDelete({ _id: id });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server errors");
  }
};

module.exports = {
  getHotels,
  addHotel,
  getHotel,
  updateHotel,
  addNewOffer,
  updateOffer,
  deleteHotel,
};
