const User = require("../models/User");
const Product = require("../models/Products");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { userName, email, phoneNumber, password } = req.body;

  try {
    const user = await User.find({ email: email });

    if (user[0]) {
      return res.status(409).send({
        error: "Email already exists",
        message:
          "Existed email, please use a different email or try logging in.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).send({ result: "Create sucessfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  if (req.user?.userName === userName) {
    return res.status(409).send({
      error: "Already logged in",
    });
  }

  const user = await User.find({ userName: userName });

  if (user.length === 0) {
    return res.status(404).send({
      error: "User not found",
      message: "Provided username doesn't exist",
    });
  }

  const isMatch = bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Incorrect password",
    });
  }

  req.session.userID = user[0]._id;
  req.session.isAuth = true;
  req.session.save();

  return res
    .status(200)
    .send({ statusText: "Login sucessfully", user: user[0] });
};

exports.autoLoginWithSesssionCookie = async (req, res) => {
  try {
    if (req.session.userID) {
      const user = await User.findById(req.session.userID);

      if (!user) {
        res.status(404).send({ error: "User not found" });
      }

      res.status(200).send(user);
    } else {
      res.status(409).send({ error: "Login first" });
    }
  } catch (error) {
    console.error("Error in loginAuth:", error);
  }
};

exports.loginAdmin = async (req, res) => {
  const { userName, password } = req.body;

  if (req.user?.userName === userName) {
    return res.status(409).send({
      error: "Already logged in",
    });
  }

  const user = await User.find({ userName: userName });

  if (user.length === 0) {
    return res.status(404).send({
      error: "User not found",
      message: "Provided username doesn't exist",
    });
  }

  const isMatch = bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Incorrect password",
    });
  }

  if (user[0].role !== "admin") {
    return res.status(401).send({
      error: "Invalid",
      message: "Unauthorized account",
    });
  }

  req.session.userID = user[0]._id;
  req.session.isAdmin = true;
  req.session.save();

  return res.status(200).send({ user: user[0] });
};

exports.logOut = async (req, res) => {
  req.session.destroy(() => {});

  res.status(200).send("Log out");
};

exports.updateCart = async (req, res) => {
  let user = await req.user.populate({
    path: "cart",
    populate: {
      path: "items",
      populate: {
        path: "item",
      },
    },
  });

  try {
    const updatedItem = req.body;

    if (user.cart.items.length === 0) {
      const newItem = {
        item: {
          _id: new mongoose.Types.ObjectId(updatedItem._id),
        },

        quantity: updatedItem.newQuantity,
      };

      const item = await Product.findById(updatedItem._id);

      user.cart.items.push(newItem);
      user.cart.totalPrice = +item.price * newItem.quantity;

      await user.save();
      return res.status(200).send({ updateItem: newItem });
    }

    const cartItemIndex = user.cart.items.findIndex(
      (itemDetail) => itemDetail.item._id.toString() === updatedItem._id
    );

    if (cartItemIndex === -1) {
      const newItem = {
        item: {
          _id: new mongoose.Types.ObjectId(updatedItem._id),
        },

        quantity: updatedItem.newQuantity,
      };

      user.cart.items.push(newItem);
      await user.save();
      return res.status(200).send({ updateItem: newItem });
    } else {
      user.cart.items[cartItemIndex].quantity += updatedItem.newQuantity;
      user.cart.totalPrice = user.cart.items.reduce((acc, cur) => {
        return acc + cur.item.price * cur.quantity;
      }, 0);
    }

    await user.save();

    return res.status(200).send({ updateItem: user.cart.items[cartItemIndex] });
  } catch (error) {
    console.error("Error:", error);
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await req.user.populate({
      path: "cart",
      populate: {
        path: "items",
        populate: {
          path: "item",
        },
      },
    });

    res.status(200).send(user.cart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getCartItem = async (req, res) => {
  const itemID = req.params.itemID;

  const item = await Product.findById(itemID);
  const cartItemIndex = req.user.cart.items.findIndex(
    (itemDetail) => itemDetail.item._id.toString() === itemID
  );

  const cartItem = {
    item: item,
    quantity: req.user.cart.items[cartItemIndex].quantity,
  };

  res.status(200).send(cartItem);
};

exports.delCartItem = async (req, res) => {
  const itemID = req.params.itemID;
  const user = req.user;
  const cartItemIndex = user.cart.items.findIndex(
    (itemDetail) => itemDetail.item._id.toString() === itemID
  );

  if (cartItemIndex === -1) {
    return res.status(404).send({
      error: "Cannot delete",
      message: "Provided id params is incorrect",
    });
  }

  [1, 2, 3].slice();

  user.cart.items.slice(cartItemIndex);
  user.cart.totalPrice = user.cart.items.reduce((acc, cur) => {
    return acc + cur.item.price * cur.quantity;
  }, 0);
};
