const Users = require('../../model/content');
const CustomError = require('../../utils/customerr');

const update_content = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const user = await Users.findByPk(id);

    if (!user) {
      const err = new CustomError(404, 'user not found')
      return next(err);
    }
    await user.update({ content });

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'Content updated successfully',
      user,
    });
  } catch (error) {
    const err = new CustomError(500, error.message)
    return next(err);
  }
};

module.exports = update_content;
