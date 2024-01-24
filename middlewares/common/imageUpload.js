const multer = require("multer");
const path = require("path");

// Define the storage destination and file naming strategy
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/")); // Save uploaded files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

// Initialize multer middleware with the storage configuration
const upload = multer({ storage: storage });

module.exports = { upload };
