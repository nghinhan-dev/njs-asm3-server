const { validator } = require("./main");
const { body } = require("express-validator");

const addOrderValidator = () =>
  validator([
    body("address").notEmpty().withMessage("Address cannot be blank"),
  ]);

module.exports = { addOrderValidator };
