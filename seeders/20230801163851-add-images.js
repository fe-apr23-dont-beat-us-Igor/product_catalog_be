'use strict';


let images = [
  {
    link1: '123',
    link2: '123',
    link3: '123',
  },
  {
    link1: '123',
    link2: '123',
    link3: '123',
  },
  {
    link1: '123',
    link2: '123',
    link3: '123',
  },
  {
    link1: '123',
    link2: '123',
    link3: '123',
  },
  {
    link1: '123',
    link2: '123',
    link3: '123',
  }
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'images',
      images,
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
