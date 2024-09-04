const { loginSchema, newUserSchema } = require('./login.schema');

const validateLogin = (user) => {
  const { error } = loginSchema.validate(user);

  if (error) {
    return { status: 400, data: { message: error.message } };
  }
};

const validateNewUser = (user) => {
  const { error } = newUserSchema.validate(user);

  if (error) {
    return { status: 400, data: { message: error.message } };
  }
};

module.exports = {
  validateLogin,
  validateNewUser,
};