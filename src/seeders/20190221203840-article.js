'use strict';
let temp = ["With regard to article 14 of the draft, the Russian delegation clarified that some text has been inadvertently dropped from paragraph 3 and that it was intended to track exactly the corresponding provision in article 17 of the Physical Protection Convention.",
            "remained within square brackets to indicate that agreement had not been reached with regard to that text.",
            "Following extensive negotiations, the meeting participants agreed to terms of reference for the special programme, although some text remained ",
            "Some text lines, referred to as structural text lines, are used to give structure and identification to the files.",
            "That would allow the understanding of VMS (including some text sequences) by any type of driver within any international and/or multilingual area."];
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Articles', [
        {
          title: "One",
          text: temp[0],
          category_id: 1,
          image_url: "test/test/image.jpg",
          createdAt: new Date()
        },
        {
          title: "Two",
          text: temp[1],
          category_id: 2,
          image_url: "test/test/image.jpg",
          createdAt: new Date()
        },
        {
          title: "Three",
          text: temp[2],
          category_id: 2,
          image_url: "test/test/image.jpg",
          createdAt: new Date()
        },
        {
          title: "Four",
          text: temp[3],
          category_id: 4,
          image_url: "test/test/image.jpg",
          createdAt: new Date()
        },
        {
          title: "Five",
          text: temp[4],
          category_id: 1,
          image_url: "test/test/image.jpg",
          createdAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Articles', null, {});
  }
};
