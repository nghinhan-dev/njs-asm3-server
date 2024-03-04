const Product = require("../models/Products");

exports.getProducts = async (req, res) => {
  const prods = await Product.find({});

  res.status(200).send(prods);
};

exports.getDetail = async (req, res) => {
  try {
    const id = req.params.prdID;

    const product = await Product.findById(id);

    res.status(200).send(product);
  } catch (error) {
    console.log("error:", error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.prdID;
    const update = req.body;

    const product = await Product.findByIdAndUpdate(id, update, { new: true });

    res.status(200).send(product);
  } catch (error) {
    console.log("error:", error);
  }
};
