'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('images', 
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      link1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link3: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link4: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link5: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  }
};
