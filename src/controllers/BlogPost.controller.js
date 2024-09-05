const { blogPostService } = require('../services');

const create = async (req, res) => {
  const { email } = req.locals.user;
  const { status, data } = await blogPostService.create(req.body, email);
  res.status(status).json(data);
};

const findAll = async (req, res) => {
  const { status, data } = await blogPostService.findAll();

  res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
};