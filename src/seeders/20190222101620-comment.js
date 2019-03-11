'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Comments', [{
        articleId: 1,
        parentId: null,
        nameAuthor: 'Jon',
        avatarAuthor: '/image/avatar/2.png',
        message: 'Good job!',
        createdAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
