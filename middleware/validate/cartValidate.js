const { validator } = require("./main");
const { body } = require("express-validator");

const addCartValidator = () =>
  validator([
    body("newQuantity")
      .isInt()
      .withMessage("newQuantity value must be a number"),
  ]);

module.exports = { addCartValidator };
