const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().messages({
    'string.empty': 'Some required fields are missing',
  }),
  password: Joi.string().messages({
    'string.empty': 'Some required fields are missing',
  }),
});

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'min.length': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'any.email': '"email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'min.length': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
});

module.exports = {
  loginSchema,
  newUserSchema,
};