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
      },
      {
        ownerId: 2,
        address: '45 Pine Lane',
        city: "Groveland",
        state: "California",
        country: "United States of America",
        lat: 37.82, 
        lng: -120.1726,
        name: "Above The Clouds Yosemite",
        description: "Kick back and relax in this peaceful retreat. Two large decks with a great view amongst the trees. Stylish decor with a boho flare. Hear Big Creek feed the lake down below while you relax and dine outside, or surrender in the macrame swings. ",
        price: 225,
        previewImage: "https://images.unsplash.com/photo-1544587473-3c6fef61ed3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      },
      {
        ownerId: 3,
        address: '892 Yafnes Lane',
        city: "Monterrey",
        state: "Nuevo León",
        country: "Mexico",
        lat: 25.6781,  
        lng: -100.33055,
        name: "Cabin inside Mty Cd 5 min from St. Peter's",
        description: "Inside the city cabin, located 5 minutes from Monterrey galleries in residential colony, the cabin is on a third floor and has beautiful views of the Mountains, get the best of two worlds.",
        price: 430,
        previewImage: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }



    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Spots', null, {});
  }
};
