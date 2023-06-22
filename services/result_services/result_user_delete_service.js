const Result = require('../../model/result');
const CustomError = require('../../utils/customerr');

const deleteUserService = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const delResult = await Result.destroy({ where: { userId: userId } });

    if (delResult === 0) {
      throw new CustomError(404, 'No matching rows found');
    }

    res.status(200).json({ message: 'All matching rows deleted successfully' });
  } catch (error) {
    if (error instanceof CustomError) {
      return next(error);
    }
    const err = new CustomError(500, 'Internal server error');
    return next(err);
  }
};

module.exports = deleteUserService;
