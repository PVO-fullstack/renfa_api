const { Part } = require("../models/part");
const { HttpError, ctrlWrapper } = require("../helpers");
const { Model } = require("mongoose");

// const getAllParts = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 10 } = req.query;
//   console.log("page", page);
//   console.log("limit", limit);
//   const skip = (page - 1) * limit;
//   const result = await Part.find({ owner }, "-createdAt -updatedAt", {
//     skip,
//     limit,
//   });
//   res.status(200).json(result);
// };

const getAllParts = async (req, res) => {
  // const { page = 1, limit = 10 } = req.query;
  // console.log("page", page);
  // console.log("limit", limit);
  // const skip = (page - 1) * limit;
  const result = await Part.find({}, "-createdAt -updatedAt", {
    // skip,
    // limit,
  });
  res.status(200).json(result);
};

const getModelBrand = async (req, res) => {
  const { brand } = req.params;
  const result = await Part.find({ Brand: brand }, { Model: 1 });
  res.status(200).json(result);
};

const getModel = async (req, res) => {
  const { model } = req.params;
  const result = await Part.find({ Model: model });
  res.status(200).json(result);
};

const getPartById = async (req, res) => {
  const { partId } = req.params;
  const result = await Part.findById(partId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const postPart = async (req, res) => {
  // const { _id: owner } = req.user;
  // console.log(owner);
  const result = await Part.create({ ...req.body });
  res.status(201).json(result);
};

const deletePartById = async (req, res) => {
  const { partId } = req.params;
  const result = await Part.findByIdAndDelete(partId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const updatePartById = async (req, res) => {
  const { partId } = req.params;
  const result = await Part.findByIdAndUpdate(partId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const updateFavoriteContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

module.exports = {
  getAllParts: ctrlWrapper(getAllParts),
  getModelBrand: ctrlWrapper(getModelBrand),
  getModel: ctrlWrapper(getModel),
  getPartById: ctrlWrapper(getPartById),
  postPart: ctrlWrapper(postPart),
  deletePartById: ctrlWrapper(deletePartById),
  updatePartById: ctrlWrapper(updatePartById),
  // updateFavoriteContactById: ctrlWrapper(updateFavoriteContactById),
};
