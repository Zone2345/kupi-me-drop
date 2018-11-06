const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  dbProd,
  dbDev,
  distributionRoot,
  routes
} = require("./server/constants");
const app = express();
const path = require("path");
mongoose.connect(app.get("env") === "development" ? dbDev : dbProd);

// our product route
const product = require(routes + "product.routes");
const category = require(routes + "category.routes");
const register = require(routes + "register.routes");
app.use(express.static(__dirname + "/" + distributionRoot));
app.use(
  bodyParser.json({
    limit: "1mb"
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// tell app to use these routes we created
app.use("/api/product", product);
app.use("/api/categories", category);
app.use("/api/register", register);
app.use((err, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: error.message
    }
  });
  console.log(error.message);
  next();
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/" + distributionRoot + "/index.html"));
});

app.listen(process.env.PORT || 3000, () =>
  console.log("App is up and running!")
);
