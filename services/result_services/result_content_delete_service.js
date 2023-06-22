const Result = require('../../model/result');
const CustomError = require('../../utils/customerr');

const deleteContentService = async (req, res, next) => {
  try {
    const { id, contentId } = req.params;

    const delContent = await Result.destroy({ where: { userId: id, contentId: contentId } });

    if (delContent === 0) {
      // No content found or deleted
      throw new CustomError(404, 'Content not found');
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    const err = new CustomError(500, 'Internal server error');
    return next(err);
  }
};

module.exports = deleteContentService;
