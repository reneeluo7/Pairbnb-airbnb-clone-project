'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Reviews', [
      {
       userId: 2,
       spotId: 1,
       review: "it's okay",
       stars: 3
     },
      {
       userId: 1,
       spotId: 3,
       review: "not bad",
       stars: 4
     },
      {
       userId: 3,
       spotId: 1,
       review: "not that good",
       stars: 2
     },
      {
       userId: 3,
       spotId: 2,
       review: "nice place",
       stars: 5
     }
    
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('People', null, {});
     
  }
};
