const jimp = require("jimp");

const resizeAvatarImg = async (pathToImage) => {
  const image = await jimp.read(pathToImage);
  await image.resize(250, 250);
  await image.writeAsync(pathToImage);
};

module.exports = resizeAvatarImg;
