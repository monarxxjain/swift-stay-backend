const { body } = require("express-validator");
const DateTemplete = require("../../model/DateTemplete");

// add date templete
const addDateTemplete = async function (req, res) {
  try {
    const dateTemplete = new DateTemplete(req.body);
    const result = await dateTemplete.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server errors");
  }
};

// get dateTempletes
const getDateTempletes = async function (req, res) {
  try {
    const result = await DateTemplete.find();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

// delete dateTemplete
const deleteDateTempletes = async function (req, res) {
  const { id } = req.query;
  try {
    const result = await DateTemplete.findOneAndDelete({ _id: id });
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server error");
  }
};

const RegionTemplete = require("../../model/RegionTemplete");

// add region templete
const addRegionTemplete = async function (req, res) {
  try {
    const dateTemplete = new RegionTemplete(req.body);
    const result = await dateTemplete.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

// get region Templetes
const getRegionTempletes = async function (req, res) {
  try {
    const result = await RegionTemplete.find();
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server error");
  }
};

// delete region Templete
const deleteRegionTempletes = async function (req, res) {
  const { id } = req.query;
  try {
    const result = await RegionTemplete.findOneAndDelete({ _id: id });
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  getDateTempletes,
  addDateTemplete,
  deleteDateTempletes,
  getRegionTempletes,
  addRegionTemplete,
  deleteRegionTempletes,
};
