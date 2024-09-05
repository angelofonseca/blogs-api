const { BlogPost, User, Category, PostCategory } = require('../models');
const { validateNewPost, validateUpdatePost } = require('./validations/validate');

const options = {
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
};
const create = async (post, email) => {
  const error = validateNewPost(post);
  if (error) return error;
  const { id: userId } = await User.findOne({ where: { email } });
  const categories = await Category.findAll();
  const result = categories.every(({ id: categoryId }) => post.categoryIds.includes(categoryId));
  if (!result) return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
  const newPost = await BlogPost.create(
    { userId, ...post },
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
const find = async (postId) => {
  const post = await BlogPost.findOne({ where: { id: postId }, ...options });
  if (!post) return { status: 404, data: { message: 'Post does not exist' } };
  return { status: 200, data: post };
};
const isValidUser = async (postId, email) => {
  const post = await find(postId);
  if (post.status === 404) return post;
  const user = await User.findOne({ where: { email } });
  if (user.id !== post.data.user.id) return { status: 401, data: { message: 'Unauthorized user' } };
};
const update = async (postId, info, email) => {
  const error = validateUpdatePost(info);
  if (error) return error;
  const invalidUser = await isValidUser(postId, email);
  if (invalidUser) return invalidUser;
  await BlogPost.update(info, { where: { id: postId } });
  const updatedPost = await find(postId);
  return updatedPost;
};
const remove = async (postId, email) => {
  const invalidUser = await isValidUser(postId, email);
  if (invalidUser) return invalidUser;
  await PostCategory.destroy({ where: { postId } });
  await BlogPost.destroy({ where: { id: postId } });
  return { status: 204 };
};

module.exports = { create, findAll, find, update, remove };