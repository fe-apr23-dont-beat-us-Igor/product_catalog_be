'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', 
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        autoIncrement: true,
      },
    });
    await queryInterface.addConstraint(
      'users',
      {
        fields: ['data_id'],
        type: 'foreign key',
        references: {
          table: 'data',
          field: 'id',
        }
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};