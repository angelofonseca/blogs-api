const { userService } = require('../services');

const login = async (req, res) => {
  const { status, data } = await userService.login(req.body);

  res.status(status).json(data);
};

const create = async (req, res) => {
  const { status, data } = await userService.create(req.body);

  res.status(status).json(data);
};

module.exports = {
  login,
  create,
};