const Joi = require('joi');

const newPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1),
}).messages({ '*': 'Some required fields are missing' });

module.exports = {
  newPostSchema,
};