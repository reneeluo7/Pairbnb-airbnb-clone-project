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
        price: 123,
        previewImage: "https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
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
        price: 123,
        previewImage: "https://images.unsplash.com/photo-1614649024145-7f847b1c803f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"

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
        price: 120,
        previewImage: "https://images.unsplash.com/photo-1559767949-0faa5c7e9992?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      }



    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Spots', null, {});
  }
};
