const UserService = require('../../services/users_services/users_create_service');
const CustomError = require('../../utils/customerr');

const createData = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await UserService.createUser(username, email, password);

    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    const err = new CustomError(500, error.message || 'Failed to create user');
    return next(err);
  }
};

module.exports = createData;
