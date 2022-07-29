'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        imageableType: 'Spot',
        url: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg'
      },
      {
        spotId: 1,
        imageableType: 'Spot',
        url: 'https://images.pexels.com/photos/1366872/pexels-photo-1366872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url: 'https://images.pexels.com/photos/11786267/pexels-photo-11786267.jpeg'
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: 'https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: 'https://images.pexels.com/photos/4031013/pexels-photo-4031013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        reviewId: 3,
        imageableType: 'Review',
        url: 'https://images.pexels.com/photos/12667469/pexels-photo-12667469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        reviewId: 1,
        imageableType: 'Review',
        url: 'https://images.pexels.com/photos/12216690/pexels-photo-12216690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url: 'https://images.unsplash.com/photo-1593604340846-4fbe9763a8f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
      },
      {
        spotId: 4,
        imageableType: 'Spot',
        url: 'https://images.unsplash.com/photo-1521334884684-d80222895322?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
      },
      {
        spotId: 4,
        imageableType: 'Spot',
        url: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
      },
      {
        spotId: 5,
        imageableType: 'Spot',
        url: 'https://images.unsplash.com/photo-1585264550248-1778be3b6368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=763&q=80'
      },
      {
        spotId: 5,
        imageableType: 'Spot',
        url: 'https://images.unsplash.com/photo-1586024486164-ce9b3d87e09f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=978&q=80'
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: 'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
      }


    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Images', null, {});

  }
};
