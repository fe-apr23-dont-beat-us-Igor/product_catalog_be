'use strict';

let products = require('../src/products.json');

products = products.map((product, index) => {
  const {
    itemId,
    category,
    name,
    capacity,
    fullPrice,
    available_colors,
    available_capacity,
    color,
    price,
    description,
    screen,
    ram,
    year,
    image,
  } = product;

  let image_catalog = image;

  let imageId = index + 1;

  return {
    itemId,
    category,
    name,
    capacity,
    fullPrice,
    available_colors,
    available_capacity,
    description,
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
