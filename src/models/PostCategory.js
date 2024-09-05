module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
    },
  },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'post_category',
      foreignKey: 'categoryId',
      through: PostCategory,
      otherKey: 'postId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category_post',
      foreignKey: 'postId',
      through: PostCategory,
      otherKey: 'categoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

  return PostCategory;
}