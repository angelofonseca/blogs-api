'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'blog_posts',
          },
          key: 'id',
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'categories',
          },
          key: 'id',
        }
      },
    },
      {
        timestamps: false,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('posts_categories');
  }
};
