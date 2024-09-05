const { BlogPost, User, Category, PostCategory } = require('../models');
const { validateNewPost, validateUpdatePost } = require('./validations/validate');

const options = {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    {
      model: Category,
      as: 'categories',
      attributes: { exclude: ['PostCategory'] },
      through: { attributes: [] },
    },
  ],
};

const create = async (post, email) => {
  const error = validateNewPost(post);
  if (error) return error;
  const { dataValues: { id } } = await User.findOne({ where: { email } });
  const categories = await Category.findAll();
  const result = categories.every(({ id: categoryId }) => post.categoryIds.includes(categoryId));
  if (!result) return { status: 400, data: { message: 'one or more "categoryIds" not found' } };

  const newPost = await BlogPost.create(
    { userId: id, ...post },
    { include: { model: Category, as: 'categories' } },
  );
  const postCategories = categories.map(({ id: categoryId }) => (
    { postId: newPost.id, categoryId }));
  await PostCategory.bulkCreate(postCategories);
  return { status: 201, data: newPost };
};
const findAll = async () => {
  const posts = await BlogPost.findAll(options);
  return { status: 200, data: posts };
};

const find = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, ...options });
  if (!post) return { status: 404, data: { message: 'Post does not exist' } };
  return { status: 200, data: post };
};

const update = async (id, info, email) => {
  const error = validateUpdatePost(info);
  if (error) return error;
  const user = await User.findOne({ where: { email } });
  if (user.dataValues.id !== +id) return { status: 401, data: { message: 'Unauthorized user' } };
  const { title, content } = info;
  await BlogPost.update({ title, content }, { where: { id } });
  const { data } = await find(id);
  return { status: 200, data };
};

module.exports = {
  create,
  findAll,
  find,
  update,
};