const mongoose = require("mongoose");

const productModelSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  usage: Number,
});

const product = mongoose.model("product", productModelSchema);

module.exports = product;
