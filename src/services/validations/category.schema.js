const Joi = require('joi');

const newCategorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  newCategorySchema,
};