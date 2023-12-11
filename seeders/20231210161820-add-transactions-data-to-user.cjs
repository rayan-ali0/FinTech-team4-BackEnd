'use strict';
var faker = require(`@faker-js/faker`).faker;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transactions=Array.from({length:2}).map(()=>({
      BuyerId:faker.number.int(50),
      amountUSD:faker.finance.amount(10,150,2),
      createdAt: new Date(),
      updatedAt: new Date(),
      status:faker.helpers.arrayElement(['accepted','accepted','accepted']),


    }))
    await queryInterface.bulkInsert('Transactions',transactions,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
