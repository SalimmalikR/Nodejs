const User = require('../../model/users');
const CustomError = require('../../utils/customerr');

class UserService {
  async findUserById(id) {
    return await User.findByPk(id);
  }
}

module.exports = new UserService();
