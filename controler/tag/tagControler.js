const Hotel = require("../../model/Hotel");
const Tag = require("../../model/Tag");
const cron = require("node-cron");

require("dotenv").config();

const findHotelsByTagName = async (tagName) => {
  try {
    const hotelsWithTagName = await Hotel.find({
      $or: [
        { services: tagName }, // Check if the tag is in the 'tags' array of the hotel
        { strengths: tagName }, // Check if the tag is in the 'tags' array of the hotel
        { "offers.tags": tagName }, // Check if the tag is in any of the 'tags' arrays in offers
      ],
    });

    return hotelsWithTagName;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Define the cron schedule (e.g., run at 2:00 AM every day)
cron.schedule("0 2 * * *", async () => {
  try {
    const result = await Tag.find();
    const filterResult = [];

    for (const item of result) {
      const hotels = await findHotelsByTagName(item.name);
      if (!hotels.length) {
        filterResult.push(item.name);
      }
    }

    if (filterResult.length) {
      await Tag.deleteMany({ name: { $in: filterResult } });
    }
  } catch (err) {
    console.error(err);
  }
});

const getTagsByKey = async function (req, res) {
  try {
    const result = await Tag.find();

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

// Add New Tag
const addNewTag = async function (req, res) {
  const { tag, tagCat } = req.body;
  try {
    const newTag = new Tag({
      name: tag,
      catagory: tagCat,
    });

    const result = await newTag.save();
    console.log(result);
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

// Delete Tag
const deleteTag = async function (req, res) {
  try {
    const { id } = req.params;
    const result = await Tag.findOneAndDelete({ _id: id });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server errors");
  }
};
module.exports = { getTagsByKey, addNewTag, deleteTag };
