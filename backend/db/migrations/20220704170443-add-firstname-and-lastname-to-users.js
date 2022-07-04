'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('user', 'firstName', {
      type: DataTypes.STRING,
      allowNull: false

    });

    await queryInterface.addColumn('user', 'lastName', {
      type: DataTypes.STRING,
      allowNull: false

    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('user', 'firstName');
    await queryInterface.removeColumn('user', 'lastName');

  }
};
