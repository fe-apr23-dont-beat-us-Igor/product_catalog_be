'use strict';

let products = require('../src/products.json');

products = products.map((product) => {
  const {
    name,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    ram,
  } = product;

  return {
    name,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    ram,
  }
});


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      products,
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
