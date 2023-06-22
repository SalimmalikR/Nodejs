const UserService = require('../../services/users_services/users_update_service');
const CustomError = require('../../utils/customerr');

const updateData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const updatedData = {
      username,
      email,
      password: password ? await UserService.hashPassword(password) : undefined
    };

    const user = await UserService.updateUser(id, updatedData);

    if (!user) {
      const err = new CustomError(404, 'User not found');
      return next(err);
    }

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'User updated successfully',
    });
  } catch (error) {
    const err = new CustomError(500, error.message || 'Failed to update user');
    return next(err);
  }
};

module.exports = updateData;
