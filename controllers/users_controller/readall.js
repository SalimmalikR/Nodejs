const UserService = require('../../services/users_services/user_readall_service');
const CustomError = require('../../utils/customerr');

const readusers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserService.findUserById(id);

    if (!user) {
      const err = new CustomError(404, 'User not found');
      return next(err);
    }

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      user,
    });
  } catch (error) {
    const err = new CustomError(500, error.message || 'Failed to read user');
    return next(err);
  }
};

module.exports = readusers;
