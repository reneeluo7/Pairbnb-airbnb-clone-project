'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 2,
        spotId: 1,
        review: "If you want a place that is literally on the shores of the lake, and don't care about anything else, this is it. But for the price, I personally don't think it's worth staying here",
        stars: 3
      },
      {
        userId: 1,
        spotId: 3,
        review: "Everything was great",
        stars: 4
      },
      {
        userId: 3,
        spotId: 1,
        review: "not that good, small and smelly",
        stars: 2
      },
      {
        userId: 3,
        spotId: 2,
        review: "Outstanding views, amazing hospitality and centrally located to shops, ski resorts, casinos and restaurants. This place is right on the lake and is incredibly peaceful.",
        stars: 5
      },
      {
        userId: 1,
        spotId: 5,
        review: "Greta spot with lovely views and terrace! We felt super safe. Hosts were very gracious and responsive.",
        stars: 4
      },
      {
        userId: 2,
        spotId: 2,
        review: "This place was absolutely adorable. It's like a cabin but also a penthouse. Great outdoors space and lots of seating. Neighborhood felt safe as well. Very close to a lot of attractions. Very quiet too. Comfy beds and fast internet.",
        stars: 5
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Reviews', null, {});

  }
};
