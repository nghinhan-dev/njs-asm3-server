const { validationResult } = require("express-validator");

const validator = (validations) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      const errorArr = errors.array();

      const error = new Error("Invalid fields");
      error.statusCode = 400;
      error.errors = errorArr;

      throw error;
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { validator };
