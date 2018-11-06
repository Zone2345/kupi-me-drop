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

const RegisterSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  username: String,
  password: String,
});



const RegisterModel = mongoose.model("register", RegisterSchema);
module.exports = RegisterModel;
