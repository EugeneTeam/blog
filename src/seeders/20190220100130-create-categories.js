'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categories', [
            {
                name: 'Lifestyle',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Photodiary',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Music',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Travel',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};
