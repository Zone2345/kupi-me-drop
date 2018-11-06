const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const { dbDev, dbProd } = require("../constants");
const app = express();
const connection = mongoose.createConnection(
  app.get("env") === "development" ? dbDev : dbProd
);
autoIncrement.initialize(connection);

const ProductSchema = new Schema({
  title: String,
  description: String,
  photo: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  price: Number,
  size: String,
  created: Number,
  quantity: Number
});

ProductSchema.plugin(autoIncrement.plugin, {
  model: "product",
  field: "productId"
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
