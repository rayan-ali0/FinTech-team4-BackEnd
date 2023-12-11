'use strict';
var faker = require(`@faker-js/faker`).faker;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transactions=Array.from({length:20}).map(()=>({
      UserId:faker.number.int({min:1,max:10}),
      BuyerId:faker.number.int({min:1,max:10}),
      SellerId:faker.number.int({min:1,max:10}),
      amountUSD:faker.finance.amount(100,1000,2),
      amountUSDT:faker.finance.amount(50,700,2),
      createdAt: new Date(),
      updatedAt: new Date(),
      status:faker.helpers.arrayElement(['accepted','declined','accepted']),


    }))
    await queryInterface.bulkInsert('Transactions',transactions,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transaction', null, {});

  }
};
