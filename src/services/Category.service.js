const { Category } = require('../models');
const { validateNewCategory } = require('./validations/validate');

const create = async (name) => {
  const error = validateNewCategory(name);

  if (error) return error;

  const newCategory = await Category.create(name);

  return { status: 201, data: newCategory };
};

module.exports = {
  create,
};