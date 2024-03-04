// routes
const userRoutes = require("../routes/user");
const prdRoutes = require("../routes/product");
const orderRoutes = require("../routes/order");

function useRoutes(app) {
  app.use("/user", userRoutes);
  app.use("/product", prdRoutes);
  app.use("/order", orderRoutes);
}

module.exports = { useRoutes };
