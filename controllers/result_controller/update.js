const updateResultService = require('../../services/result_services/result_update_service');

const updateResult = async (req, res, next) => {
  try {
    await updateResultService(req, res, next);
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = updateResult;
