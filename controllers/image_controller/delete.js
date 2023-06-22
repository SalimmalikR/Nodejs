const ImageService = require('../../services/image_services/img_delete_service');
const CustomError = require('../../utils/customerr');

const deleteImage = async (req, res, next) => {
  const id = req.params.id;
  const oldFile = req.params.imageName;

  try {
    await ImageService.deleteImage(id, oldFile, req);

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'Image deleted successfully.',
    });
  } catch (error) {
    const err = new CustomError(500, error.message || error);
    return next(err);
  }
};

module.exports = deleteImage;
