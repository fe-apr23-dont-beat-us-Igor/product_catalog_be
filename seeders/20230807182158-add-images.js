'use strict';

let images = require('../src/images.json');

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