const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidPartId = (req, res, next) => {
  const { partId } = req.params;
  if (!isValidObjectId(partId)) {
    next(HttpError(400, `%{id} is not valid id`));
  }
  next();
};

const isValidOrderId = (req, res, next) => {
  const { orderId } = req.params;
  if (!isValidObjectId(orderId)) {
    next(HttpError(400, `%{id} is not valid id`));
  }
  next();
};

module.exports = {
  isValidPartId,
  isValidOrderId,
};
