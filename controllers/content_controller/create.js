const createContentWithImagesService = require('../../services/content_services/create_service');

const createContentWithImages = async (req, res, next) => {
  try {
    const { content1, content2 } = req.body;

    const result = await createContentWithImagesService.createContentWithImages(content1, content2, req.files, req);

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'Content and images created successfully',
      ...result,
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = createContentWithImages;
