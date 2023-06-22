const User = require('../../model/users');
const CustomError = require('../../utils/customerr');

class UserService {
  async deleteUser(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    await user.destroy();
  }
}

module.exports = new UserService();
