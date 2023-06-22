const UserImage = require('../../model/images');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const CustomError = require('../../utils/customerr');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: 'D:/GITHUB_PROJECT/nodejs/Extract_img_with_CRUD/images/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create Multer upload instance
const upload = multer({ storage }).single('file');

const updateImageService = async (id, imageName, req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        const error = new CustomError(400, 'Error uploading file');
        return next(error);
      }

      // Check if a file was uploaded
      if (!req.file) {
        const error = new CustomError(400, 'No file was uploaded');
        return next(error);
      }

      const newFile = req.file;
      const imagesFolderPath = 'D:/GITHUB_PROJECT/nodejs/Extract_img_with_CRUD/images/extracted_img';
      const newImagePath = path.join(imagesFolderPath, newFile.originalname);

      // Check if the new image file exists
      const isImageExists = await fs.promises
        .access(newImagePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

      if (!isImageExists) {
        const error = new CustomError(404, 'New image file not found in the Extracted image folder');
        return next(error);
      }

      const baseUrl = `${req.protocol}://${req.get('host')}/`;
      const imageUrl = `${baseUrl}${imageName}`;

      // Find the existing image record
      const existingImage = await UserImage.findOne({
        where: {
          id: id,
          img_url: imageUrl
        }
      });

      if (!existingImage) {
        const error = new CustomError(404, 'Image not found or not associated with the specified URL');
        return next(error);
      }

      // Check if the new file is already associated with the user
      const isDuplicateFile = await UserImage.findOne({
        where: {
          id: id,
          img_url: `${baseUrl}${newFile.originalname}`
        }
      });

      if (isDuplicateFile) {
        const error = new CustomError(400, 'The given file is already present in the specified user image folder');
        return next(error);
      }

      // Update the image URL
      existingImage.img_url = `${baseUrl}${newFile.originalname}`;
      await existingImage.save();

      res.status(200).json({
        statusCode: 200,
        status: 'success',
        message: 'Image updated successfully'
      });
    });
  } catch (error) {
    const err = new CustomError(500, error.message || error);
    return next(err);
  }
};

module.exports = updateImageService;
