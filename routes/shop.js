const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

//With "get" we match the exact path (root in that case)
router.get("/", (req, res, next) => {
  // join construcs the path by concatenating the different segments
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
