'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
  await queryInterface.bulkInsert('Bookings', [
    {
        spotId: 1,
        userId: 2,
        startDate: new Date("2022-09-30"), 
        endDate: new Date("2022-09-30")
      },
    {
      spotId: 1,
      userId: 2,
      startDate: new Date("2022-10-03"),
      endDate: new Date("2022-10-07")
      },
    {
      spotId: 3,
      userId: 1,
      startDate: new Date("2022-08-30"), 
      endDate: new Date("2022-09-02")
      },
    {
      spotId: 2,
      userId: 3,
      startDate: new Date("2022-08-01"), 
      endDate: new Date("2022-08-13")
      },
    {
      spotId: 2,
      userId: 2,
      startDate: new Date("2022-11-01"), 
      endDate: new Date("2022-11-10")
      }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Bookings', null, {});
   
  }
};
