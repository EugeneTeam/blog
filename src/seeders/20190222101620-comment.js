'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Comments', [{
        article_id: 1,
        parent_id: null,
        name_author: 'Jon',
        avatar_author: '../testpath/test.jpg',
        message: 'Good blog man!',
        createdAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
