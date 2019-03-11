'use strict';
let temp = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Articles', [
        {
          title: "The perfect weekend getaway",
          text: temp,
          categoryId: 2,
          imageUrl: "/image/image4.jpg",
          createdAt: new Date()
        },
        {
          title: "More than just a music festival ",
          text: temp,
          categoryId: 1,
          imageUrl: "/image/image1.jpg",
          createdAt: new Date()
        },
        {
          title: "Life tastes better with coffee",
          text: temp,
          categoryId: 1,
          imageUrl: "/image/image2.jpg",
          createdAt: new Date()
        },
        {
          title: "American dream",
          text: temp,
          categoryId: 2,
          imageUrl: "/image/image3.jpg",
          createdAt: new Date()
        },
        {
          title: "A day exploring the Alps",
          text: temp,
          categoryId: 2,
          imageUrl: "/image/image5.jpg",
          createdAt: new Date()
        },
        {
          title: "Top 10 song for running",
          text: temp,
          categoryId: 1,
          imageUrl: "/image/image1.jpg",
          createdAt: new Date()
        },
        {
          title: "Cold winter days",
          text: temp,
          categoryId: 1,
          imageUrl: "/image/image2.jpg",
          createdAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Articles', null, {});
  }
};
