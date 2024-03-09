const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");
const orderValidator = require("../middleware/validate/orderValidate");
const auth = require("../middleware/auth");

router.post(
  "/post",
  auth.login,
  orderValidator.addOrderValidator(),
  orderController.postOrder
);
router.get("/", auth.login, orderController.getOrders);
router.get("/:orderId", auth.login, orderController.getOrder);

module.exports = router;
