const { User } = require('../models');
const { createToken } = require('../utils/auth');
const { validateLogin, validateNewUser } = require('./validations/validate');

const login = async (user) => {
  const error = validateLogin(user);
  const { email, password } = user;
  if (error) return error;
  const isUser = await User.findOne({ where: { email } });
  if (!isUser || (password !== isUser.password)) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }
  const newToken = createToken(user);
  return { status: 200, data: { token: newToken } };
};

const create = async (user) => {
  const error = validateNewUser(user);
  if (error) return error;
  const notAvailableEmail = await User.findOne({ where: { email: user.email } });
  if (notAvailableEmail) return { status: 409, data: { message: 'User already registered' } };
  await User.create(user);
  const newToken = createToken(user);
  return { status: 201, data: { token: newToken } };
};

const find = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) return { status: 404, data: { message: 'User does not exist' } };
  const { password, ...userInfo } = user.dataValues;
  return { status: 200, data: userInfo };
};

const findAll = async () => {
  const users = await User.findAll();
  const result = users.reduce((acc, user) => {
    const { password, ...userInfo } = user.dataValues;
    return [...acc, userInfo];
  }, []);
  return { status: 200, data: result };
};

module.exports = {
  login,
  create,
  find,
  findAll,
};