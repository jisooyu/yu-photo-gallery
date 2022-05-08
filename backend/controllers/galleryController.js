const asyncHandler = require('express-async-handler');

const { upload } = require('./awsController');

const createGallery = asyncHandler(async (req, res) => {
  // image 파일은 req.file에서 받음
  const image = req.file;

  // 이미지를  AWS S3에 올림
  const result = await upload(image);

  // return image url of AWS S3
  res.status(201).json({ location: result.Location });
});

const getGallery = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get photos ' });
});

module.exports = {
  createGallery,
  getGallery,
};
