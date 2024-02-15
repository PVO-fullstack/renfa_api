const express = require("express");
const ctrl = require("../../controllers/add");
const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/add");

router.get("/", authenticate, ctrl.getAllAdd);

router.get(
  "/userorder",
  authenticate,
  validateBody(schemas.addNewSchema),
  ctrl.getUserAdd
);

// router.get("/model:brand", ctrl.getModelBrand);

// router.get("/brand:model", ctrl.getModel);

// router.get("/:partId", authenticate, isValidId, ctrl.getPartById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addNewSchema),
  ctrl.postAdd
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
  "/:addId/close",
  authenticate,
  isValidId.isValidAddId,
  validateBody(schemas.updateCloseSchema),
  ctrl.updateAddById
);

module.exports = router;
