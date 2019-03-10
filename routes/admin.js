const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

//It's like a mini express app tied to the other express app which we can export
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body); //It's possibile to console.log this thanks to the bodyParser
  res.redirect("/");
});

module.exports = router;
