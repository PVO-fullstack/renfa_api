const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { partId } = req.params;
  if (!isValidObjectId(partId)) {
    next(HttpError(400, `%{id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
