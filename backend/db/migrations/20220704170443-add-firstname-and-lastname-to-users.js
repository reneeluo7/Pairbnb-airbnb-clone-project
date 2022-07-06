'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false

    });

    await queryInterface.addColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false

    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('users', 'firstName');
    await queryInterface.removeColumn('users', 'lastName');

  }
};
