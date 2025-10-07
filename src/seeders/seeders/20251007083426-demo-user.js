'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', [{
      username: 'John Doe1',
      email: "hihi@gmail.com",
      password: "123456"
    }, {
      username: 'John Doe2',
      email: "hiha@gmail.com",
      password: "123456"
    }, {
      username: 'John Doe3',
      email: "haha@gmail.com",
      password: "123456"
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
