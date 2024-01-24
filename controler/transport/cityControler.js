const City = require("../../model/City");

const addCity = async function (req, res) {
  const { name, zip } = req.body;
  if (name) {
    const city = new City(req.body);

    try {
      const result = await city.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Internal server errors");
    }
  } else {
    res.status(400).json("Name is required");
  }
};

const getCitys = async function (req, res) {
  try {
    const result = await City.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("Internal server errors");
  }
};

const deleteCity = async function (req, res) {
  const { id } = req.query;
  try {
    const result = await City.findOneAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

module.exports = { addCity, getCitys, deleteCity };
