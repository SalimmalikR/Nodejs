const createResultService = require('../../services/result_services/result_create_service');

const createResult = async (req, res, next) => {
  try {
    await createResultService(req, res, next);
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = createResult;
