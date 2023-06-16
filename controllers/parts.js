const { Part } = require("../models/part");
const { HttpError, ctrlWrapper, resizeAvatarImg } = require("../helpers");
const { Model } = require("mongoose");
const path = require("path");
const fs = require("fs/promises");

const imgDir = path.join(__dirname, "../", "public", "img");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drbkpqufz",
  api_key: "328527282443142",
  api_secret: "pS5hvjH5uwvqu30RcmPUb2Wc964",
  secure: true,
});

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

const getAllModel = async (req, res) => {
  const result = await Part.find({}, { Brand: 1, Model: 1 });
  // const result = await as.distinct("Model");
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
  const { path: tempUpload } = req.file;
  const uploaderRes = await cloudinary.uploader.upload(tempUpload);
  const result = await Part.findByIdAndUpdate(partId, {
    Img: uploaderRes.url,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const updatePartById = async (req, res) => {
//   const { partId } = req.params;
//   const { path: tempUpload, originalname } = req.file;
//   // await resizeAvatarImg(tempUpload);
//   const filename = `${partId}_${originalname}`;
//   console.log(filename);
//   const qwe = cloudinary.url(filename, {
//     width: 100,
//     height: 150,
//     crop: "fill",
//     fetch_format: "auto",
//   });
//   console.log(qwe);
//   // const resultUpload = path.join(avatarsDir, filename);
//   // await fs.rename(tempUpload, resultUpload);
//   // const avatarUrl = path.join("avatars", filename);
//   const result = await Part.findByIdAndUpdate(partId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

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
  getAllModel: ctrlWrapper(getAllModel),
  getModel: ctrlWrapper(getModel),
  getPartById: ctrlWrapper(getPartById),
  postPart: ctrlWrapper(postPart),
  deletePartById: ctrlWrapper(deletePartById),
  updatePartById: ctrlWrapper(updatePartById),
  // updateFavoriteContactById: ctrlWrapper(updateFavoriteContactById),
};
