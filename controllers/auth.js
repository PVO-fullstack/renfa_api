const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();
const { User } = require("../models/user");
const { HttpError, ctrlWrapper, resizeAvatarImg } = require("../helpers");
const path = require("path");
const fs = require("fs/promises");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
  });

  let token = "";

  const thisUser = await User.findOne({ email });
  if (thisUser) {
    const payload = {
      id: thisUser._id,
    };

    token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(thisUser._id, { token });
  }

  res.status(201).json({
    token,
    user: {
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatarUrl,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });
  // console.log("res", token);

  res.status(200).json({
    token,
    user: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      avatar: user.avatarUrl,
      position: user.position,
      city: user.city,
      numberNewPost: user.numberNewPost,
    },
  });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { phone, city, name, numberNewPost } = req.body;
  // const user = await User.findOne({ email });
  // console.log("user", _id);
  // console.log(phone);
  // console.log(city);
  // if (!user) {
  //   throw HttpError(401, "Email or password invalid");
  // }
  const newUserData = await User.findByIdAndUpdate(_id, {
    phone: phone,
    city: city,
    name: name,
    numberNewPost: numberNewPost,
  });

  res.json({
    newUserData,
  });
};

const getCurrent = async (req, res) => {
  const { email, name, phone, avatarUrl, position, city, numberNewPost } =
    req.user;

  res.json({
    email,
    name,
    phone,
    avatar: avatarUrl,
    city,
    numberNewPost,
    position,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await resizeAvatarImg(tempUpload);
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarUrl });
  res.json({
    avatarUrl,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUser: ctrlWrapper(updateUser),
};
