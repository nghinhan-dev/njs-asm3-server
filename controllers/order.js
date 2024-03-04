const Order = require("../models/Orders");

exports.postOrder = async (req, res) => {
  const reqAddress = req.body.address;

  const newOrder = new Order({
    user: req.user._id,
    address: reqAddress,
    items: req.user.cart.items,
    total: req.user.cart.totalPrice,
  });

  req.user.cart = {
    items: [],
    totalPrice: 0,
  };

  await req.user.save();
  await newOrder.save();

  res.status(200).send(newOrder);
};

exports.getOrders = async (req, res) => {
  const userID = req.user._id;

  try {
    const orderArr = await Order.find({ user: userID }).populate(
      "user",
      "-cart"
    );
    res.status(200).send(orderArr);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getOrder = async (req, res) => {
  const orderId = req.params.orderId;

  const order = await Order.findById(orderId)
    .populate("user", "-cart")
    .populate({
      path: "items",
      populate: {
        path: "item",
      },
    });

  if (!order) {
    res.status(400).send({ error: "Can't found order" });
  }

  res.status(200).send(order);
};
