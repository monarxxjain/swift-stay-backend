const express = require("express");
const { getImage } = require("../controler/image/imageControler");
const { upload } = require("../middlewares/common/imageUpload");
const authGurd = require("../middlewares/common/authGurd");

const router = express.Router();

router.post("/", authGurd, upload.single("image"), getImage);

module.exports = router;
