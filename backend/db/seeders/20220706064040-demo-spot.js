'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123

      },
      {
        ownerId: 1,
        address: '125 Disney Lane',
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 38.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place next to where web developers are created",
        price: 123

      },
      {
        ownerId: 3,
        address: '125 Disney Lane',
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 38.7645358,
        lng: -133.4553441,
        name: "Academy",
        description: "Place to create",
        price: 120

      }



    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Spots', null, {});
  }
};
