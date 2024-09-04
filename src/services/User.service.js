const { User } = require('../models');
const { createToken } = require('../utils/auth');
const { validateUser } = require('./validations/validate');

const login = async (user) => {
  const error = validateUser(user);
  const { email, password } = user;

  if (error) return { status: error.status, data: { message: error.message } };

  const isUser = await User.findOne({ where: { email } });

  if (!isUser || (password !== isUser.password)) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }

  const newToken = createToken(user);

  return { status: 200, data: { token: newToken } };
};

module.exports = {
  login,
};