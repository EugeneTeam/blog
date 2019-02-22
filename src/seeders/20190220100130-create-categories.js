'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categories', [
            {
                name: 'Lifestyle',
                createdAt: new Date()
            },
            {
                name: 'Photodiary',
                createdAt: new Date()
            },
            {
                name: 'Music',
                createdAt: new Date()
            },
            {
                name: 'Travel',
                createdAt: new Date()
            },
            ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};
