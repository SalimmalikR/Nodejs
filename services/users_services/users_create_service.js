const User = require('../../model/users');
const bcrypt = require('bcrypt');
const CustomError = require('../../utils/customerr');

class UserService {
  async createUser(username, email, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

module.exports = new UserService();
