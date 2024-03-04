const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const userValidate = require("../middleware/validate/userValidate");
const carValidate = require("../middleware/validate/cartValidate");
const auth = require("../middleware/auth");

router.post("/signup", userValidate.signUpValidator(), userController.signUp);
router.post("/login", userValidate.loginValidator(), userController.login);
router.post(
  "/loginAdmin",
  userValidate.loginValidator(),
  userController.loginAdmin
);
router.get(
  "/loginWithSessionCokiee",
  userController.autoLoginWithSesssionCookie
);
router.post("/logout", userController.logOut);
router.patch(
  "/cart",
  auth.login,
  carValidate.addCartValidator(),
  userController.updateCart
);
router.get("/cart/:itemID", auth.login, userController.getCartItem);
router.get("/cart", auth.login, userController.getCart);

module.exports = router;
