const express = require("express");
const ctrl = require("../../controllers/parts");
const router = express.Router();

const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/part");

router.get("/", ctrl.getAllParts);

router.get("/model:brand", ctrl.getModelBrand);

router.get("/allmodel", ctrl.getAllModel);

router.get("/brand:model", ctrl.getModel);

router.get("/:partId", authenticate, isValidId.isValidPartId, ctrl.getPartById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.postPart);

router.delete(
  "/:partId",
  authenticate,
  isValidId.isValidPartId,
  ctrl.deletePartById
);

router.patch(
  "/:partId",
  authenticate,
  isValidId.isValidPartId,
  upload.single("img"),
  ctrl.updatePartById
);

// router.patch(
//   "/:contactId/favorite",
//   authenticate,
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateFavoriteContactById
// );

module.exports = router;
