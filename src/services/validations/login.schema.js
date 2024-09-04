const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().messages({
    'string.empty': 'Some required fields are missing',
  }),
  password: Joi.string().messages({
    'string.empty': 'Some required fields are missing',
  }),
});

module.exports = {
  loginSchema,
};