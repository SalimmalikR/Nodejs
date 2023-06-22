const User = require('../../model/users');
const Content = require('../../model/content');
const Image = require('../../model/images');
const Result = require('../../model/result');
const CustomError = require('../../utils/customerr');

const createResultService = async (req, res, next) => {
  try {
    const { userId, contentId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      const err = new CustomError(404, 'User not found');
      return next(err);
    }

    const contentData = await Content.findByPk(contentId, {
      include: [
        {
          model: Image,
          attributes: ['id', 'img_url'],
        },
      ],
    });
    if (!contentData) {
      const err = new CustomError(404, 'Content not found');
      return next(err);
    }

    const existingResult = await Result.findOne({ where: { contentId } });
    if (existingResult) {
      const err = new CustomError(409, 'Given Content already exists for the content');
      return next(err);
    }

    const createdResult = await Result.create({
      userId: userId,
      contentId: contentId,
    });

    res.status(201).json({
      statusCode: 201,
      status: 'success',
      data: createdResult,
    });
  } catch (error) {
    const err = new CustomError(500, error.message || error);
    return next(err);
  }
};

module.exports = createResultService;
