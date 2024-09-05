const { BlogPost, User, Category, PostCategory } = require('../models');
const { validateNewPost } = require('./validations/validate');

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
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] },
      },
    ],
  });
  return { status: 200, data: posts };
};

module.exports = {
  create,
  findAll,
};