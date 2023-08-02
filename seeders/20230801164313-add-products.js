'use strict';

let products = require('../src/products.json');

products = products.map((product) => {
  const {
    itemId,
    category,
    name,
    capacity,
    fullPrice,
    color,
    price,
    screen,
    ram,
    year,
    image,
  } = product;

  let image_catalog = image;

  let imageId = 1;

  return {
    itemId,
    category,
    name,
    capacity,
    fullPrice,
    color,
    price,
    screen,
    ram,
    year,
    image_catalog,
    image_id: imageId,
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

