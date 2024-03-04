const { validator } = require("./main");
const { body } = require("express-validator");

const signUpValidator = () =>
  validator([
    body("userName").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ]);

const loginValidator = () =>
  validator([
    body("userName").notEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ]);

module.exports = { signUpValidator, loginValidator };
