const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    totalPrice: Number,
  },
  {
    _id: false,
  }
);

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  phoneNumber: String,
  role: {
    type: String,
    default: "customer",
  },
  cart: cartSchema,
  role: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
