const ContentService = require('../../services/content_services/read_service');
const CustomError = require('../../utils/customerr');

const contentService = new ContentService();

const readContentWithImages = async (req, res, next) => {
  const contentId = req.params.id;

  try {
    const content = await contentService.readContentWithImages(contentId);
    if (!content || content.length === 0)
      return next(new CustomError(404, 'Content not found'));

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      content: content,
    });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};

module.exports = readContentWithImages;
