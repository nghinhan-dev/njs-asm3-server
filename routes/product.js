const express = require("express");
const router = express.Router();

const prdController = require("../controllers/product");

router.get("/", prdController.getProducts);
router.get("/:prdID", prdController.getDetail);
router.patch("/:prdID", prdController.updateProduct);

module.exports = router;
