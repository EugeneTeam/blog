'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: { // id
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { // article_id
        allowNull: false,
        type: Sequelize.STRING
      },
      text: { // parent_id
        allowNull: false,
        type: Sequelize.TEXT
      },
      category_id: { // name_author
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories'
        }
      },
      image_url: { // avatar_author
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};