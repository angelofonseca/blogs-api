const { userService } = require('../services');

const login = async (req, res) => {
  const { status, data } = await userService.login(req.body);

  res.status(status).json(data);
};

const create = async (req, res) => {
  const { status, data } = await userService.create(req.body);

  res.status(status).json(data);
};

const find = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.find(id);

  res.status(status).json(data);
};

const findAll = async (req, res) => {
  const { status, data } = await userService.findAll();

  res.status(status).json(data);
};

module.exports = {
  login,
  create,
  find,
  findAll,
};