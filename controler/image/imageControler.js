const Image = require("../../model/image");

require("dotenv").config();

const getImage = async function (req, res) {
  const file = req.file;
  const url = `${process.env.BASEURL}/images/${file.filename}`;
  const imageObject = {
    url,
  };

  const image = new Image(imageObject);

  try {
    const result = await image.save();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errors: {
        msg: "Internal server errors",
      },
    });
  }
};

module.exports = { getImage };
