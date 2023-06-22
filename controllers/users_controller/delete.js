const UserService = require('../../services/users_services/user_delete_service');
const CustomError = require('../../utils/customerr');

const deleteuser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await UserService.deleteUser(id);

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    const err = new CustomError(500, error.message || 'Failed to delete user');
    return next(err);
  }
};

module.exports = deleteuser;
