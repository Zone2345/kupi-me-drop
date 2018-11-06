const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const {
  dbDev,
  dbProd
} = require("../constants");
const app = express();
const connection = mongoose.createConnection(app.get("env") === "development" ? dbDev : dbProd);
autoIncrement.initialize(connection);

const CategorySchema = new Schema({
  description: String,
});

CategorySchema.plugin(autoIncrement.plugin, {
  model: "category",
  field: "categoryId"
});
const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;
