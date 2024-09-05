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

const find = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await blogPostService.find(id);

  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { email } = req.locals.user;
  const { status, data } = await blogPostService.update(id, req.body, email);
  res.status(status).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { email } = req.locals.user;
  const { status, data } = await blogPostService.remove(id, email);
  if (data) return res.status(status).json(data);
  res.status(status).end();
};

const search = async (req, res) => {
  const { q: searchTerm } = req.query;
  const { status, data } = await blogPostService.search(searchTerm);

  res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
  find,
  update,
  remove,
  search,
};