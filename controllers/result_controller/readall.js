const getMapService = require('../../services/result_services/result_readall_service');

const getMap = async (req, res, next) => {
  try {
    await getMapService(req, res, next);
  } catch (error) {
    const err = new CustomError(500, error.message);
    return next(err);
  }
};

module.exports = getMap;
