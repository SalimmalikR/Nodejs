const updateImageService = require('../../services/image_services/img_update_service');

const updateImage = async (req, res, next) => {
  const id = req.params.id;
  const imageName = req.params.imageName;

  try {
    await updateImageService(id, imageName, req, res, next);
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = updateImage;
