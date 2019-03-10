'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Comments', [{
        article_id: 1,
        parent_id: null,
        name_author: 'Jon',
        avatar_author: '/image/avatar/2.png',
        message: 'Good job!',
        createdAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
