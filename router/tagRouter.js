const express = require("express");
const { getTagsByKey, addNewTag, deleteTag } = require("../controler/tag/tagControler");

const router = express.Router();

router.get("/", getTagsByKey);

router.post("/", addNewTag);

router.delete("/:id", deleteTag);

module.exports = router;
