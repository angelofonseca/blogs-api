const { loginSchema } = require('./login.schema');

const validateUser = (user) => {
  const { error } = loginSchema.validate(user);

  if (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  validateUser,
};