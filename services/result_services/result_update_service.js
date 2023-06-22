const Result = require('../../model/result');
const CustomError = require('../../utils/customerr');

const updateResultService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { contentId, updatedContent } = req.body;

    const existingResult = await Result.findOne({ where: { userId: id, contentId: contentId } });
    if (!existingResult) {
      const err = new CustomError(404, 'Result not found');
      return next(err);
    }

    const repeat = await Result.findOne({ where: { userId: id, contentId: updatedContent } });
    if (repeat) {
      const err = new CustomError(404, 'Repeated content is not allowed');
      return next(err);
    }

    await existingResult.update({ contentId: updatedContent });

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      data: existingResult,
    });
  } catch (error) {
    const err = new CustomError(500, error.message || 'Failed to update result');
    return next(err);
  }
};

module.exports = updateResultService;
