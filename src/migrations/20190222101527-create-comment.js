'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      article_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Articles',
          key: 'id'
        }
      },
      parent_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      name_author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      avatar_author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};