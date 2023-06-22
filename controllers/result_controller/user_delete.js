const deleteUserService = require('../../services/result_services/result_user_delete_service');

const deleteUser = async (req, res, next) => {
  try {
    await deleteUserService(req, res, next);
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = deleteUser;
