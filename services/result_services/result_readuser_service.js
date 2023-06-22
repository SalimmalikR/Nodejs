const Content = require('../../model/content');
const Images = require('../../model/images');
const Result = require('../../model/result');
const Users = require('../../model/users');
const CustomError = require('../../utils/customerr');

const getUserWithContentsService = async (req, res, next) => {
  const id = req.params.id;

  try {
    const results = await Result.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: Users,
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Content,
          attributes: ['id', 'content'],
          include: [
            {
              model: Images,
              attributes: ['id', 'img_url', 'contentId'],
            },
          ],
        },
      ],
    });

    if (results.length === 0) {
      const err = new CustomError(404, 'User not found');
      return next(err);
    }

    const user = {
      username: results[0].user.username,
      content: [],
    };

    results.forEach((result) => {
      const content = result.content;
      const images = result.content.images;

      user.content.push({
        id: content.id,
        content: content.content,
        images: images.map((image) => ({
          id: image.id,
          img_url: image.img_url,
          contentId: image.contentId,
        })),
      });
    });

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      user: user,
    });
  } catch (error) {
    const err = new CustomError(500, error.message || error);
    return next(err);
  }
};

module.exports = getUserWithContentsService;
