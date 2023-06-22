const User = require('../../model/users');
const bcrypt = require('bcrypt');
const CustomError = require('../../utils/customerr');

class UserService {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async updateUser(id, updatedData) {
    return await User.update(updatedData, { where: { id } });
  }
}

module.exports = new UserService();
