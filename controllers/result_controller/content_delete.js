const deleteContentService = require('../../services/result_services/result_content_delete_service');

const deleteContent = async (req, res, next) => {
  try {
    await deleteContentService(req, res, next);
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = deleteContent;
