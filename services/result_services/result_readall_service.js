const Content = require('../../model/content');
const Images = require('../../model/images');
const Result = require('../../model/result');
const Users = require('../../model/users');
const CustomError = require('../../utils/customerr');

const getMapService = async (req, res, next) => {
  try {
    const results = await Result.findAll({
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
      const err = new CustomError(404, 'No users found');
      return next(err);
    }

    const users = {};

    results.forEach((result) => {
      const user = result.user;
      const content = result.content;
      const images = result.content.images;

      if (!users[user.username]) {
        users[user.username] = {
          content: [],
        };
      }

      users[user.username].content.push({
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
      users: users,
    });
  } catch (error) {
    const err = new CustomError(500, error.message || error);
    return next(err);
  }
};

module.exports = getMapService;
