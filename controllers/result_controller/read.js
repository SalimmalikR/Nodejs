const getUserWithContentsService = require('../../services/result_services/result_readuser_service');

const getUserWithContents = async (req, res, next) => {
  try {
    await getUserWithContentsService(req, res, next);
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = getUserWithContents;
