const Hotel = require("../../model/Hotel");

// get hotels
const getHotels = async function (req, res) {
  try {
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    let minStay = 2; // Default minStay
    let maxStay = 3; // Default maxStay

    let query = {};

    if (startDate && endDate) {
      const timeDifference = endDate.getTime() - startDate.getTime();
      const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

      minStay = differenceInDays;
      maxStay = differenceInDays + 1; // Add 1 to allow for a slight flexibility

      const startDateRange = new Date(startDate);
      startDateRange.setDate(startDateRange.getDate() - 3);

      const endDateRange = new Date(endDate);
      endDateRange.setDate(endDateRange.getDate() + 3);

      query = {
        $and: [
          {
            offers: {
              $elemMatch: {
                $or: [
                  {
                    startDate: { $lte: endDateRange },
                    endDate: { $gte: startDateRange },
                  },
                  {
                    startDate: { $lte: startDateRange },
                    endDate: { $gte: endDateRange },
                  },
                ],
              },
            },
          },
          { disabled: false },
        ],
      };
    }

    const populateOptions = {
      path: "offers",
      match: {
        $or: [
          { minStay: { $gte: minStay, $lte: maxStay } },
          { maxStay: { $gte: minStay, $lte: maxStay } },
        ],
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      },
      options: { sort: { minStay: 1, maxStay: -1 } },
    };

    const result = await Hotel.find()
      .sort({ priority: 1, "offers.lowestOfferPrice": 1 })
      .populate(populateOptions);

    // Filter out hotels without matching offers
    const filteredResult = result.filter((hotel) => hotel.offers.length > 0);

    res.status(200).json(filteredResult);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server errors!");
  }
};

// get hotel
const getHotel = async function (req, res) {
  try {
    const { id } = req.query;
    const result = await Hotel.findOne({ id });
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server errors");
  }
};

module.exports = { getHotels, getHotel };
