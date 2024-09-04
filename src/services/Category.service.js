const { Category } = require('../models');
const { validateNewCategory } = require('./validations/validate');

const create = async (name) => {
  const error = validateNewCategory(name);

  if (error) return error;

  const newCategory = await Category.create(name);

  return { status: 201, data: newCategory };
};

const findAll = async () => {
  const categories = await Category.findAll();

  return { status: 200, data: categories };
};

module.exports = {
  create,
  findAll,
};