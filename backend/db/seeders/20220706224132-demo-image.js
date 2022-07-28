'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
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
    
    
    
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Images', null, {});
    
  }
};
