const Vahicale = require("../../model/Vehicale");

const addVehicale = async function (req, res) {
  const { name } = req.body;

  if (name) {
    const vahicale = new Vahicale(req.body);

    try {
      const result = await vahicale.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(400).json({
      name: {
        msg: "Name is required",
      },
    });
  }
};

const getVahicales = async function (req, res) {
  try {
    const result = await Vahicale.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

const deleteVahicale = async function (req, res) {
  const { id } = req.query;
  try {
    const result = await Vahicale.findOneAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

module.exports = { addVehicale, getVahicales, deleteVahicale };
