const User = require('../../model/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CustomError = require('../../utils/customerr');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const err = new CustomError(404, 'User not found');
            return next(err);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const err = new CustomError(404, 'Invalid password');
            return next(err);
        }
        const token = jwt.sign({ id: user.id }, 'secretkey');
        res.status(200).json({
            statuscode: 200,
            status: 'success',
            token: { token }
        });
    } catch (error) {
        const err = new CustomError(500, error.message);
        return next(err);
    }
};

module.exports = login;