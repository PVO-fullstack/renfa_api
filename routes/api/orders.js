const express = require("express");
const ctrl = require("../../controllers/orders");
const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/order");

router.get("/", authenticate, ctrl.getAllOrders);

router.get(
  "/userorder",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.getUserOrders
);

// router.get("/model:brand", ctrl.getModelBrand);

// router.get("/brand:model", ctrl.getModel);

// router.get("/:partId", authenticate, isValidId, ctrl.getPartById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.postOrders
);

// router.delete("/:partId", authenticate, isValidId, ctrl.deletePartById);

// router.put(
//   "/:partId",
//   authenticate,
//   isValidId,
//   validateBody(schemas.addSchema),
//   ctrl.updatePartById
// );

router.patch(
  "/:orderId/close",
  authenticate,
  isValidId.isValidOrderId,
  validateBody(schemas.updateCloseSchema),
  ctrl.updateOrderById
);

module.exports = router;
