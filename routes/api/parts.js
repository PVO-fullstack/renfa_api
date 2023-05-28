const express = require("express");
const ctrl = require("../../controllers/parts");
const router = express.Router();

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/part");

router.get("/", authenticate, ctrl.getAllParts);

router.get("/:partId", authenticate, isValidId, ctrl.getPartById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.postPart);

router.delete("/:partId", authenticate, isValidId, ctrl.deletePartById);

router.put(
  "/:partId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
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
