const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

//It will do the whole request body parsing we had to do manually
//This will not parse all kinds of possible bodies.
app.use(bodyParser.urlencoded({ extended: false }));

//Forwards the request to the public folder allowing me to access the elements inside
//The HTML pages don't need to specify the "public" folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

//You end up here when you reach a not registered path => /whatever-is-not-defined-above
//That happens because we are using the "use" method,
//otherwise with "get" or "post" for istance you will match the exact path
app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
