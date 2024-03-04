const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  address: String,
  status: {
    type: String,
    default: "COD",
  },
  delivery: {
    type: String,
    default: "On delivery",
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      _id: false,
    },
  ],
  total: Number,
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
