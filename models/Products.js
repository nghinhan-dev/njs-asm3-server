const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  category: String,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
  long_desc: String,
  name: String,
  price: Number,
  count: {
    type: Number,
    default: 0,
  },
  short_desc: String,
});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
