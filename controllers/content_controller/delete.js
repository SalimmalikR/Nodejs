const ContentService = require('../../services/content_services/delete_service');
const CustomError = require('../../utils/customerr');

const contentService = new ContentService();

const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    await contentService.deleteContent(id);

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'Content and associated images deleted successfully',
    });
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = deleteContent;
