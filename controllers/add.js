const { Add } = require("../models/add");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");
// const { Model } = require("mongoose");

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

// const getAllOrders = async (req, res) => {
//   // const { page = 1, limit = 10 } = req.query;
//   // console.log("page", page);
//   // console.log("limit", limit);
//   // const skip = (page - 1) * limit;
//   const result = await Order.find({}, "-createdAt -updatedAt", {
//     // skip,
//     // limit,
//   });
//   res.status(200).json(result);
// };

const getAllAdd = async (req, res) => {
  const result = await Add.find({}, "-updatedAt")
    .populate("owner")
    .populate("partId.id");
  res.status(200).json(result);
};

const getUserAdd = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Add.find({ owner }, "-updatedAt").populate("partId.id");
  res.status(200).json(result);
};

const postAdd = async (req, res) => {
  const { _id: owner, email } = req.user;
  console.log(owner);
  const result = await Add.create({ ...req.body, owner });
  console.log("result", result);
  //   const { id } = result._id;
  //   const add = await Add.find({ id }).populate("owner").populate("part.id");
  //   console.log(add);
  //   const verifyEmail = {
  //     to: email,
  //     subject: "Order",
  //     html: add,
  //   };

  //   await sendEmail(verifyEmail);

  res.status(201).json(result);
};

// const getModelBrand = async (req, res) => {
//   const { brand } = req.params;
//   const result = await Part.find({ Brand: brand }, { Model: 1 });
//   res.status(200).json(result);
// };

// const getModel = async (req, res) => {
//   const { model } = req.params;
//   const result = await Part.find({ Model: model });
//   res.status(200).json(result);
// };

// const getPartById = async (req, res) => {
//   const { partId } = req.params;
//   const result = await Part.findById(partId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

// const postPart = async (req, res) => {
//   const { _id: owner } = req.user;
//   console.log(owner);
//   const result = await Part.create({ ...req.body, owner });
//   res.status(201).json(result);
// };

// const deletePartById = async (req, res) => {
//   const { partId } = req.params;
//   const result = await Part.findByIdAndDelete(partId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "Delete success",
//   });
// };

// const updatePartById = async (req, res) => {
//   const { partId } = req.params;
//   const result = await Part.findByIdAndUpdate(partId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

const updateAddById = async (req, res) => {
  const { addId } = req.params;
  const result = await Add.findByIdAndUpdate(addId, {
    close: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  console.log(result);
  res.json(result);
};

module.exports = {
  getAllAdd: ctrlWrapper(getAllAdd),
  postAdd: ctrlWrapper(postAdd),
  getUserAdd: ctrlWrapper(getUserAdd),
  updateAddById: ctrlWrapper(updateAddById),
  //   getModelBrand: ctrlWrapper(getModelBrand),
  //   getModel: ctrlWrapper(getModel),
  //   getPartById: ctrlWrapper(getPartById),
  //   postPart: ctrlWrapper(postPart),
  //   deletePartById: ctrlWrapper(deletePartById),
  //   updatePartById: ctrlWrapper(updatePartById),
  // updateFavoriteContactById: ctrlWrapper(updateFavoriteContactById),
};
