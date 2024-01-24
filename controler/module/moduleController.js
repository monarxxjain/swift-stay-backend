const Module = require("../../model/Module");
const Templete = require("../../model/Templete");

async function deleteUnpublishedOldDocuments() {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // Calculate one day ago
    const deletedCount = await Module.deleteMany({
      publish: false,
      createdAt: { $lt: oneDayAgo },
    });
    console.log(
      `Deleted ${deletedCount.deletedCount} old, unpublished documents`
    );
  } catch (error) {
    console.error(error);
  }
}

// add module controller
const addModule = async function (req, res) {
  const module = new Module(req.body);
  deleteUnpublishedOldDocuments();
  try {
    const result = await module.save();
    res.status(200).json(result);
  } catch (err) {
    // console.log(err);
    res.status(500).json("Internal server errors");
  }
};

// get modules
const getModules = async function (req, res) {
  try {
    const result = await Module.find({ publish: true }).populate(
      "userId",
      " firstName lastName"
    );
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server errors");
  }
};

//get single module
const getModule = async function (req, res) {
  const { id } = req.query;

  try {
    let result = await Module.findOne({ _id: id }).populate("fiexDate.hotel");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server errors");
  }
};

// edit module
const editModule = async function (req, res) {
  const { _id } = req.body;
  req.body.userId = req.body.user.id;

  try {
    const result = await Module.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server errors");
  }
};

// delete module
const deleteModule = async function (req, res) {
  const { id } = req.query;
  try {
    const result = await Module.findByIdAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("Internal server errors");
  }
};

// templete
// add templete controller
const addTemplete = async function (req, res) {
  const templete = new Templete(req.body);

  try {
    const result = await templete.save();
    res.status(200).json(result);
  } catch (err) {
    // console.log(err);
    res.status(500).json("Internal server errors");
  }
};

// get templetes
const getTempletes = async function (req, res) {
  try {
    const result = await Templete.find();
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server errors");
  }
};

//get single Templete
const getTemplete = async function (req, res) {
  const { id } = req.query;

  try {
    const result = await Templete.findOne({ _id: id });
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server errors");
  }
};

// edit templete
const editTemplete = async function (req, res) {
  const { _id } = req.body;

  console.log(_id);
  try {
    const result = await Templete.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch {
    res.status(500).json("Internal server errors");
  }
};

// delete module
const deleteTemplete = async function (req, res) {
  const { id } = req.query;
  try {
    const result = await Templete.findByIdAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("Internal server errors");
  }
};

module.exports = {
  addModule,
  getModules,
  getModule,
  editModule,
  deleteModule,
  addTemplete,
  getTempletes,
  getTemplete,
  editTemplete,
  deleteTemplete,
};
