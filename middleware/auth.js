const User = require("../models/User");

exports.login = async (req, res, next) => {
  try {
    if (req.session.userID) {
      const user = await User.findById(req.session.userID);

      if (user) {
        req.user = user;
        return next();
      } else {
        const error = new Error("User cannot found");
        error.statusCode = 409;
        throw error;
      }
    } else {
      const error = new Error("Login first");
      error.statusCode = 409;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
