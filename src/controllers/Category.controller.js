const { categoryService } = require('../services');

const create = async (req, res) => {
  const { status, data } = await categoryService.create(req.body);

  res.status(status).json(data);
};

const findAll = async (req, res) => {
  const { status, data } = await categoryService.findAll();

  res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
};